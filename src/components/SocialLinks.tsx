const profiles = [
  {
    name: "GitHub",
    url: "https://github.com/vetematts",
    detail: "Code & side projects",
    icon: "github",
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/matthewcicala",
    detail: "Let’s connect",
    icon: "linkedin",
  },
];

function ProfileIcon({ platform }: { platform: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      fill="currentColor"
    >
      {platform === "github" ? (
        <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2.23c-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.68 0-1.25.45-2.28 1.18-3.08-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.16 1.18a10.96 10.96 0 0 1 5.76 0c2.2-1.49 3.16-1.18 3.16-1.18.62 1.59.23 2.76.11 3.05.74.8 1.18 1.83 1.18 3.08 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.13v3.25c0 .31.21.68.79.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
      ) : (
        <>
          <rect
            x="1"
            y="1"
            width="22"
            height="22"
            rx="3"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <circle cx="6.7" cy="7" r="1.5" />
          <path d="M5.3 10h2.8v8.6H5.3zm5.1 0h2.7v1.2c.6-.9 1.5-1.4 2.8-1.4 2.7 0 3.4 1.7 3.4 4.1v4.7h-2.8v-4.2c0-1.2-.1-2.2-1.5-2.2s-1.8 1.1-1.8 2.2v4.2h-2.8z" />
        </>
      )}
    </svg>
  );
}

export function SocialLinks({
  variant = "cards",
}: {
  variant?: "compact" | "cards";
}) {
  return (
    <nav
      className={`profile-links profile-links--${variant}`}
      aria-label={variant === "compact" ? "Social profiles" : "Connect with me"}
    >
      {profiles.map((profile) => (
        <a
          key={profile.name}
          href={profile.url}
          target="_blank"
          rel="noreferrer"
        >
          <span className="profile-icon">
            <ProfileIcon platform={profile.icon} />
          </span>
          <span className="profile-label">
            <strong>{profile.name}</strong>
            {variant === "cards" && <small>{profile.detail}</small>}
          </span>
          <span className="profile-arrow" aria-hidden="true">
            ↗
          </span>
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      ))}
    </nav>
  );
}
