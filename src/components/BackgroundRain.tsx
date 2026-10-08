"use client";

import { useEffect, useRef, useState } from "react";

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
    document.documentElement.toggleAttribute("data-motion-paused", paused);
    return () => document.documentElement.removeAttribute("data-motion-paused");
  }, [paused]);

  useEffect(() => {
    const element = canvas.current;
    const context = element?.getContext("2d");
    if (!element || !context) return;
    if (
      paused ||
      reduced ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      context.clearRect(0, 0, element.width, element.height);
      return;
    }
    const alphabet = "アイウエオカキクケコサシスセソタチツテト01{}<>/";
    let width = 0;
    let height = 0;
    let frame = 0;
    let previous = 0;
    let pointer = { x: -1000, y: -1000, strength: 0 };
    let pulses: { x: number; y: number; radius: number; life: number }[] = [];
    let streams: {
      x: number;
      y: number;
      speed: number;
      depth: number;
      chars: string[];
    }[] = [];
    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const scale = Math.min(window.devicePixelRatio || 1, 1.5);
      element.width = width * scale;
      element.height = height * scale;
      context.setTransform(scale, 0, 0, scale, 0, 0);
      streams = Array.from({ length: Math.ceil(width / 30) }, (_, index) => ({
        x: index * 30 + 15,
        y: Math.random() * (height + 420),
        speed: 30 + Math.random() * 45,
        depth: 0.6 + Math.random() * 0.65,
        chars: Array.from(
          { length: 14 + Math.floor(Math.random() * 8) },
          () => alphabet[Math.floor(Math.random() * alphabet.length)],
        ),
      }));
    };
    const move = (event: PointerEvent) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.strength = 1;
    };
    const leave = () => {
      pointer.strength = 0;
    };
    const pulse = (event: PointerEvent) => {
      move(event);
      pulses = [
        ...pulses.slice(-4),
        { x: event.clientX, y: event.clientY, radius: 0, life: 1 },
      ];
    };
    const draw = (time: number) => {
      frame = requestAnimationFrame(draw);
      if (time - previous < 32) return;
      const delta = previous ? Math.min((time - previous) / 1000, 0.1) : 0;
      previous = time;
      context.clearRect(0, 0, width, height);
      if (pointer.strength > 0.01) {
        const light = context.createRadialGradient(
          pointer.x,
          pointer.y,
          0,
          pointer.x,
          pointer.y,
          240,
        );
        light.addColorStop(0, `rgba(159,179,236,${0.12 * pointer.strength})`);
        light.addColorStop(1, "rgba(159,179,236,0)");
        context.fillStyle = light;
        context.fillRect(0, 0, width, height);
        pointer.strength *= 0.997;
      }
      for (const stream of streams) {
        stream.y += stream.speed * delta;
        if (stream.y > height + 440) stream.y = -20;
        context.font = `${Math.round(13 * stream.depth)}px monospace`;
        stream.chars.forEach((char, index) => {
          const y = stream.y - index * 21 * stream.depth;
          if (y < -20 || y > height + 20) return;
          const dx = stream.x - pointer.x;
          const dy = y - pointer.y;
          const distance = Math.hypot(dx, dy);
          const proximity = Math.max(0, 1 - distance / 190) * pointer.strength;
          const bend = (dx / (distance || 1)) * proximity * 42;
          const edge = Math.abs(stream.x - width / 2) / (width / 2);
          const trail = 1 - index / stream.chars.length;
          const alpha =
            trail * trail * (0.15 + edge * 0.18) * stream.depth +
            proximity * 0.6;
          context.fillStyle = `rgba(${index === 0 || proximity > 0.4 ? "198,212,255" : "159,179,236"},${Math.min(alpha, 0.85)})`;
          context.fillText(char, stream.x + bend, y);
        });
      }
      pulses = pulses.filter((item) => item.life > 0);
      for (const item of pulses) {
        item.radius += delta * 200;
        item.life -= delta * 0.8;
        context.strokeStyle = `rgba(159,179,236,${Math.max(0, item.life) * 0.28})`;
        context.lineWidth = 1;
        context.beginPath();
        context.arc(item.x, item.y, item.radius, 0, Math.PI * 2);
        context.stroke();
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
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", pulse, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", pulse);
      document.documentElement.removeEventListener("pointerleave", leave);
      document.removeEventListener("visibilitychange", visibility);
      context.clearRect(0, 0, width, height);
    };
  }, [paused, reduced]);

  return (
    <>
      <div className="background-atmosphere" aria-hidden="true" />
      <canvas ref={canvas} className="background-rain" aria-hidden="true" />
      <button
        className="rain-control"
        type="button"
        aria-pressed={paused}
        disabled={reduced}
        onClick={() => setPaused(!paused)}
      >
        <span aria-hidden="true">{paused || reduced ? "▷" : "Ⅱ"}</span>
        {reduced ? "Motion reduced" : paused ? "Resume motion" : "Pause motion"}
      </button>
    </>
  );
}
