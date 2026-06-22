import { getCurrentDriverStandings } from "@/lib/api";
import DriverCard from "@/components/DriverCard";

export const revalidate = 1800;

export default async function DriversPage() {
  const standings = await getCurrentDriverStandings();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-16">
      <h1 className="text-3xl font-black uppercase tracking-tight text-text sm:text-4xl">Pilotos</h1>
      <p className="mt-2 text-sm text-muted">Classificação atual do campeonato de pilotos.</p>

      {standings.length === 0 ? (
        <p className="mt-10 text-sm text-muted">
          Não foi possível carregar os pilotos agora. Tente novamente em instantes.
        </p>
      ) : (
        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {standings.map((standing) => (
            <DriverCard key={standing.Driver.driverId} standing={standing} />
          ))}
        </div>
      )}
    </div>
  );
}
