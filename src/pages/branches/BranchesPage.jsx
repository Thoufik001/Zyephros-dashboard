import { Building2, MapPin } from "lucide-react";
import { SnapshotTable } from "../../components/tables/SnapshotTable.jsx";
import { MetricGrid } from "../../components/ui/MetricGrid.jsx";
import { StatusPill } from "../../components/ui/StatusPill.jsx";

const branchRows = [
  { branch: "Whitefield", revenue: "₹29.6Cr", occupancy: "91.2%", capacity: "Tight", dialysis: "43/45", action: "Open surge bay", risk: "Medium" },
  { branch: "Jayanagar", revenue: "₹17.8Cr", occupancy: "78.4%", capacity: "Stable", dialysis: "42/44", action: "Close discharge files", risk: "Low" },
  { branch: "Hebbal", revenue: "₹12.5Cr", occupancy: "58.6%", capacity: "Under-used", dialysis: "40/42", action: "Move float technician", risk: "High" },
  { branch: "Electronic City", revenue: "₹10.5Cr", occupancy: "87.8%", capacity: "Watch", dialysis: "38/40", action: "Monitor pharmacy stock", risk: "Medium" },
];

export function BranchesPage({ role }) {
  const isCoo = role === "COO";

  return (
    <section className="route-page">
      <article className="ceo-scan-summary">
        <div className="ceo-signal-copy">
          <span className="ceo-signal-badge">{isCoo ? "Operations network" : "Executive network"}</span>
          <p>
            {isCoo ? "Branch pressure is concentrated in Whitefield and Hebbal; route teams to bed, discharge, and dialysis bottlenecks." : "Whitefield leads network contribution while Hebbal needs executive attention on utilization and risk."}
          </p>
        </div>
      </article>

      <MetricGrid
        metrics={[
          { label: "Active Branches", value: "4", delta: "Bengaluru network" },
          { label: isCoo ? "Tight Units" : "Revenue Leader", value: isCoo ? "6" : "Whitefield", delta: isCoo ? "Need same-day action" : "42.1% contribution" },
          { label: "Avg Occupancy", value: "78.9%", delta: "+1.4 pts" },
          { label: "Open Actions", value: "11", delta: "4 high priority" },
        ]}
      />

      <div className="route-card-grid route-card-grid--four">
        {branchRows.map((row) => (
          <article className="ceo-scan-card route-branch-card" key={row.branch}>
            <div className="route-card-title">
              <Building2 size={18} />
              <span>{row.branch}</span>
              <StatusPill status={row.risk} />
            </div>
            <dl className="route-stat-list">
              <div>
                <dt>{isCoo ? "Occupancy" : "Revenue"}</dt>
                <dd>{isCoo ? row.occupancy : row.revenue}</dd>
              </div>
              <div>
                <dt>Dialysis</dt>
                <dd>{row.dialysis}</dd>
              </div>
              <div>
                <dt>Next action</dt>
                <dd>{row.action}</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>

      <SnapshotTable
        headers={["Branch", "Revenue", "Occupancy", "Capacity", "Dialysis", "Next Action", "Risk"]}
        rows={branchRows.map((row) => [row.branch, row.revenue, row.occupancy, row.capacity, row.dialysis, row.action, { value: row.risk, pill: true }])}
        summary={isCoo ? "Operational branch priorities for today." : "Network branch contribution and risk."}
        title={isCoo ? "Branch Operations Snapshot" : "Branch Performance Snapshot"}
      />

      <article className="ceo-scan-card route-map-card">
        <div className="route-card-title">
          <MapPin size={18} />
          <span>Network Footprint</span>
        </div>
        <div className="route-footprint">
          {branchRows.map((row, index) => (
            <span className={`route-footprint-node route-footprint-node--${row.risk.toLowerCase()}`} key={row.branch} style={{ "--node-index": index }}>
              {row.branch}
            </span>
          ))}
        </div>
      </article>
    </section>
  );
}
