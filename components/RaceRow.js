import Link from "next/link";
import NumBadge from "./NumBadge";
import StatusPill from "./StatusPill";
import FlagImage from "./FlagImage";
import { formatDateLong } from "@/lib/format";
import { countryCode } from "@/lib/flags";

export default function RaceRow({ race, status }) {
  return (
    <Link
      href={`/races/${race.season}/${race.round}`}
      className="flex items-center gap-4 rounded-sm border border-line bg-surface p-4 transition-colors hover:border-accent"
    >
      <NumBadge
        value={String(race.round).padStart(2, "0")}
        tone={status === "next" ? "accent" : "plain"}
      />

      <div className="min-w-0 flex-1">
        <p className="flex items-center gap-2 truncate font-bold uppercase tracking-tight text-text">
          <FlagImage
            code={countryCode(race.Circuit.Location.country)}
            label={race.Circuit.Location.country}
            size="sm"
          />
          {race.raceName}
        </p>
        <p className="truncate text-xs text-muted">
          {race.Circuit.circuitName} · {race.Circuit.Location.locality}, {race.Circuit.Location.country}
        </p>
      </div>

      <p className="hidden shrink-0 font-mono text-sm tabular-nums text-text sm:block">
        {formatDateLong(race.date)}
      </p>

      <StatusPill status={status} />
    </Link>
  );
}
