import Image from "next/image";
import { BackgroundRain } from "@/components/BackgroundRain";
import { HeroNamePrompt } from "@/components/HeroNamePrompt";
import { ProjectCarousel } from "@/components/ProjectCarousel";
import { SocialLinks } from "@/components/SocialLinks";

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header page-width" id="top">
        <a
          className="brand-link"
          href="#top"
          aria-label="Matt Cicala, back to top"
        >
          <Image
            src="/brand/mc.svg"
            alt=""
            width={46}
            height={51}
            loading="eager"
          />
          <span>
            Matt Cicala<span className="brand-role">Web developer</span>
          </span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#work">Projects</a>
          <a href="#contact">
            Contact <span aria-hidden="true">↗</span>
          </a>
        </nav>
      </header>
      <main id="main">
        <section className="hero page-width" aria-labelledby="intro-heading">
          <div className="hero-copy">
            <p className="eyebrow location">
              <span aria-hidden="true" />
              BRISBANE, AUSTRALIA
            </p>
            <h1 id="intro-heading">Matt Cicala</h1>
            <p className="hero-description">
              Web developer drawn to simple interfaces and thoughtful systems.
            </p>
            <div className="hero-actions">
              <a className="button primary" href="#work">
                View projects <span aria-hidden="true">↓</span>
              </a>
              <a className="text-link" href="mailto:mattcicala@icloud.com">
                Email <span aria-hidden="true">↗</span>
              </a>
            </div>
            <SocialLinks variant="compact" />
          </div>
          <div className="hero-signal">
            <HeroNamePrompt />
          </div>
        </section>
        <section
          className="work-section page-width"
          id="work"
          aria-labelledby="work-heading"
        >
          <div className="section-heading">
            <h2 id="work-heading">Projects</h2>
          </div>
          <ProjectCarousel />
        </section>
        <section
          className="contact-section page-width"
          id="contact"
          aria-labelledby="contact-heading"
        >
          <h2 id="contact-heading">Contact</h2>
          <a className="contact-email" href="mailto:mattcicala@icloud.com">
            mattcicala@icloud.com <span aria-hidden="true">↗</span>
          </a>
          <SocialLinks />
        </section>
      </main>
      <footer className="site-footer page-width">
        <div className="footer-top">
          <a
            className="footer-brand"
            href="#top"
            aria-label="Matt Cicala, back to top"
          >
            <Image src="/brand/mc.svg" alt="" width={46} height={51} />
            <span>Matt Cicala</span>
          </a>
          <a
            className="earlier-work"
            href="https://vetematts.github.io/portfolio-og/"
            target="_blank"
            rel="noreferrer"
          >
            My first portfolio <span aria-hidden="true">↗</span>
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
        <div className="footer-bottom">
          <span>Brisbane, Australia</span>
          <BackgroundRain />
        </div>
      </footer>
    </>
  );
}
