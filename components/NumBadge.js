const TONES = {
  plain: "border-line text-muted",
  accent: "border-accent text-accent",
  gold: "border-gold text-gold",
  silver: "border-silver text-silver",
  bronze: "border-bronze text-bronze",
};

const SIZES = {
  sm: "h-7 min-w-7 px-1.5 text-xs",
  md: "h-9 min-w-9 px-2 text-sm",
  lg: "h-14 min-w-14 px-3 text-xl",
};

export default function NumBadge({ value, tone = "plain", size = "md", className = "" }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-sm border font-mono font-bold tabular-nums ${
        TONES[tone] ?? TONES.plain
      } ${SIZES[size] ?? SIZES.md} ${className}`}
    >
      {value}
    </span>
  );
}
