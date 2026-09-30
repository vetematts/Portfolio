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
            Matt Cicala<span className="brand-role">Full-stack developer</span>
          </span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#work">Work</a>
          <a href="#about">About</a>
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
            <h1 id="intro-heading">
              Clear interfaces.
              <br />
              Thoughtful systems.
              <br />
              <span>A little curiosity.</span>
            </h1>
            <p className="hero-description">
              I’m Matt, a full-stack developer with a practical approach to
              software and an eye for the details that make it feel right.
            </p>
            <div className="hero-actions">
              <a className="button primary" href="#work">
                Explore my work <span aria-hidden="true">↓</span>
              </a>
              <a className="text-link" href="mailto:mattcicala@icloud.com">
                Say hello <span aria-hidden="true">↗</span>
              </a>
            </div>
            <SocialLinks variant="compact" />
          </div>
          <div className="hero-signal">
            <HeroNamePrompt />
            <div className="hero-atmosphere-note" aria-hidden="true">
              <span className="ambient-orbit">
                <i />
                <i />
                <i />
              </span>
              <span>
                Move through the rain.
                <small>A little code. A little play.</small>
              </span>
            </div>
          </div>
        </section>
        <section
          className="work-section page-width"
          id="work"
          aria-labelledby="work-heading"
        >
          <div className="section-heading">
            <div>
              <p className="eyebrow">SELECTED WORK</p>
              <h2 id="work-heading">
                A few things <span>I’ve built.</span>
              </h2>
            </div>
            <p>
              Different ideas.
              <br />
              One curious developer.
            </p>
          </div>
          <ProjectCarousel />
        </section>
        <section
          className="about-section page-width"
          id="about"
          aria-labelledby="about-heading"
        >
          <div>
            <p className="eyebrow">A LITTLE ABOUT ME</p>
            <h2 id="about-heading">
              Curious by nature.
              <br />
              <span>Practical by default.</span>
            </h2>
          </div>
          <div className="about-copy">
            <p>
              I like interfaces that feel natural, tools that save a little
              effort, and the process of figuring out how things fit together.
            </p>
            <p>
              From film discovery to everyday automation, I enjoy building
              things I’d want to use. Clean design, useful details and a bit of
              personality go a long way.
            </p>
            <a
              className="text-link"
              href="https://github.com/vetematts"
              target="_blank"
              rel="noreferrer"
            >
              See what I’m working on <span aria-hidden="true">↗</span>
              <span className="sr-only"> (GitHub, opens in a new tab)</span>
            </a>
          </div>
        </section>
        <section
          className="contact-section page-width"
          id="contact"
          aria-labelledby="contact-heading"
        >
          <p className="eyebrow">LET’S CONNECT</p>
          <h2 id="contact-heading">
            Have something
            <br />
            <span>in mind?</span>
          </h2>
          <p>
            I’m looking for opportunities to build useful software
            <br className="desktop-break" /> with people who care about the
            details.
          </p>
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
            href="https://vetematts.github.io/Portfolio/"
            target="_blank"
            rel="noreferrer"
          >
            My first portfolio <span aria-hidden="true">↗</span>
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
        <div className="footer-bottom">
          <span>Made in Brisbane.</span>
          <BackgroundRain />
        </div>
      </footer>
    </>
  );
}
