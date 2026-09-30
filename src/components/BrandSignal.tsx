"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export function BrandSignal() {
  const [playing, setPlaying] = useState(false);
  const [visible, setVisible] = useState(true);
  const [reduced, setReduced] = useState(false);
  const element = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => {
      setReduced(preference.matches);
      if (preference.matches) setPlaying(false);
    };
    const updateVisibility = () => {
      if (document.hidden) setPlaying(false);
    };
    updatePreference();
    preference.addEventListener("change", updatePreference);
    document.addEventListener("visibilitychange", updateVisibility);
    const observer = new IntersectionObserver(([entry]) =>
      setVisible(entry.isIntersecting),
    );
    if (element.current) observer.observe(element.current);
    return () => {
      preference.removeEventListener("change", updatePreference);
      document.removeEventListener("visibilitychange", updateVisibility);
      observer.disconnect();
    };
  }, []);

  const active = playing && visible && !reduced;
  return (
    <div className="brand-signal" ref={element}>
      <div className="signal-topline" aria-hidden="true">
        <span>MC — PERSONAL MARK</span>
        <span>DESIGN × CODE</span>
      </div>
      <div
        className={`signal-art ${active ? "is-playing" : ""}`}
        aria-hidden="true"
      >
        <Image
          src="/brand/mc.svg"
          alt=""
          width={460}
          height={510}
          className="hero-mark"
          preload
        />
        {active && (
          <div className="rain-mark">
            <Image
              src="/brand/code-rain.svg"
              alt=""
              fill
              sizes="360px"
              className="rain-image"
            />
          </div>
        )}
      </div>
      <div className="signal-bottomline">
        <span>
          Code in progress
          <span className="terminal-cursor" aria-hidden="true">
            _
          </span>
        </span>
        <button
          type="button"
          className="signal-toggle"
          disabled={reduced}
          aria-pressed={playing}
          onClick={() => setPlaying(!playing)}
        >
          <span aria-hidden="true">{playing ? "Ⅱ" : "▷"}</span>{" "}
          {reduced ? "Motion reduced" : playing ? "Pause rain" : "Make it rain"}
        </button>
      </div>
    </div>
  );
}
