import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { title?: string };

/**
 * Gemeinsame Icon-Semantik: Ohne `title` sind die SVGs rein dekorativ und
 * werden für Screenreader ausgeblendet (`aria-hidden`). Mit `title` bekommen
 * sie eine Bild-Rolle samt Beschriftung. Ein vom Aufrufer gesetztes
 * `aria-hidden`/`role` gewinnt (steht im Spread hinter den Defaults).
 */
function base(props: IconProps) {
  const { title, ...rest } = props;
  const a11y: SVGProps<SVGSVGElement> = title
    ? { role: "img", "aria-label": title }
    : { "aria-hidden": true };
  return { rest: { ...a11y, ...rest } };
}

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function ArrowRight(props: IconProps) {
  const { rest } = base(props);
  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" {...stroke} {...rest}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function ArrowUp(props: IconProps) {
  const { rest } = base(props);
  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" {...stroke} {...rest}>
      <path d="M12 19V5M6 11l6-6 6 6" />
    </svg>
  );
}

export function Check(props: IconProps) {
  const { rest } = base(props);
  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" {...stroke} {...rest}>
      <path d="M4 12.5l5 5L20 6.5" />
    </svg>
  );
}

export function Compass(props: IconProps) {
  const { rest } = base(props);
  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" {...stroke} {...rest}>
      <circle cx="12" cy="12" r="9" />
      <path d="M15.5 8.5l-2 5-5 2 2-5 5-2z" />
    </svg>
  );
}

export function Spark(props: IconProps) {
  const { rest } = base(props);
  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" {...stroke} {...rest}>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M18 6l-2.5 2.5M8.5 15.5L6 18" />
      <circle cx="12" cy="12" r="2.5" />
    </svg>
  );
}

export function Shield(props: IconProps) {
  const { rest } = base(props);
  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" {...stroke} {...rest}>
      <path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

export function Brain(props: IconProps) {
  const { rest } = base(props);
  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" {...stroke} {...rest}>
      <path d="M9 7a3 3 0 00-3 3 3 3 0 00-1 5.5A3 3 0 009 20V7z" />
      <path d="M15 7a3 3 0 013 3 3 3 0 011 5.5A3 3 0 0115 20V7z" />
      <path d="M9 7a3 3 0 016 0M9 12h1.5M15 12h-1.5" />
    </svg>
  );
}

export function Star(props: IconProps) {
  const { rest } = base(props);
  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" {...rest}>
      <path d="M12 2.5l2.9 5.9 6.5.95-4.7 4.58 1.11 6.47L12 17.9l-5.81 3.06 1.11-6.47-4.7-4.58 6.5-.95L12 2.5z" />
    </svg>
  );
}

export function Menu(props: IconProps) {
  const { rest } = base(props);
  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" {...stroke} {...rest}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function Close(props: IconProps) {
  const { rest } = base(props);
  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" {...stroke} {...rest}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

export function Plus(props: IconProps) {
  const { rest } = base(props);
  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" {...stroke} {...rest}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export function Download(props: IconProps) {
  const { rest } = base(props);
  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" {...stroke} {...rest}>
      <path d="M12 4v10m0 0l-4-4m4 4l4-4M5 18h14" />
    </svg>
  );
}

export function Play(props: IconProps) {
  const { rest } = base(props);
  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" {...stroke} {...rest}>
      <circle cx="12" cy="12" r="9" />
      <path d="M10 8.5l6 3.5-6 3.5v-7z" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function Chat(props: IconProps) {
  const { rest } = base(props);
  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" {...stroke} {...rest}>
      <path d="M5 5h14a2 2 0 012 2v8a2 2 0 01-2 2H9l-4 3v-3H5a2 2 0 01-2-2V7a2 2 0 012-2z" />
      <path d="M8.5 10.5h7M8.5 13h4" />
    </svg>
  );
}

export function Mail(props: IconProps) {
  const { rest } = base(props);
  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" {...stroke} {...rest}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M4 7l8 6 8-6" />
    </svg>
  );
}

/* ---- Social ---- */

export function Instagram(props: IconProps) {
  const { rest } = base(props);
  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" {...stroke} {...rest}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17" cy="7" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function Facebook(props: IconProps) {
  const { rest } = base(props);
  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" {...rest}>
      <path d="M13.5 21v-7h2.3l.4-2.8h-2.7V9.3c0-.8.3-1.4 1.5-1.4h1.3V5.4c-.6-.1-1.4-.2-2.3-.2-2.3 0-3.8 1.4-3.8 3.9v2.1H7.7V14h2.2v7h3.6z" />
    </svg>
  );
}

export function Youtube(props: IconProps) {
  const { rest } = base(props);
  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" {...rest}>
      <path d="M21.6 8.2a2.5 2.5 0 00-1.75-1.77C18.3 6 12 6 12 6s-6.3 0-7.85.43A2.5 2.5 0 002.4 8.2 26 26 0 002 12a26 26 0 00.4 3.8 2.5 2.5 0 001.75 1.77C5.7 18 12 18 12 18s6.3 0 7.85-.43a2.5 2.5 0 001.75-1.77A26 26 0 0022 12a26 26 0 00-.4-3.8zM10 15V9l5 3-5 3z" />
    </svg>
  );
}

export function Linkedin(props: IconProps) {
  const { rest } = base(props);
  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" {...rest}>
      <path d="M6.94 8.5H4.06V20h2.88V8.5zM5.5 3.5A1.7 1.7 0 103.8 5.2 1.7 1.7 0 005.5 3.5zM20 20v-6.3c0-3.37-1.8-4.94-4.2-4.94a3.63 3.63 0 00-3.29 1.8h-.04V8.5H9.7V20h2.88v-5.7c0-1.5.29-2.95 2.15-2.95s1.85 1.72 1.85 3.05V20H20z" />
    </svg>
  );
}

export function Telegram(props: IconProps) {
  const { rest } = base(props);
  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" {...rest}>
      <path d="M21.9 4.6l-3 14.2c-.22 1-.82 1.25-1.66.78l-4.6-3.4-2.22 2.14c-.25.25-.45.45-.92.45l.33-4.7L18.4 6.4c.37-.33-.08-.5-.57-.18l-10.6 6.68-4.57-1.43c-.99-.31-1-.99.21-1.46l17.85-6.88c.83-.3 1.55.2 1.28 1.47z" />
    </svg>
  );
}

export const socialIcons = {
  instagram: Instagram,
  facebook: Facebook,
  youtube: Youtube,
  linkedin: Linkedin,
  telegram: Telegram,
} as const;
