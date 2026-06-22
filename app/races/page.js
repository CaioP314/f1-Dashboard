import { getCurrentSeasonRaces } from "@/lib/api";
import RaceRow from "@/components/RaceRow";

export const revalidate = 1800;

function getRaceDateTime(race) {
  const time = race.time ?? "00:00:00Z";
  return new Date(`${race.date}T${time}`);
}

export default async function RacesPage() {
  const races = await getCurrentSeasonRaces();
  const now = new Date();

  const withDates = races.map((race) => ({ race, dateTime: getRaceDateTime(race) }));
  const nextRace = withDates.find((r) => r.dateTime >= now)?.race;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-16">
      <h1 className="text-3xl font-black uppercase tracking-tight text-text sm:text-4xl">Corridas</h1>
      <p className="mt-2 text-sm text-muted">
        Calendário completo da temporada {races[0]?.season ?? ""}.
      </p>

      {races.length === 0 ? (
        <p className="mt-10 text-sm text-muted">
          Não foi possível carregar o calendário agora. Tente novamente em instantes.
        </p>
      ) : (
        <div className="mt-8 flex flex-col gap-3">
          {withDates.map(({ race, dateTime }) => (
            <RaceRow
              key={`${race.season}-${race.round}`}
              race={race}
              status={dateTime < now ? "done" : race === nextRace ? "next" : "upcoming"}
            />
          ))}
        </div>
      )}
    </div>
  );
}
