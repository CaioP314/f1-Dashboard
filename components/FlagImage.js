import Image from "next/image";

const SIZES = {
  sm: { px: 20, cdnW: 40,  w: "w-5"  },
  md: { px: 28, cdnW: 40,  w: "w-7"  },
  lg: { px: 40, cdnW: 80,  w: "w-10" },
};

export default function FlagImage({ code, label = "", size = "md", className = "" }) {
  const { px, cdnW, w } = SIZES[size] ?? SIZES.md;

  if (!code) {
    return <span className={`inline-block ${w} ${className}`} aria-label={label}>🏁</span>;
  }

  return (
    <Image
      src={`https://flagcdn.com/w${cdnW}/${code}.png`}
      width={px}
      height={Math.round(px * 0.67)}                       
      alt={label}
      className={`inline-block shrink-0 rounded-[2px] object-cover shadow-sm ${w} ${className}`}
      unoptimized
    />
  );
}
