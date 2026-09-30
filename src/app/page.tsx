import Image from "next/image";
import { BrandSignal } from "@/components/BrandSignal";
import { ProjectChapters } from "@/components/ProjectChapters";

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
              <a
                className="text-link"
                href="/matthew-cicala-resume.pdf"
                target="_blank"
                rel="noreferrer"
              >
                View résumé <span aria-hidden="true">↗</span>
                <span className="sr-only"> (PDF, opens in a new tab)</span>
              </a>
            </div>
          </div>
          <BrandSignal />
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
                Three projects.
                <br />
                <span>Three different problems.</span>
              </h2>
            </div>
            <p>
              Open a chapter.
              <br />
              Explore the interface, the system
              <br className="desktop-break" /> and the thinking behind it.
            </p>
          </div>
          <ProjectChapters />
        </section>
        <section
          className="about-section page-width"
          id="about"
          aria-labelledby="about-heading"
        >
          <div className="about-intro">
            <p className="eyebrow">A LITTLE ABOUT ME</p>
            <h2 id="about-heading">
              A practical mind.
              <br />
              <span>A creative background.</span>
            </h2>
            <p>
              Before web development, I worked across healthcare operations,
              systems support and digital workflows. That experience shapes how
              I build: understand the people, find the friction and make the
              next step clearer.
            </p>
            <p>
              My background in film and media adds another perspective — how
              something looks, feels and tells its story matters too.
            </p>
            <a className="text-link" href="/matthew-cicala-resume.pdf" download>
              Download my résumé <span aria-hidden="true">↓</span>
              <span className="sr-only"> (PDF)</span>
            </a>
          </div>
          <div className="experience">
            <div className="experience-heading">
              <span className="eyebrow">EXPERIENCE & EDUCATION</span>
              <span className="experience-line" />
            </div>
            <article>
              <p className="experience-meta">2019 — PRESENT</p>
              <h3>Practice Operations Coordinator</h3>
              <p>Nick Sheptooha Dental Practice</p>
              <p className="experience-detail">
                Technology implementation, internal systems support and workflow
                improvement across a busy dental practice.
              </p>
            </article>
            <article>
              <p className="experience-meta">WEB DEVELOPMENT</p>
              <h3>Diploma of Web Development</h3>
              <p>Coder Academy · Completed</p>
            </article>
            <article>
              <p className="experience-meta">CREATIVE FOUNDATIONS</p>
              <h3>Film & media</h3>
              <p>
                Bachelor of Film & Media · Griffith University
                <br />
                Diploma of Screen and Media · TAFE Queensland
              </p>
            </article>
          </div>
        </section>
        <section
          className="capabilities page-width"
          aria-labelledby="capabilities-heading"
        >
          <div>
            <p className="eyebrow">MY TOOLKIT</p>
            <h2 id="capabilities-heading">
              From interface
              <br />
              <span>to infrastructure.</span>
            </h2>
          </div>
          <dl>
            <div>
              <dt>Interfaces</dt>
              <dd>HTML, CSS, JavaScript, TypeScript, React, Next.js</dd>
            </div>
            <div>
              <dt>Systems</dt>
              <dd>Node.js, Express, Python, Flask, PostgreSQL, SQLAlchemy</dd>
            </div>
            <div>
              <dt>Delivery & design</dt>
              <dd>Git, CI/CD, Docker, AWS, GCP, Terraform, Figma, Photoshop</dd>
            </div>
          </dl>
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
          <div className="social-links">
            <a
              href="https://github.com/vetematts"
              target="_blank"
              rel="noreferrer"
            >
              GitHub <span aria-hidden="true">↗</span>
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            <a
              href="https://www.linkedin.com/in/matthewcicala"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn <span aria-hidden="true">↗</span>
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            <a
              href="/matthew-cicala-resume.pdf"
              target="_blank"
              rel="noreferrer"
            >
              Résumé <span aria-hidden="true">↗</span>
              <span className="sr-only"> (PDF, opens in a new tab)</span>
            </a>
          </div>
        </section>
      </main>
      <footer className="site-footer page-width">
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
          <span>That was then.</span> My first portfolio{" "}
          <span aria-hidden="true">↗</span>
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
        <span className="footer-location">Made in Brisbane.</span>
      </footer>
    </>
  );
}
