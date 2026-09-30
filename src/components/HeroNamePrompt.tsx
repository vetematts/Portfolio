export function HeroNamePrompt() {
  return (
    <p className="hero-name-prompt">
      <span className="sr-only">Matt</span>
      <span className="prompt-text" aria-hidden="true">
        <span className="prompt-prefix">&gt;</span>
        <span className="prompt-name">
          <span className="prompt-char prompt-m">m</span>
          <span className="prompt-char prompt-a">a</span>
          <span className="prompt-char prompt-t1">t</span>
          <span className="prompt-char prompt-t2">t</span>
          <span className="prompt-cursor-position">
            <span className="prompt-cursor">_</span>
          </span>
        </span>
      </span>
    </p>
  );
}
