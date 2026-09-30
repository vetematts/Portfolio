import { mkdir, mkdtemp, copyFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";
import { projects } from "../src/data/projects";

const root = fileURLToPath(new URL("../", import.meta.url));
const captureSettings: Record<string, { readySelector: string }> = {
  cinecritic: { readySelector: 'img[alt$=" poster"]' },
  "redlands-bonsai": {
    readySelector: 'main img[alt="Bonsai from a recent annual show"]',
  },
};

async function refreshPreviews() {
  const args = process.argv.slice(2);
  const available = projects.filter((project) => project.url && project.image);

  if (args.includes("--help")) {
    console.log("Usage: npm run previews:refresh -- [project-id ...]");
    console.log(
      `Projects: ${available.map((project) => project.id).join(", ")}`,
    );
    return;
  }

  const unknown = args.filter(
    (id) => !available.some((project) => project.id === id),
  );
  if (unknown.length) {
    throw new Error(
      `Unknown project: ${unknown.join(", ")}. Use --help for IDs.`,
    );
  }

  const selected = available.filter(
    (project) => args.length === 0 || args.includes(project.id),
  );
  const browser = await chromium.launch();
  const temporary = await mkdtemp(join(tmpdir(), "portfolio-previews-"));

  try {
    const context = await browser.newContext({
      viewport: { width: 1280, height: 720 },
      deviceScaleFactor: 1,
      reducedMotion: "reduce",
      colorScheme: "light",
      locale: "en-AU",
      timezoneId: "Australia/Brisbane",
    });
    const captures: { name: string; temporary: string; destination: string }[] =
      [];

    for (const project of selected) {
      const page = await context.newPage();
      try {
        console.log(`Capturing ${project.name} from ${project.url}…`);
        const response = await page.goto(project.url!, {
          waitUntil: "domcontentloaded",
          timeout: 60_000,
        });
        if (!response?.ok()) {
          throw new Error(
            `Homepage returned HTTP ${response?.status() ?? "unknown"}`,
          );
        }

        const readySelector =
          captureSettings[project.id]?.readySelector ?? "main";
        await page.locator(readySelector).first().waitFor({
          state: "visible",
          timeout: 120_000,
        });
        await page.evaluate(() => document.fonts.ready);
        await page.waitForFunction(
          (selector) => {
            const element = document.querySelector(selector);
            if (!element) return false;
            if (
              element instanceof HTMLImageElement &&
              (!element.complete || element.naturalWidth === 0)
            )
              return false;
            let current: Element | null = element;
            while (current) {
              const style = getComputedStyle(current);
              if (
                Number(style.opacity) < 0.99 ||
                style.visibility !== "visible"
              ) {
                return false;
              }
              current = current.parentElement;
            }
            return true;
          },
          readySelector,
          { timeout: 60_000 },
        );
        await page.waitForFunction(
          () => {
            const visibleImages = Array.from(document.images).filter(
              (image) => {
                const bounds = image.getBoundingClientRect();
                return (
                  bounds.width > 0 &&
                  bounds.height > 0 &&
                  bounds.top < innerHeight &&
                  bounds.bottom > 0 &&
                  bounds.left < innerWidth &&
                  bounds.right > 0
                );
              },
            );
            return (
              visibleImages.length > 0 &&
              visibleImages.every(
                (image) => image.complete && image.naturalWidth > 0,
              )
            );
          },
          undefined,
          { timeout: 60_000 },
        );

        const image = project.image!;
        if (!/^\/projects\/[\w-]+\.jpg$/.test(image)) {
          throw new Error(`Expected a JPEG path in /projects/: ${image}`);
        }
        const temporaryImage = join(temporary, `${project.id}.jpg`);
        await page.screenshot({
          path: temporaryImage,
          type: "jpeg",
          quality: 85,
          fullPage: false,
          animations: "disabled",
          caret: "hide",
        });
        captures.push({
          name: project.name,
          temporary: temporaryImage,
          destination: join(root, "public", image.slice(1)),
        });
      } catch (error) {
        throw new Error(`${project.name}: ${(error as Error).message}`);
      } finally {
        await page.close();
      }
    }

    // Keep the current images until every selected site has been captured.
    for (const capture of captures) {
      await mkdir(dirname(capture.destination), { recursive: true });
      await copyFile(capture.temporary, capture.destination);
      console.log(`Updated ${capture.name}: ${capture.destination}`);
    }
    console.log(
      "Review the previews locally, then commit the images when ready.",
    );
  } finally {
    await browser.close();
    await rm(temporary, { recursive: true, force: true });
  }
}

refreshPreviews().catch((error: Error) => {
  console.error(`Preview refresh failed: ${error.message}`);
  if (error.message.includes("Executable doesn't exist")) {
    console.error("Install the browser with: npx playwright install chromium");
  }
  process.exitCode = 1;
});
