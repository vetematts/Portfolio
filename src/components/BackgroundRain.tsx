"use client";

import { useEffect, useRef, useState } from "react";

// Ambient decoration only; the brand mark is rendered independently.
export function BackgroundRain() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(preference.matches);
    update();
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const element = canvas.current;
    const context = element?.getContext("2d");
    if (!element || !context) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (paused || reduced || preference.matches) {
      context.clearRect(0, 0, element.width, element.height);
      return;
    }

    const alphabet = "アイウエオカキクケコサシスセソタチツテト01{}<>/";
    let width = 0;
    let height = 0;
    let streams: { x: number; y: number; speed: number; chars: string[] }[] =
      [];
    let frame = 0;
    let previous = 0;
    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const scale = Math.min(window.devicePixelRatio || 1, 1.5);
      element.width = width * scale;
      element.height = height * scale;
      context.setTransform(scale, 0, 0, scale, 0, 0);
      context.font = "12px monospace";
      streams = Array.from({ length: Math.ceil(width / 64) }, (_, index) => ({
        x: index * 64 + 24,
        y: Math.random() * (height + 220),
        speed: 12 + Math.random() * 16,
        chars: Array.from(
          { length: 10 },
          () => alphabet[Math.floor(Math.random() * alphabet.length)],
        ),
      }));
    };
    const draw = (time: number) => {
      frame = requestAnimationFrame(draw);
      if (time - previous < 50) return;
      const delta = previous ? Math.min((time - previous) / 1000, 0.1) : 0;
      previous = time;
      context.clearRect(0, 0, width, height);
      for (const stream of streams) {
        stream.y += stream.speed * delta;
        if (stream.y > height + 220) stream.y = -40;
        stream.chars.forEach((char, index) => {
          const alpha = (1 - index / stream.chars.length) * 0.2;
          context.fillStyle = `rgba(159, 179, 236, ${alpha})`;
          context.fillText(char, stream.x, stream.y - index * 20);
        });
      }
    };
    const visibility = () => {
      cancelAnimationFrame(frame);
      previous = 0;
      if (!document.hidden) frame = requestAnimationFrame(draw);
    };
    resize();
    if (!document.hidden) frame = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", visibility);
      context.clearRect(0, 0, width, height);
    };
  }, [paused, reduced]);

  return (
    <>
      <canvas ref={canvas} className="background-rain" aria-hidden="true" />
      <button
        className="rain-control"
        type="button"
        aria-pressed={paused}
        disabled={reduced}
        onClick={() => setPaused(!paused)}
      >
        <span aria-hidden="true">{paused || reduced ? "▷" : "Ⅱ"}</span>
        {reduced
          ? "Motion reduced"
          : paused
            ? "Resume background rain"
            : "Pause background rain"}
      </button>
    </>
  );
}
