"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { projects, type Project } from "@/data/projects";

type View = "preview" | "system" | "decisions";
const views: { id: View; label: string }[] = [
  { id: "preview", label: "Preview" },
  { id: "system", label: "How it works" },
  { id: "decisions", label: "Design decisions" },
];

function PlexExample() {
  const [matched, setMatched] = useState(false);
  const films = [
    { name: "Alien", year: "1979", match: true },
    { name: "Aliens", year: "1986", match: true },
    { name: "Arrival", year: "2016", match: false },
  ];
  return (
    <div className="plex-demo">
      <div className="demo-heading">
        <span className="eyebrow">A SMALL WORKFLOW DEMO</span>
        <span className="demo-label">Sample data</span>
      </div>
      <h4>Build an Alien collection.</h4>
      <p>Three films in a library. Two belong together.</p>
      <ul className="film-list">
        {films.map((film) => (
          <li key={film.name}>
            <span>
              <strong>{film.name}</strong>
              <small>{film.year}</small>
            </span>
            <span
              className={
                matched && film.match ? "match-status matched" : "match-status"
              }
            >
              {matched
                ? film.match
                  ? "Matched ✓"
                  : "Not in collection"
                : "Waiting"}
            </span>
          </li>
        ))}
      </ul>
      <div className="demo-actions">
        <button
          className="button primary"
          type="button"
          onClick={() => setMatched(!matched)}
        >
          {matched ? "Reset example" : "Find collection matches"}
          <span aria-hidden="true">↗</span>
        </button>
        <p role="status">
          {matched ? "2 sample films matched." : "Ready to match."}
        </p>
      </div>
      <small className="demo-disclaimer">
        Illustrates the idea only. No Plex connection or real library changes.
      </small>
    </div>
  );
}

function ProjectView({ project }: { project: Project }) {
  const [view, setView] = useState<View>("preview");
  const panelId = `${project.id}-view`;
  return (
    <>
      <div className="preview-toolbar">
        <div
          className="view-controls"
          role="group"
          aria-label={`${project.name} presentation`}
        >
          {views.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={view === item.id}
              aria-controls={panelId}
              onClick={() => setView(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
        <span className="preview-kind">
          {project.image ? "WEB EXPERIENCE" : "AUTOMATION TOOL"}
        </span>
      </div>
      <div id={panelId} className={`project-stage stage-${view}`}>
        {view === "preview" &&
          (project.image ? (
            <div className="browser-preview">
              <div className="browser-bar" aria-hidden="true">
                <span className="window-dots">
                  <i />
                  <i />
                  <i />
                </span>
                <span>{project.url?.replace("https://", "")}</span>
                <span>↗</span>
              </div>
              <Image
                src={project.image}
                alt={project.imageAlt || ""}
                width={1280}
                height={720}
                sizes="(max-width: 760px) 100vw, 1100px"
              />
            </div>
          ) : (
            <PlexExample />
          ))}
        {view === "system" && (
          <div className="system-view">
            <span className="eyebrow">FROM INPUT TO OUTCOME</span>
            <h4>A look beneath the interface.</h4>
            <ol className="system-flow">
              {project.flow.map((step, index) => (
                <li key={step.name}>
                  <span className="flow-number">0{index + 1}</span>
                  <div>
                    <h5>{step.name}</h5>
                    <p>{step.detail}</p>
                  </div>
                  <span className="flow-arrow" aria-hidden="true">
                    ↓
                  </span>
                </li>
              ))}
            </ol>
          </div>
        )}
        {view === "decisions" && (
          <div className="decisions-view">
            <span className="eyebrow">THE THINKING BEHIND THE BUILD</span>
            <h4>Small choices. A clearer system.</h4>
            <div className="decision-list">
              {project.decisions.map((decision, index) => (
                <div key={decision.title}>
                  <span className="flow-number">0{index + 1}</span>
                  <h5>{decision.title}</h5>
                  <p>{decision.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <p className="sr-only" role="status">
        Showing {views.find((item) => item.id === view)?.label} for{" "}
        {project.name}.
      </p>
    </>
  );
}

export function ProjectChapters() {
  useEffect(() => {
    const openFromHash = () => {
      const id = window.location.hash.slice(1);
      const chapter = document.getElementById(id);
      if (chapter instanceof HTMLDetailsElement) chapter.open = true;
    };
    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, []);

  return (
    <div className="project-chapters">
      {projects.map((project, index) => (
        <details
          key={project.id}
          className="project-chapter"
          name="projects"
          id={`project-${project.id}`}
          open={index === 0}
        >
          <summary>
            <h3>
              <span className="chapter-number">{project.number}</span>
              <span className="chapter-title">
                {project.name}
                <span className="chapter-line">{project.line}</span>
              </span>
              <span className="chapter-category">{project.category}</span>
              <span className="chapter-indicator" aria-hidden="true">
                +
              </span>
            </h3>
          </summary>
          <div className="chapter-body">
            <ProjectView project={project} />
            <div className="project-story">
              <div>
                <span className="eyebrow">THE BRIEF</span>
                <p>{project.problem}</p>
              </div>
              <div>
                <span className="eyebrow">THE BUILD</span>
                <p>{project.approach}</p>
              </div>
            </div>
            <div className="project-bottom">
              <ul
                className="stack-list"
                aria-label={`${project.name} technologies`}
              >
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
          </div>
        </details>
      ))}
    </div>
  );
}
