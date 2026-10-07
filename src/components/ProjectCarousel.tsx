"use client";

import Image from "next/image";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent,
} from "react";
import { projects } from "@/data/projects";
import { LiveProjectPreview } from "@/components/LiveProjectPreview";

function TerminalPreview({ active }: { active: boolean }) {
  const [step, setStep] = useState(0);
  const [running, setRunning] = useState(false);
  useEffect(() => {
    if (!active) {
      setRunning(false);
      return;
    }
    if (!running) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStep(4);
      setRunning(false);
      return;
    }
    const timer = window.setInterval(() => {
      setStep((current) => Math.min(current + 1, 4));
    }, 650);
    return () => window.clearInterval(timer);
  }, [active, running]);
  useEffect(() => {
    if (step === 4) setRunning(false);
  }, [step]);
  return (
    <div className="terminal-preview">
      <div className="terminal-topline">
        <span>
          <i /> plex toolkit
        </span>
        <span>PYTHON / CLI</span>
      </div>
      <div className="terminal-content">
        <p className="terminal-command">
          <span>~</span> collection workflow
          <span className="terminal-cursor" aria-hidden="true">
            ▌
          </span>
        </p>
        <div className="terminal-log">
          <p className={step >= 1 ? "log-complete" : ""}>
            <span>{step >= 1 ? "✓" : "·"}</span> Read the sample library{" "}
            <small>03 films</small>
          </p>
          <p className={step >= 2 ? "log-complete" : ""}>
            <span>{step >= 2 ? "✓" : "·"}</span> Match titles & release years{" "}
            <small>02 matches</small>
          </p>
          <p className={step >= 3 ? "log-complete" : ""}>
            <span>{step >= 3 ? "✓" : "·"}</span> Build the Alien collection
          </p>
        </div>
        <div className={`terminal-result ${step === 4 ? "is-complete" : ""}`}>
          <span className="collection-icon" aria-hidden="true">
            ▤
          </span>
          <div>
            <strong>Alien Collection</strong>
            <p>
              {step === 4 ? "Alien (1979) · Aliens (1986)" : "Ready to run."}
            </p>
          </div>
          <span className="result-check" aria-hidden="true">
            {step === 4 ? "✓" : "↗"}
          </span>
        </div>
        <div className="terminal-actions">
          <button
            type="button"
            disabled={running || !active}
            onClick={() => {
              setStep(0);
              setRunning(true);
            }}
          >
            {running ? "Working…" : step === 4 ? "Run again" : "Run sample"}
            <span aria-hidden="true">{running ? "···" : "→"}</span>
          </button>
          <span>Illustrative run · sample data</span>
        </div>
      </div>
    </div>
  );
}

