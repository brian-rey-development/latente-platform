import type { ReportPreview } from "../domain/types";
import { ReportCard } from "./report-card";

interface ReportGridProps {
  readonly reports: ReportPreview[];
}

export function ReportGrid({ reports }: ReportGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 bg-surface">
      {reports.map((report, idx) => (
        <ReportCard key={report._id} report={report} index={idx} />
      ))}
    </div>
  );
}
