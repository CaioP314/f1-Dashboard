import Link from "next/link";
import NumBadge from "./NumBadge";
import FlagImage from "./FlagImage";
import { statusLabel } from "@/lib/format";
import { nationalityCode } from "@/lib/flags";

const PODIUM_TONE = { 1: "gold", 2: "silver", 3: "bronze" };

export default function ResultsTable({ results }) {
  return (
    <div className="overflow-x-auto rounded-sm border border-line">
      <table className="w-full min-w-[640px] border-collapse text-sm">
        <thead>
          <tr className="border-b border-line bg-surface text-left text-[11px] uppercase tracking-widest text-muted">
            <th className="px-3 py-3 font-semibold">Pos</th>
            <th className="px-3 py-3 font-semibold">Piloto</th>
            <th className="px-3 py-3 font-semibold">Equipe</th>
            <th className="px-3 py-3 font-semibold text-right">Voltas</th>
            <th className="px-3 py-3 font-semibold text-right">Tempo / Status</th>
            <th className="px-3 py-3 font-semibold text-right">Pontos</th>
          </tr>
        </thead>
        <tbody>
          {results.map((r) => (
            <tr
              key={r.Driver.driverId}
              className="border-b border-line/60 last:border-0 odd:bg-transparent even:bg-surface/40"
            >
              <td className="px-3 py-3">
                <NumBadge value={r.position} size="sm" tone={PODIUM_TONE[r.position] ?? "plain"} />
              </td>
              <td className="px-3 py-3">
                <Link
                  href={`/drivers/${r.Driver.driverId}`}
                  className="flex items-center gap-2 font-semibold text-text hover:text-accent"
                >
                  <FlagImage
                    code={nationalityCode(r.Driver.nationality)}
                    label={r.Driver.nationality}
                    size="sm"
                  />
                  {r.Driver.givenName} {r.Driver.familyName}
                </Link>
              </td>
              <td className="px-3 py-3 text-muted">{r.Constructor.name}</td>
              <td className="px-3 py-3 text-right font-mono tabular-nums text-muted">{r.laps}</td>
              <td className="px-3 py-3 text-right font-mono tabular-nums text-muted">
                {r.Time?.time ?? statusLabel(r.status)}
              </td>
              <td className="px-3 py-3 text-right font-mono tabular-nums font-semibold text-text">
                {r.points}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
