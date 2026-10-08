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
      <main id="main">
        <section
          className="hero page-width"
          id="top"
          aria-labelledby="intro-heading"
        >
          <div className="hero-copy">
            <h1 id="intro-heading">
              <span className="sr-only">Matt Cicala</span>
              <span className="desktop-name" aria-hidden="true">
                Matt Cicala
              </span>
              <span className="mobile-name" aria-hidden="true">
                <HeroNamePrompt fullName />
              </span>
            </h1>
            <p className="hero-description">
              Web developer drawn to simple interfaces and thoughtful systems.
            </p>
            <SocialLinks variant="hero" />
            <a className="projects-link" href="#work">
              Projects <span aria-hidden="true">↓</span>
            </a>
          </div>
          <div className="hero-signal" aria-hidden="true">
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
      </main>
      <footer className="site-footer page-width">
        <a className="back-to-top" href="#top">
          Back to top <span aria-hidden="true">↑</span>
        </a>
        <BackgroundRain />
      </footer>
    </>
  );
}
