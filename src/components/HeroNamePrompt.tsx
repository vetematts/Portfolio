import Image from "next/image";
import type { CSSProperties } from "react";

export function HeroNamePrompt({ fullName = false }: { fullName?: boolean }) {
  const name = fullName ? "matt cicala" : "matt";
  return (
    <span
      className="hero-name-prompt"
      style={{ "--name-length": name.length } as CSSProperties}
    >
      <Image
        className="prompt-mark"
        src="/brand/mc.svg"
        alt=""
        width={72}
        height={80}
        loading="eager"
      />
      <span className="prompt-name">
        <span
          className={`prompt-reveal ${fullName ? "prompt-reveal--full" : "prompt-reveal--short"}`}
        >
          <span className="prompt-letters">{name}</span>
          <span className="prompt-cursor-position">
            <span className="prompt-cursor">_</span>
          </span>
        </span>
      </span>
    </span>
  );
}
