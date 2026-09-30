"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { projects, type Project } from "@/data/projects";

function PlexExample() {
  const [collection, setCollection] = useState("Alien");
  const [matched, setMatched] = useState(false);
  const [selected, setSelected] = useState([
    "Alien",
    "Aliens",
    "Arrival",
    "Blade Runner",
    "Blade Runner 2049",
  ]);
  const films = [
    { name: "Alien", year: "1979", collection: "Alien" },
    { name: "Aliens", year: "1986", collection: "Alien" },
    { name: "Arrival", year: "2016", collection: null },
    { name: "Blade Runner", year: "1982", collection: "Blade Runner" },
    { name: "Blade Runner 2049", year: "2017", collection: "Blade Runner" },
  ];
  const matches = films.filter(
    (film) => selected.includes(film.name) && film.collection === collection,
  );
  const reset = () => setMatched(false);
  return (
    <div className="plex-demo">
      <div className="demo-heading">
        <span className="eyebrow">TRY THE WORKFLOW</span>
        <span className="demo-label">Interactive sample</span>
      </div>
      <h4>Your library. A little more organised.</h4>
      <p>Choose a collection and the films in your sample library.</p>
      <div
        className="collection-picker"
        role="group"
        aria-label="Sample collection"
      >
        {["Alien", "Blade Runner"].map((name) => (
          <button
            key={name}
            type="button"
            aria-pressed={collection === name}
            onClick={() => {
              setCollection(name);
              reset();
            }}
          >
            {name}
          </button>
        ))}
      </div>
      <div className="plex-workspace">
        <fieldset className="film-library">
          <legend>IN YOUR LIBRARY</legend>
          {films.map((film) => (
            <label
              key={film.name}
              className={
                matched && matches.includes(film)
                  ? "film-row is-matched"
                  : "film-row"
              }
            >
              <input
                type="checkbox"
                checked={selected.includes(film.name)}
                onChange={(event) => {
                  setSelected(
                    event.target.checked
                      ? [...selected, film.name]
                      : selected.filter((name) => name !== film.name),
                  );
                  reset();
                }}
              />
              <span>
                {film.name}
                <small>{film.year}</small>
              </span>
              {matched && matches.includes(film) && (
                <span className="film-match" aria-hidden="true">
                  ✓
                </span>
              )}
            </label>
          ))}
        </fieldset>
        <div className="collection-result">
          <span className="eyebrow">{collection.toUpperCase()} COLLECTION</span>
          <div className="collection-count">
            {matched ? String(matches.length).padStart(2, "0") : "—"}
            <small>films matched</small>
          </div>
          <div className="collection-output" role="status" aria-live="polite">
            {matched ? (
              matches.length ? (
                matches.map((film) => (
                  <p key={film.name}>
                    {film.name} <span>{film.year}</span>
                  </p>
                ))
              ) : (
                <p>No matching films in the selected library.</p>
              )
            ) : (
              <p>Ready when you are.</p>
            )}
          </div>
          <button
            className="button primary"
            type="button"
            onClick={() => setMatched(!matched)}
          >
            {matched ? "Reset result" : "Build collection"}
            <span aria-hidden="true">{matched ? "↺" : "→"}</span>
          </button>
        </div>
      </div>
      <small className="demo-disclaimer">
        Sample data illustrating collection matching. No connection to Plex or
        changes to a real library.
      </small>
    </div>
  );
}

