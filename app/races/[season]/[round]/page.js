import Link from "next/link";
import { notFound } from "next/navigation";
import { getRaceResults } from "@/lib/api";
import { formatDateLong } from "@/lib/format";
import { countryCode } from "@/lib/flags";
import NumBadge from "@/components/NumBadge";
import FlagImage from "@/components/FlagImage";
import ResultsTable from "@/components/ResultsTable";

export const revalidate = 1800;

export default async function RaceDetailPage({ params }) {
  const { season, round } = await params;
  const race = await getRaceResults(season, round);

  if (!race) notFound();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-16">
      <Link href="/races" className="text-xs uppercase tracking-widest text-muted hover:text-accent">
        ← Corridas
      </Link>

      <div className="mt-4 flex flex-wrap items-center gap-4">
        <NumBadge value={String(race.round).padStart(2, "0")} size="lg" tone="accent" />
        <div>
          <h1 className="flex items-center gap-3 text-3xl font-black uppercase tracking-tight text-text sm:text-4xl">
            <FlagImage
              code={countryCode(race.Circuit.Location.country)}
              label={race.Circuit.Location.country}
              size="lg"
            />
            {race.raceName}
          </h1>
          <p className="mt-1 text-sm text-muted">
            {race.Circuit.circuitName} · {race.Circuit.Location.locality},{" "}
            {race.Circuit.Location.country} · {formatDateLong(race.date)}
          </p>
        </div>
      </div>

      <section className="mt-10">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-muted">Resultado</h2>
        <div className="mt-4">
          {race.Results?.length > 0 ? (
            <ResultsTable results={race.Results} />
          ) : (
            <p className="text-sm text-muted">
              Resultado ainda não disponível para esta corrida.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
