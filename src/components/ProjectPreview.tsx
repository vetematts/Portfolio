"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Project } from "@/data/projects";

export function ProjectShareCover({ project }: { project: Project }) {
  const [failed, setFailed] = useState(false);
  const useShare = project.shareImage && !failed;

  return (
    <div className="project-preview project-share-cover">
      <Image
        src={useShare ? project.shareImage! : project.image!}
        alt={useShare ? project.shareImageAlt || "" : project.imageAlt || ""}
        fill
        sizes="(max-width: 760px) 85vw, 900px"
        draggable={false}
        onError={() => setFailed(true)}
      />
    </div>
  );
}

export function ProjectPreview({ project }: { project: Project }) {
  const video = useRef<HTMLVideoElement>(null);
  const requested = useRef(false);
  const requestId = useRef(0);
  const autoStarted = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  const [motionPaused, setMotionPaused] = useState(false);

  const pause = useCallback(() => {
    requestId.current += 1;
    requested.current = false;
    video.current?.pause();
    setPlaying(false);
  }, []);

  const play = useCallback(
    (automatic = false) => {
      const element = video.current;
      if (
        !element ||
        failed ||
        document.documentElement.hasAttribute("data-motion-paused") ||
        (automatic &&
          window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      )
        return;
      requested.current = true;
      const attempt = ++requestId.current;
      if (!element.getAttribute("src")) element.src = project.previewVideo!;
      element.muted = true;
      void element.play().catch(() => {
        if (requested.current && attempt === requestId.current) pause();
      });
    },
    [failed, pause, project.previewVideo],
  );

  useEffect(() => {
    const element = video.current;
    if (!element) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobile = window.matchMedia("(max-width: 760px), (hover: none)");
    let inView = false;
    const startMobile = () => {
      if (
        inView &&
        mobile.matches &&
        !autoStarted.current &&
        !failed &&
        !motion.matches &&
        !document.hidden &&
        !document.documentElement.hasAttribute("data-motion-paused")
      ) {
        autoStarted.current = true;
        play(true);
      }
    };
    const visibility = () => {
      if (document.hidden) pause();
    };
    const reduce = () => {
      if (motion.matches) pause();
    };
    const syncPause = () => {
      const paused =
        document.documentElement.hasAttribute("data-motion-paused");
      setMotionPaused(paused);
      if (paused) pause();
      else startMobile();
    };
    syncPause();
    const settings = new MutationObserver(syncPause);
    settings.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-motion-paused"],
    });
    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting && entry.intersectionRatio >= 0.5;
        if (!inView) pause();
        else startMobile();
      },
      { threshold: [0, 0.5] },
    );
    visibilityObserver.observe(element);
    document.addEventListener("visibilitychange", visibility);
    motion.addEventListener("change", reduce);
    mobile.addEventListener("change", startMobile);
    return () => {
      requested.current = false;
      element.pause();
      settings.disconnect();
      visibilityObserver.disconnect();
      document.removeEventListener("visibilitychange", visibility);
      motion.removeEventListener("change", reduce);
      mobile.removeEventListener("change", startMobile);
    };
  }, [failed, pause, play]);

  return (
    <div
      className="project-preview"
      onPointerEnter={(event) => {
        if (
          event.pointerType === "mouse" &&
          !window.matchMedia("(max-width: 760px), (hover: none)").matches
        )
          play(true);
      }}
      onPointerLeave={(event) => {
        if (
          event.pointerType === "mouse" &&
          !window.matchMedia("(max-width: 760px), (hover: none)").matches
        )
          pause();
      }}
    >
      <Image
        src={project.image!}
        alt={project.imageAlt || ""}
        fill
        sizes="(max-width: 760px) 85vw, 900px"
        draggable={false}
      />
      <video
        ref={video}
        className="project-preview-video"
        poster={project.image}
        preload="none"
        muted
        playsInline
        loop
        width={1280}
        height={720}
        aria-hidden="true"
        hidden={failed}
        onPlaying={() => {
          if (!requested.current || document.hidden) pause();
          else setPlaying(true);
        }}
        onPause={() => setPlaying(false)}
        onError={() => {
          pause();
          setFailed(true);
        }}
      />
      <button
        className="project-preview-toggle"
        type="button"
        aria-label={`${playing ? "Pause" : "Play"} ${project.name} preview`}
        disabled={failed || motionPaused}
        onClick={() => {
          if (requested.current) pause();
          else play();
        }}
        onBlur={pause}
        onKeyDown={(event) => {
          if (event.key === "Escape") pause();
        }}
      >
        {failed
          ? "Preview unavailable"
          : motionPaused
            ? "Motion paused"
            : playing
              ? "Pause preview"
              : "Play preview"}
      </button>
    </div>
  );
}
