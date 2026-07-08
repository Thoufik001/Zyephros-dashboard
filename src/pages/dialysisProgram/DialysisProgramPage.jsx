import { Droplets, Wrench } from "lucide-react";
import { SnapshotTable } from "../../components/tables/SnapshotTable.jsx";
import { MetricGrid } from "../../components/ui/MetricGrid.jsx";
import { StatusPill } from "../../components/ui/StatusPill.jsx";

const dialysisRows = [
  ["Whitefield", "Morning", "45", "43", "96%", "1 machine down", { value: "Medium", pill: true }],
  ["Jayanagar", "Afternoon", "44", "42", "95%", "On track", { value: "Low", pill: true }],
  ["Hebbal", "Morning", "42", "40", "91%", "Float tech needed", { value: "High", pill: true }],
  ["Electronic City", "Evening", "40", "38", "95%", "Consumables watch", { value: "Medium", pill: true }],
];

const machineRows = [
  { label: "Dialysis machines", value: "18/20", note: "2 unavailable", status: "High" },
  { label: "RO plant", value: "4/4", note: "All online", status: "Low" },
  { label: "Technician cover", value: "92%", note: "Hebbal gap", status: "Medium" },
];

export function DialysisProgramPage() {
  return (
    <section className="route-page">
      <article className="ceo-scan-summary ceo-scan-summary--attention">
        <div className="ceo-signal-copy">
          <span className="ceo-signal-badge">Dialysis operations</span>
          <p>
            Delivery is at <strong>86.2%</strong>; Hebbal needs float technician coverage and Whitefield needs machine recovery.
          </p>
        </div>
      </article>

      <MetricGrid
        metrics={[
          { label: "Scheduled Sessions", value: "94", delta: "Today" },
          { label: "Delivered", value: "81", delta: "86.2%" },
          { label: "Missed / At Risk", value: "13", delta: "3 high risk" },
          { label: "Machine Uptime", value: "90%", delta: "2 units down" },
        ]}
      />

      <div className="route-card-grid route-card-grid--three">
        {machineRows.map((row) => (
          <article className="ceo-scan-card route-command-card" key={row.label}>
            <div className="route-card-title">
              {row.label === "RO plant" ? <Droplets size={18} /> : <Wrench size={18} />}
              <span>{row.label}</span>
              <StatusPill status={row.status} />
            </div>
            <strong className="route-command-value">{row.value}</strong>
            <p>{row.note}</p>
          </article>
        ))}
      </div>

      <SnapshotTable
        headers={["Branch", "Shift", "Scheduled", "Delivered", "Utilization", "Blocker", "Action"]}
        rows={dialysisRows}
        summary="Session delivery, machine state, and staffing blockers."
        title="Dialysis Delivery Queue"
      />
    </section>
  );
}
