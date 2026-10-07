"use client";

import { useEffect, useRef, useState } from "react";
import type { Project } from "@/data/projects";

export function LiveProjectPreview({ project }: { project: Project }) {
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (!open) return;
    const panel = dialog.current;
    if (!panel) return;
    const previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    panel.showModal();
    return () => {
      panel.close();
      document.documentElement.style.overflow = previousOverflow;
    };
  }, [open]);

  if (!project.previewUrl || !project.url) return null;

  return (
    <>
      <button
        className="button primary"
        type="button"
        aria-haspopup="dialog"
        onClick={() => {
          setLoaded(false);
          setOpen(true);
        }}
      >
        Try it <span aria-hidden="true">↗</span>
        <span className="sr-only"> — preview {project.name}</span>
      </button>
      <dialog
        ref={dialog}
        className="live-preview"
        aria-labelledby={`preview-title-${project.id}`}
        onClose={() => setOpen(false)}
        onClick={(event) => {
          if (event.target !== event.currentTarget) return;
          const bounds = event.currentTarget.getBoundingClientRect();
          if (
            event.clientX < bounds.left ||
            event.clientX > bounds.right ||
            event.clientY < bounds.top ||
            event.clientY > bounds.bottom
          )
            event.currentTarget.close();
        }}
      >
        <div className="live-preview-shell">
          <div className="live-preview-toolbar">
            <div className="live-preview-identity">
              <h4 id={`preview-title-${project.id}`}>{project.name}</h4>
              <span>{new URL(project.url).hostname}</span>
            </div>
            <a href={project.url} target="_blank" rel="noreferrer">
              Open site <span aria-hidden="true">↗</span>
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            <button
              className="live-preview-close"
              type="button"
              aria-label="Close live preview"
              autoFocus
              onClick={() => dialog.current?.close()}
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="live-preview-content">
            {open && (
              <iframe
                src={project.previewUrl}
                title={`${project.name} live website`}
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox allow-downloads"
                referrerPolicy="strict-origin-when-cross-origin"
                onLoad={() => setLoaded(true)}
              />
            )}
            {open && !loaded && (
              <p className="live-preview-loading" role="status">
                <span aria-hidden="true" /> Loading {project.name}…
              </p>
            )}
          </div>
        </div>
      </dialog>
    </>
  );
}
