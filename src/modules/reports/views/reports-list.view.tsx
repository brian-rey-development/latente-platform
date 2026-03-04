import { listReportsQuery } from "../application/queries/list-reports.query";
import { ReportsHero } from "../components/reports-hero";
import { ReportGrid } from "../components/report-grid";

export async function ReportsListView() {
  const reports = await listReportsQuery();

  return (
    <div>
      <ReportsHero count={reports.length} />
      {reports.length === 0 ? (
        <div className="px-6 md:px-10 py-24">
          <p className="font-sans font-black text-3xl md:text-4xl uppercase tracking-tight text-muted">
            Próximamente.
          </p>
        </div>
      ) : (
        <ReportGrid reports={reports} />
      )}
    </div>
  );
}
