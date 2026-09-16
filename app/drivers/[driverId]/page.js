import Link from "next/link";
import { notFound } from "next/navigation";
import { getDriverInfo, getDriverCurrentStanding, getDriverResults } from "@/lib/api";
import { formatDateLong } from "@/lib/format";
import { nationalityCode } from "@/lib/flags";
import NumBadge from "@/components/NumBadge";
import FlagImage from "@/components/FlagImage";

export const revalidate = 1800;

const PODIUM_TONE = { 1: "gold", 2: "silver", 3: "bronze" };

export default async function DriverPage({ params }) {
  const { driverId } = await params;

  const [driver, standing, races] = await Promise.all([
    getDriverInfo(driverId),
    getDriverCurrentStanding(driverId),
    getDriverResults(driverId),
  ]);

  if (!driver) notFound();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-16">
      <Link href="/drivers" className="text-xs uppercase tracking-widest text-muted hover:text-accent">
        ← Pilotos
      </Link>

      <div className="mt-4 flex flex-wrap items-center gap-4">
        {driver.permanentNumber && (
          <NumBadge value={driver.permanentNumber} size="lg" tone="accent" />
        )}
        <div>
          <h1 className="flex items-center gap-3 text-3xl font-black uppercase tracking-tight text-text sm:text-4xl">
            <FlagImage
              code={nationalityCode(driver.nationality)}
              label={driver.nationality}
              size="md"
            />
            {driver.givenName} {driver.familyName}
          </h1>
          <p className="mt-1 text-sm text-muted">
            {driver.nationality} · {formatDateLong(driver.dateOfBirth)}
            {driver.code ? ` · ${driver.code}` : ""}
          </p>
        </div>
      </div>

      {standing && (
        <div className="mt-8 grid grid-cols-3 gap-3 sm:max-w-md">
          <div className="rounded-sm border border-line bg-surface p-4 text-center">
            <p className="font-mono text-2xl font-bold tabular-nums text-text">{standing.position}º</p>
            <p className="mt-1 text-[10px] uppercase tracking-widest text-muted">Posição</p>
          </div>
          <div className="rounded-sm border border-line bg-surface p-4 text-center">
            <p className="font-mono text-2xl font-bold tabular-nums text-text">{standing.points}</p>
            <p className="mt-1 text-[10px] uppercase tracking-widest text-muted">Pontos</p>
          </div>
          <div className="rounded-sm border border-line bg-surface p-4 text-center">
            <p className="font-mono text-2xl font-bold tabular-nums text-text">{standing.wins}</p>
            <p className="mt-1 text-[10px] uppercase tracking-widest text-muted">Vitórias</p>
          </div>
        </div>
      )}

      <section className="mt-12">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-muted">
          Resultados na temporada
        </h2>

        {races.length === 0 ? (
          <p className="mt-4 text-sm text-muted">Nenhum resultado encontrado ainda nesta temporada.</p>
        ) : (
          <div className="mt-4 overflow-x-auto rounded-sm border border-line">
            <table className="w-full min-w-[560px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-line bg-surface text-left text-[11px] uppercase tracking-widest text-muted">
                  <th className="px-3 py-3 font-semibold">Corrida</th>
                  <th className="px-3 py-3 font-semibold">Equipe</th>
                  <th className="px-3 py-3 font-semibold text-right">Grid</th>
                  <th className="px-3 py-3 font-semibold text-right">Resultado</th>
                  <th className="px-3 py-3 font-semibold text-right">Pontos</th>
                </tr>
              </thead>
              <tbody>
                {races.map((race) => {
                  const result = race.Results[0];
                  return (
                    <tr
                      key={`${race.season}-${race.round}`}
                      className="border-b border-line/60 last:border-0 odd:bg-transparent even:bg-surface/40"
                    >
                      <td className="px-3 py-3">
                        <Link
                          href={`/races/${race.season}/${race.round}`}
                          className="font-semibold text-text hover:text-accent"
                        >
                          {race.raceName}
                        </Link>
                      </td>
                      <td className="px-3 py-3 text-muted">{result.Constructor.name}</td>
                      <td className="px-3 py-3 text-right font-mono tabular-nums text-muted">
                        {result.grid}
                      </td>
                      <td className="px-3 py-3 text-right">
                        <NumBadge
                          value={result.position}
                          size="md"
                          tone={PODIUM_TONE[result.position] ?? "plain"}
                        />
                      </td>
                      <td className="px-3 py-3 text-right font-mono tabular-nums font-semibold text-text">
                        {result.points}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
