import Link from "next/link";
import NumBadge from "./NumBadge";
import FlagImage from "./FlagImage";
import { nationalityCode } from "@/lib/flags";

const PODIUM_TONE = { 1: "gold", 2: "silver", 3: "bronze" };

export default function DriverCard({ standing }) {
  const { Driver, Constructors, position, points } = standing;

  return (
    <Link
      href={`/drivers/${Driver.driverId}`}
      className="group flex items-center gap-4 rounded-sm border border-line bg-surface p-4 transition-colors hover:border-accent"
    >
      <NumBadge value={position} size="lg" tone={PODIUM_TONE[position] ?? "plain"} />

      <FlagImage
        code={nationalityCode(Driver.nationality)}
        label={Driver.nationality}
        size="md"
      />

      <div className="min-w-0 flex-1">
        <p className="truncate font-bold uppercase tracking-tight text-text group-hover:text-accent">
          {Driver.givenName} {Driver.familyName}
        </p>
        <p className="truncate text-xs text-muted">{Constructors?.[0]?.name}</p>
      </div>

      <div className="text-right">
        <p className="font-mono text-lg font-bold tabular-nums text-text">{points}</p>
        <p className="text-[10px] uppercase tracking-widest text-muted">pts</p>
      </div>
    </Link>
  );
}
