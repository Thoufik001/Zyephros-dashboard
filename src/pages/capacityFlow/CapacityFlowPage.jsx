import { Activity, Clock, UsersRound } from "lucide-react";
import { SnapshotTable } from "../../components/tables/SnapshotTable.jsx";
import { MetricGrid } from "../../components/ui/MetricGrid.jsx";
import { StatusPill } from "../../components/ui/StatusPill.jsx";

const flowRows = [
  ["Whitefield", "ICU", "92%", "14 boarding", "2h", "Open step-down transfers", { value: "High", pill: true }],
  ["Jayanagar", "Discharge", "78%", "18 files past SLA", "4h", "Escalate summaries", { value: "Medium", pill: true }],
  ["Hebbal", "Dialysis Bay", "73%", "3 slots uncovered", "Today", "Move float technician", { value: "Medium", pill: true }],
  ["Electronic City", "Ward", "82%", "Stable", "Live", "Keep watch", { value: "Low", pill: true }],
];

const lanes = [
  { label: "ER Boarding", value: "14", tone: "High", detail: "4 over morning baseline" },
  { label: "Pending Discharges", value: "42", tone: "Medium", detail: "18 past SLA" },
  { label: "Bed Turns", value: "3.8h", tone: "Medium", detail: "+0.6h vs target" },
  { label: "Transport Holds", value: "7", tone: "Low", detail: "No network blocker" },
];

export function CapacityFlowPage() {
  return (
    <section className="route-page">
      <article className="ceo-scan-summary ceo-scan-summary--attention">
        <div className="ceo-signal-copy">
          <span className="ceo-signal-badge">Capacity command</span>
          <p>
            Bed flow is workable, but Whitefield ICU and Jayanagar discharge queues need intervention before evening rounds.
          </p>
        </div>
      </article>

      <MetricGrid
        metrics={[
          { label: "Network Occupancy", value: "82%", delta: "+1.4 pts" },
          { label: "ER Boarding", value: "14", delta: "+4 patients" },
          { label: "Pending Discharges", value: "42", delta: "18 past SLA" },
          { label: "Discharge TAT", value: "3.8 hrs", delta: "+0.6 hrs" },
        ]}
      />

      <div className="route-card-grid route-card-grid--four">
        {lanes.map((lane) => (
          <article className="ceo-scan-card route-command-card" key={lane.label}>
            <div className="route-card-title">
              {lane.label === "ER Boarding" ? <UsersRound size={18} /> : lane.label === "Bed Turns" ? <Clock size={18} /> : <Activity size={18} />}
              <span>{lane.label}</span>
              <StatusPill status={lane.tone} />
            </div>
            <strong className="route-command-value">{lane.value}</strong>
            <p>{lane.detail}</p>
          </article>
        ))}
      </div>

      <SnapshotTable
        headers={["Branch", "Unit", "Load", "Blocker", "SLA / Age", "Next Action", "Status"]}
        rows={flowRows}
        summary="Live capacity blockers and owners."
        title="Capacity & Flow Action Queue"
      />
    </section>
  );
}