function Walkthrough({ project }: { project: Project }) {
  const [point, setPoint] = useState(0);
  const steps = project.walkthrough || [];
  const active = steps[point];
  return (
    <div className="walkthrough">
      <div className="browser-preview">
        <div className="browser-bar">
          <span className="window-dots" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <span>{project.url?.replace("https://", "")}</span>
          <span className="screenshot-label">Homepage walkthrough</span>
        </div>
        <div className="screenshot-surface">
          <Image
            src={project.image!}
            alt={project.imageAlt || ""}
            width={1280}
            height={720}
            sizes="(max-width: 760px) 100vw, 1100px"
          />
          {steps.map((step, index) => (
            <button
              className="preview-point"
              style={{ left: `${step.x}%`, top: `${step.y}%` }}
              type="button"
              key={step.title}
              aria-label={`Explore ${step.title}`}
              aria-pressed={point === index}
              aria-controls={`${project.id}-annotation`}
              onClick={() => setPoint(index)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
      <div className="walkthrough-caption">
        <div
          className="walkthrough-steps"
          role="group"
          aria-label={`${project.name} walkthrough points`}
        >
          {steps.map((step, index) => (
            <button
              key={step.title}
              type="button"
              aria-pressed={point === index}
              aria-controls={`${project.id}-annotation`}
              onClick={() => setPoint(index)}
            >
              <span>0{index + 1}</span>
              {step.title}
            </button>
          ))}
        </div>
        {active && (
          <div
            id={`${project.id}-annotation`}
            className="annotation"
            aria-live="polite"
          >
            <h4>{active.title}</h4>
            <p>{active.text}</p>
          </div>
        )}
      </div>
    </div>
  );
}

function SystemExplorer({ project }: { project: Project }) {
  const [step, setStep] = useState(0);
  return (
    <div className="system-view">
      <p className="eyebrow">FOLLOW THE CONNECTIONS</p>
      <h4>What makes it work.</h4>
      <p className="system-instruction">
        Select a part of the system to look closer.
      </p>
      <div
        className="system-flow"
        role="group"
        aria-label={`${project.name} system components`}
      >
        {project.flow.map((item, index) => (
          <button
            key={item.name}
            type="button"
            aria-pressed={step === index}
            aria-controls={`${project.id}-system-detail`}
            onClick={() => setStep(index)}
          >
            <span className="flow-number">0{index + 1}</span>
            <strong>{item.name}</strong>
            <span className="flow-arrow" aria-hidden="true">
              →
            </span>
          </button>
        ))}
      </div>
      <div
        className="system-detail"
        id={`${project.id}-system-detail`}
        aria-live="polite"
      >
        <span className="flow-number">
          0{step + 1} / {project.flow.length.toString().padStart(2, "0")}
        </span>
        <div>
          <h5>{project.flow[step].name}</h5>
          <p>{project.flow[step].detail}</p>
        </div>
      </div>
      <div className="decision-list">
        {project.decisions.map((decision) => (
          <div key={decision.title}>
            <h5>{decision.title}</h5>
            <p>{decision.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProjectChapter({ project }: { project: Project }) {
  const [view, setView] = useState("explore");
  return (
    <article
      className={`project-chapter chapter-${project.id}`}
      id={`project-${project.id}`}
      aria-labelledby={`${project.id}-heading`}
    >
      <header className="chapter-heading">
        <span className="chapter-number" aria-hidden="true">
          {project.number}
        </span>
        <div>
          <p className="eyebrow">{project.category.toUpperCase()}</p>
          <h3 id={`${project.id}-heading`}>{project.name}</h3>
          <p className="chapter-line">{project.line}</p>
        </div>
        <a
          className="chapter-next"
          href={
            project.number === "03"
              ? "#about"
              : `#project-${projects[Number(project.number)].id}`
          }
          aria-label={
            project.number === "03" ? "Continue to about" : "Next project"
          }
        >
          ↓
        </a>
      </header>
      <div className="preview-toolbar">
        <div
          className="view-controls"
          role="group"
          aria-label={`${project.name} presentation`}
        >
          {[
            {
              id: "explore",
              label: project.image
                ? "Explore the interface"
                : "Try the toolkit",
            },
            { id: "system", label: "Under the hood" },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={view === item.id}
              aria-controls={`${project.id}-view`}
              onClick={() => setView(item.id)}
            >
              {item.label}
              <span aria-hidden="true">
                {item.id === "explore" ? "↗" : "⌘"}
              </span>
            </button>
          ))}
        </div>
        <span className="preview-kind">
          {view === "explore"
            ? project.image
              ? "SELECT A NUMBER TO EXPLORE"
              : "MAKE IT YOUR OWN"
            : "SELECT A CONNECTION"}
        </span>
      </div>
      <div id={`${project.id}-view`} className="project-stage">
        {view === "explore" ? (
          project.image ? (
            <Walkthrough project={project} />
          ) : (
            <PlexExample />
          )
        ) : (
          <SystemExplorer project={project} />
        )}
      </div>
      <div className="project-story">
        <div>
          <span className="eyebrow">THE IDEA</span>
          <p>{project.problem}</p>
        </div>
        <div>
          <span className="eyebrow">THE BUILD</span>
          <p>{project.approach}</p>
        </div>
      </div>
      <div className="project-bottom">
        <ul className="stack-list" aria-label={`${project.name} technologies`}>
          {project.stack.map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>
        <div className="project-links">
          {project.url && (
            <a href={project.url} target="_blank" rel="noreferrer">
              Visit site <span aria-hidden="true">↗</span>
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          )}
          {project.source && (
            <a href={project.source} target="_blank" rel="noreferrer">
              Source code <span aria-hidden="true">↗</span>
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          )}
        </div>
      </div>
      {project.note && <p className="project-note">{project.note}</p>}
    </article>
  );
}

export function ProjectChapters() {
  const [active, setActive] = useState(projects[0].id);
  useEffect(() => {
    // All chapters stay visible. This only follows the reading position.
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length) {
          setActive(visible[0].target.id.replace("project-", ""));
        } else {
          const first = document.getElementById(`project-${projects[0].id}`);
          if (
            first &&
            first.getBoundingClientRect().top > window.innerHeight * 0.35
          ) {
            setActive(projects[0].id);
          }
        }
      },
      { rootMargin: "-15% 0px -65% 0px", threshold: 0 },
    );
    projects.forEach((project) => {
      const chapter = document.getElementById(`project-${project.id}`);
      if (chapter) observer.observe(chapter);
    });
    return () => observer.disconnect();
  }, []);
  return (
    <div className="project-chapters">
      <nav className="chapter-nav" aria-label="Project chapters">
        {projects.map((project) => (
          <a
            key={project.id}
            href={`#project-${project.id}`}
            aria-current={active === project.id ? "location" : undefined}
          >
            <span>{project.number}</span>
            {project.name}
            <i aria-hidden="true" />
          </a>
        ))}
      </nav>
      {projects.map((project) => (
        <ProjectChapter project={project} key={project.id} />
      ))}
    </div>
  );
}
