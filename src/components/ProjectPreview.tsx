"use client";

import Image from "next/image";
import { useState } from "react";
import type { Project } from "@/data/projects";

export function ProjectPreview({ project }: { project: Project }) {
  const [hovered, setHovered] = useState(false);
  const [selected, setSelected] = useState(false);
  const [coverFailed, setCoverFailed] = useState(false);
  const showingFeature = coverFailed || hovered || selected;

  return (
    <div
      className="project-preview"
      data-feature={showingFeature}
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse") setHovered(true);
      }}
      onPointerLeave={() => setHovered(false)}
    >
      <Image
        className="project-preview-cover"
        src={project.coverImage!}
        alt={project.coverAlt || ""}
        fill
        sizes="(max-width: 760px) 85vw, 900px"
        draggable={false}
        aria-hidden={showingFeature}
        onError={() => setCoverFailed(true)}
      />
      <Image
        className="project-preview-feature"
        src={project.image!}
        alt={project.imageAlt || ""}
        fill
        sizes="(max-width: 760px) 85vw, 900px"
        draggable={false}
        aria-hidden={!showingFeature}
      />
      <button
        className="project-preview-toggle"
        type="button"
        aria-label={`${project.name}: ${project.featureLabel}`}
        aria-pressed={selected}
        onClick={() => {
          setHovered(false);
          setSelected((value) => !value);
        }}
        onBlur={() => setSelected(false)}
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            setSelected(false);
            setHovered(false);
          }
        }}
      >
        {selected ? "Cover" : project.featureLabel}
      </button>
    </div>
  );
}
