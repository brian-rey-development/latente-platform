import { listVenturesQuery } from "../application/queries/list-ventures.query";
import { LabsHero } from "../components/labs-hero";
import { VentureCard } from "../components/venture-card";

export async function LabsView() {
  const ventures = await listVenturesQuery();

  return (
    <div>
      <LabsHero count={ventures.length} />
      {ventures.length === 0 ? (
        <div className="px-6 md:px-10 py-24">
          <p className="font-sans font-black text-3xl md:text-4xl uppercase tracking-tight text-muted">
            En construcción.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 md:p-10">
          {ventures.map((venture) => (
            <VentureCard key={venture._id} venture={venture} />
          ))}
        </div>
      )}
    </div>
  );
}