export function ProjectCarousel() {
  const [active, setActive] = useState(0);
  const stage = useRef<HTMLDivElement>(null);
  const gesture = useRef<{
    x: number;
    y: number;
    dx: number;
    dragging: boolean;
  } | null>(null);
  const project = projects[active];
  const select = (index: number) => {
    setActive((index + projects.length) % projects.length);
    stage.current?.style.setProperty("--drag-x", "0px");
    stage.current?.style.setProperty("--tilt-x", "0deg");
    stage.current?.style.setProperty("--tilt-y", "0deg");
  };
  useEffect(() => {
    const fromHash = () => {
      const index = projects.findIndex(
        (item) => `#project-${item.id}` === window.location.hash,
      );
      if (index >= 0) {
        setActive(index);
        document
          .getElementById("work")
          ?.scrollIntoView({ behavior: "instant", block: "start" });
      }
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, []);
  const clearGesture = () => {
    gesture.current = null;
    stage.current?.removeAttribute("data-dragging");
    stage.current?.style.setProperty("--drag-x", "0px");
  };
  const move = (event: PointerEvent<HTMLDivElement>) => {
    if (gesture.current) {
      const dx = event.clientX - gesture.current.x;
      const dy = event.clientY - gesture.current.y;
      if (
        !gesture.current.dragging &&
        Math.abs(dy) > Math.abs(dx) &&
        Math.abs(dy) > 10
      ) {
        clearGesture();
        return;
      }
      if (Math.abs(dx) > 8) {
        gesture.current.dragging = true;
        gesture.current.dx = dx;
        event.currentTarget.setPointerCapture(event.pointerId);
        event.currentTarget.dataset.dragging = "true";
        event.currentTarget.style.setProperty(
          "--drag-x",
          `${Math.max(-180, Math.min(180, dx))}px`,
        );
      }
    } else if (
      event.pointerType === "mouse" &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      const bounds = event.currentTarget.getBoundingClientRect();
      event.currentTarget.style.setProperty(
        "--tilt-x",
        `${((event.clientY - bounds.top) / bounds.height - 0.5) * -5}deg`,
      );
      event.currentTarget.style.setProperty(
        "--tilt-y",
        `${((event.clientX - bounds.left) / bounds.width - 0.5) * 5}deg`,
      );
    }
  };
  return (
    <div
      className={`project-carousel carousel-${project.id}`}
      role="region"
      aria-roledescription="carousel"
      aria-label="Selected projects"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.target !== event.currentTarget) return;
        if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
          event.preventDefault();
          select(active + (event.key === "ArrowRight" ? 1 : -1));
        }
        if (event.key === "Home") {
          event.preventDefault();
          select(0);
        }
        if (event.key === "End") {
          event.preventDefault();
          select(projects.length - 1);
        }
      }}
    >
      <div
        className="carousel-stage"
        ref={stage}
        onPointerDown={(event) => {
          if (
            event.button !== 0 ||
            (event.target as HTMLElement).closest("button, a")
          )
            return;
          event.currentTarget.setPointerCapture(event.pointerId);
          gesture.current = {
            x: event.clientX,
            y: event.clientY,
            dx: 0,
            dragging: false,
          };
        }}
        onPointerMove={move}
        onPointerUp={(event) => {
          if (gesture.current?.dragging && Math.abs(gesture.current.dx) > 55)
            select(active + (gesture.current.dx < 0 ? 1 : -1));
          clearGesture();
          if (event.currentTarget.hasPointerCapture(event.pointerId))
            event.currentTarget.releasePointerCapture(event.pointerId);
        }}
        onPointerCancel={clearGesture}
        onPointerLeave={() => {
          if (!gesture.current) {
            stage.current?.style.setProperty("--tilt-x", "0deg");
            stage.current?.style.setProperty("--tilt-y", "0deg");
          }
        }}
      >
        <div className="carousel-halo" aria-hidden="true" />
        {projects.map((item, index) => {
          const offset =
            ((index - active + projects.length + 1) % projects.length) - 1;
          return (
            <div
              key={item.id}
              className={`carousel-slide slide-${item.id} ${offset === 0 ? "is-active" : "is-neighbour"}`}
              style={
                {
                  "--offset": offset,
                  "--distance": Math.abs(offset),
                } as CSSProperties
              }
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${projects.length}: ${item.name}`}
              aria-hidden={offset !== 0}
              inert={offset !== 0}
            >
              <div className="slide-frame">
                {item.image ? (
                  <>
                    <div className="slide-browser-bar" aria-hidden="true">
                      <span className="window-dots">
                        <i />
                        <i />
                        <i />
                      </span>
                      <span>{item.url?.replace("https://", "")}</span>
                      <span>↗</span>
                    </div>
                    <Image
                      src={item.image}
                      alt={item.imageAlt || ""}
                      width={1280}
                      height={720}
                      sizes="(max-width: 760px) 85vw, 900px"
                      draggable={false}
                    />
                  </>
                ) : (
                  <TerminalPreview active={offset === 0} />
                )}
              </div>
            </div>
          );
        })}
        <button
          className="carousel-side previous-side"
          type="button"
          aria-label="Previous project"
          onClick={() => select(active - 1)}
        >
          <span aria-hidden="true">←</span>
        </button>
        <button
          className="carousel-side next-side"
          type="button"
          aria-label="Next project"
          onClick={() => select(active + 1)}
        >
          <span aria-hidden="true">→</span>
        </button>
      </div>
      <div className="carousel-controls">
        <span className="drag-hint">
          <span aria-hidden="true">↔</span> Drag to explore{" "}
          <span className="mobile-swipe">/ swipe</span>
        </span>
        <div className="carousel-position">
          <span className="position-number">{project.number}</span>
          <span className="position-line" aria-hidden="true">
            <i style={{ transform: `translateX(${active * 100}%)` }} />
          </span>
          <span>0{projects.length}</span>
        </div>
        <div className="carousel-arrows">
          <button
            type="button"
            aria-label="Show previous project"
            onClick={() => select(active - 1)}
          >
            ←
          </button>
          <button
            type="button"
            aria-label="Show next project"
            onClick={() => select(active + 1)}
          >
            →
          </button>
        </div>
      </div>
      <div className="carousel-story" key={project.id}>
        <div className="carousel-project-title">
          <p className="eyebrow">{project.category.toUpperCase()}</p>
          <h3>{project.name}</h3>
          <div className="project-links">
            <LiveProjectPreview project={project} />
            {project.url && (
              <a
                className="text-link"
                href={project.url}
                target="_blank"
                rel="noreferrer"
              >
                Visit site <span aria-hidden="true">↗</span>
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            )}
            {project.source && (
              <a
                className="text-link"
                href={project.source}
                target="_blank"
                rel="noreferrer"
              >
                Source code <span aria-hidden="true">↗</span>
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            )}
          </div>
        </div>
        <div className="carousel-project-copy">
          <p>{project.problem}</p>
          <ul
            className="stack-list"
            aria-label={`${project.name} technologies`}
          >
            {project.stack.map((tech) => (
              <li key={tech}>{tech}</li>
            ))}
          </ul>
          {project.note && (
            <small className="project-note">{project.note}</small>
          )}
        </div>
      </div>
      <p className="sr-only" role="status" aria-live="polite">
        Project {active + 1} of {projects.length}: {project.name}.
      </p>
    </div>
  );
}
