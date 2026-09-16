import Image from "next/image";

const SIZES = {
  sm: { px: 28, cdnW: 40, w: "w-7", h: "h-5" },
  md: { px: 28, cdnW: 40, w: "w-7", h: "h-5" },
  lg: { px: 28, cdnW: 40, w: "w-7", h: "h-5" },
};

export default function FlagImage({ code, label = "", size = "md", className = "" }) {
  const { px, cdnW, w, h } = SIZES[size] ?? SIZES.md;

  if (!code) {
    return (
      <span
        className={`inline-flex ${w} ${h} shrink-0 items-center justify-center ${className}`}
        aria-label={label}
      >
        🏁
      </span>
    );
  }

  return (
    <Image
      src={`https://flagcdn.com/w${cdnW}/${code}.png`}
      width={px}
      height={Math.round(px * 0.67)}                       
      alt={label}
      className={`inline-block ${w} ${h} shrink-0 rounded-xs object-cover shadow-sm ${className}`}
      unoptimized
    />
  );
}
