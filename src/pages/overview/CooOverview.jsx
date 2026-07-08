import { useState } from "react";
import { ExecutiveKpiSection } from "../../components/kpi/ExecutiveKpiSection.jsx";
import { Activity, Clock3, Droplets, Monitor, TriangleAlert, UserRound, Wind, Wrench } from "lucide-react";
import { StatusPill } from "../../components/ui/StatusPill.jsx";

const branches = ["Whitefield", "Jayanagar", "Hebbal", "Electronic City"];

const bedDepartments = ["ICU", "Dialysis Bay", "Nephrology Ward", "Transplant HDU", "Step-down Beds"];

const wardMatrix = [
  [
    { capacity: 28, occupied: 25 },
    { capacity: 24, occupied: 24 },
    { capacity: 20, occupied: 18 },
    { capacity: 18, occupied: 15 },
  ],
  [
    { capacity: 46, occupied: 42 },
    { capacity: 44, occupied: 39 },
    { capacity: 38, occupied: 37 },
    { capacity: 40, occupied: 32 },
  ],
  [
    { capacity: 72, occupied: 60 },
    { capacity: 64, occupied: 53 },
    { capacity: 58, occupied: 56 },
    { capacity: 62, occupied: 48 },
  ],
  [
    { capacity: 16, occupied: 13 },
    { capacity: 14, occupied: 14 },
    { capacity: 12, occupied: 10 },
    { capacity: 12, occupied: 8 },
  ],
  [
    { capacity: 34, occupied: 24 },
    { capacity: 30, occupied: 25 },
    { capacity: 28, occupied: 22 },
    { capacity: 32, occupied: 21 },
  ],
];

const dischargeRows = [
  { patient: "PT-0360", branch: "Whitefield", blocker: "Billing desk", wait: 88, tone: "watch" },
  { patient: "PT-0281", branch: "Jayanagar", blocker: "Insurance approval", wait: 79, tone: "purple" },
  { patient: "PT-0440", branch: "Whitefield", blocker: "Pharmacy clearance", wait: 72, tone: "info" },
  { patient: "PT-0582", branch: "Hebbal", blocker: "Pharmacy clearance", wait: 70, tone: "info" },
  { patient: "PT-0541", branch: "Jayanagar", blocker: "Billing desk", wait: 65, tone: "watch" },
];

const branchRiskRows = [
  {
    branch: "Hebbal",
    score: 8,
    state: "High pressure",
    tone: "critical",
    owner: "Ops huddle",
    eta: "30m",
    drivers: ["Pharmacy stock-out", "Nursing short-staffed", "OT-2 delayed"],
    services: [
      { code: "OT", label: "OT", status: "Delayed", tone: "watch" },
      { code: "DIA", label: "Dialysis", status: "Delayed", tone: "watch" },
      { code: "PHR", label: "Pharmacy", status: "Stock", tone: "critical" },
      { code: "EQP", label: "Equipment", status: "Due", tone: "watch" },
      { code: "NRS", label: "Nursing", status: "Short", tone: "watch" },
      { code: "HSK", label: "Housekeeping", status: "Delayed", tone: "watch" },
    ],
  },
  {
    branch: "Whitefield",
    score: 7,
    state: "High pressure",
    tone: "critical",
    owner: "Biomed + beds",
    eta: "45m",
    drivers: ["Dialysis Unit 4 down", "Equipment down", "No ICU beds after 2 PM"],
    services: [
      { code: "OT", label: "OT", status: "Delayed", tone: "watch" },
      { code: "DIA", label: "Dialysis", status: "Down", tone: "critical" },
      { code: "PHR", label: "Pharmacy", status: "Stable", tone: "stable" },
      { code: "EQP", label: "Equipment", status: "Down", tone: "critical" },
      { code: "NRS", label: "Nursing", status: "Stable", tone: "stable" },
      { code: "HSK", label: "Housekeeping", status: "Delayed", tone: "watch" },
    ],
  },
  {
    branch: "Jayanagar",
    score: 4,
    state: "Watch",
    tone: "watch",
    owner: "Nursing lead",
    eta: "2h",
    drivers: ["Nursing short-staffed", "Finance clearance queue", "ICU at capacity"],
    services: [
      { code: "OT", label: "OT", status: "Stable", tone: "stable" },
      { code: "DIA", label: "Dialysis", status: "Stable", tone: "stable" },
      { code: "PHR", label: "Pharmacy", status: "Stable", tone: "stable" },
      { code: "EQP", label: "Equipment", status: "Stable", tone: "stable" },
      { code: "NRS", label: "Nursing", status: "Short", tone: "watch" },
      { code: "HSK", label: "Housekeeping", status: "Stable", tone: "stable" },
    ],
  },
  {
    branch: "Electronic City",
    score: 3,
    state: "Controlled",
    tone: "stable",
    owner: "Pharmacy lead",
    eta: "Today",
    drivers: ["EPO low stock", "6 dialysis sessions to re-slot"],
    services: [
      { code: "OT", label: "OT", status: "Stable", tone: "stable" },
      { code: "DIA", label: "Dialysis", status: "Re-slot", tone: "watch" },
      { code: "PHR", label: "Pharmacy", status: "Low", tone: "watch" },
      { code: "EQP", label: "Equipment", status: "Stable", tone: "stable" },
      { code: "NRS", label: "Nursing", status: "Stable", tone: "stable" },
      { code: "HSK", label: "Housekeeping", status: "Stable", tone: "stable" },
    ],
  },
];

const otRows = [
  { branch: "Whitefield", util: 82, cases: 6, delayed: 1, scheduledHours: 10 },
  { branch: "Jayanagar", util: 74, cases: 4, delayed: 0, scheduledHours: 9 },
  { branch: "Hebbal", util: 61, cases: 2, delayed: 1, scheduledHours: 8 },
  { branch: "Electronic City", util: 70, cases: 3, delayed: 0, scheduledHours: 8 },
];

const equipmentRows = [
  { asset: "Dialysis Unit 4", location: "Whitefield", issue: "Biomed notified", elapsed: "2h 15m", severity: "Critical", tone: "critical", action: "Escalate" },
  { asset: "Portable Ultrasound", location: "Whitefield", issue: "Probe calibration drift", elapsed: "58m", severity: "Warning", tone: "warning", action: "Assign biomed" },
  { asset: "RO Backup Pump", location: "Whitefield", issue: "Pressure instability", elapsed: "26m", severity: "Warning", tone: "warning", action: "View details" },
  { asset: "Ventilator V-12", location: "Hebbal ICU", issue: "Service overdue", elapsed: "1h 05m", severity: "Maintenance overdue", tone: "overdue", action: "Assign biomed" },
  { asset: "OT Scope Tower", location: "Hebbal OT-2", issue: "Imaging feed unstable", elapsed: "42m", severity: "Warning", tone: "warning", action: "View details" },
  { asset: "RO Plant Valve", location: "Electronic City", issue: "Pressure variance", elapsed: "Opened today", severity: "Advisory", tone: "advisory", action: "Acknowledge" },
];

const equipmentSeverityRank = { critical: 0, overdue: 1, warning: 2, advisory: 3 };

function equipmentBranch(row) {
  if (row.location.startsWith("Hebbal")) return "Hebbal";
  if (row.location.startsWith("Electronic City")) return "Electronic City";
  return row.location;
}

function equipmentElapsedLabel(row) {
  return row.elapsed.startsWith("Opened") ? row.elapsed : `Downtime ${row.elapsed}`;
}

function EquipmentAssetIcon({ asset }) {
  if (asset.toLowerCase().includes("dialysis")) return <Droplets aria-hidden="true" size={18} />;
  if (asset.toLowerCase().includes("ventilator")) return <Wind aria-hidden="true" size={18} />;
  if (asset.toLowerCase().includes("ultrasound")) return <Monitor aria-hidden="true" size={18} />;
  if (asset.toLowerCase().includes("scope")) return <Monitor aria-hidden="true" size={18} />;
  if (asset.toLowerCase().includes("ro")) return <Activity aria-hidden="true" size={18} />;
  return <Wrench aria-hidden="true" size={18} />;
}

const dialysisRows = [
  { name: "Mon", delivered: 44, scheduled: 45 },
  { name: "Tue", delivered: 46, scheduled: 46 },
  { name: "Wed", delivered: 42, scheduled: 47 },
  { name: "Thu", delivered: 46, scheduled: 47 },
  { name: "Fri", delivered: 45, scheduled: 47 },
  { name: "Sat", delivered: 43, scheduled: 46 },
  { name: "Sun", delivered: 48, scheduled: 48 },
].map((point) => ({
  ...point,
  missed: Math.max(0, point.scheduled - point.delivered),
  deliveredHeight: Math.max(0, ((point.delivered - 30) / 20) * 100),
  scheduledHeight: Math.max(0, ((point.scheduled - 30) / 20) * 100),
}));

const pharmacyRows = [
  { drug: "Sevelamer 800mg", code: "PHOS-BIND", branch: "Hebbal", status: "Stock-out", qty: "-12 units", tone: "critical", alert: true },
  { drug: "Erythropoietin 4000IU", code: "EPO-4000", branch: "Electronic City", status: "Low stock", qty: "11 left", tone: "watch" },
  { drug: "Heparin 5000IU", code: "HEP-5K", branch: "Hebbal", status: "Low stock", qty: "14 left", tone: "watch" },
  { drug: "Tacrolimus 1mg", code: "TACRO", branch: "Whitefield", status: "Low stock", qty: "8 left", tone: "watch" },
  { drug: "Meropenem 1g", code: "MERO-1G", branch: "Whitefield", status: "Reorder", qty: "18 left", tone: "info" },
  { drug: "Sodium bicarbonate", code: "BICARB", branch: "Jayanagar", status: "Low stock", qty: "22 left", tone: "watch" },
];

const actionRows = [
  ["Whitefield", "ICU", "No ICU beds after 2 PM", "ER boarding risk", "Bed Manager", "45m", "Shift step-down candidates", { value: "High", pill: true }],
  ["Jayanagar", "Discharge Desk", "Finance clearance queue", "18 beds blocked", "Billing Lead", "2h", "Clear insurance approvals", { value: "High", pill: true }],
  ["Hebbal", "OT", "OT-2 delayed", "5 cases delayed", "OT Manager", "1h", "Reassign theatre slot", { value: "Medium", pill: true }],
  ["Electronic City", "Dialysis", "Machine unit down", "6 sessions at risk", "Biomed Lead", "35m", "Move sessions to bay 2", { value: "Medium", pill: true }],
];

const statusRank = { High: 0, Medium: 1, Low: 2 };
const sortedActionRows = [...actionRows].sort((a, b) => {
  const left = a.at(-1)?.value;
  const right = b.at(-1)?.value;
  return (statusRank[left] ?? 99) - (statusRank[right] ?? 99);
});

function bedBucket(value) {
  if (value >= 95) return "critical";
  if (value >= 80) return "high";
  return "available";
}

function LiveListRow({ item }) {
  return (
    <button className={`coo-live-list-row${item.branchColumn ? " coo-live-list-row--branch-column" : ""}`} type="button">
      <span>
        <strong>{item.primary}</strong>
        {item.secondary ? <small>{item.secondary}</small> : null}
      </span>
      {item.branchColumn ? <small className="coo-live-branch-column">{item.branchColumn}</small> : null}
      <em data-tone={item.tone}>{item.pill}</em>
      <b className={item.alert ? "is-alert" : ""}>{item.value}</b>
      <svg className="coo-row-chevron" viewBox="0 0 24 24" aria-hidden="true">
        <path d="m9 18 6-6-6-6" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.25" />
      </svg>
    </button>
  );
}

function BedCapacityMatrix() {
  return (
    <article className="ceo-scan-card coo-action-card coo-bed-heatmap">
      <div className="ceo-scan-card-head">
        <div>
          <span>Bed Capacity Matrix</span>
        </div>
      </div>
      <div className="coo-bed-heatmap-grid" role="table" aria-label="Live ward matrix by branch and department">
        <div className="coo-bed-heatmap-row coo-bed-heatmap-row--head" role="row">
          <span role="columnheader" aria-label="Unit" />
          {branches.map((branch) => (
            <span key={branch} role="columnheader">
              {branch}
            </span>
          ))}
        </div>
        {bedDepartments.map((department, departmentIndex) => (
          <div className="coo-bed-heatmap-row" key={department} role="row">
            <strong role="rowheader">{department}</strong>
            {branches.map((branch, branchIndex) => {
              const ward = wardMatrix[departmentIndex][branchIndex];
              const value = Math.round((ward.occupied / ward.capacity) * 100);
              const emptyBeds = Math.max(0, ward.capacity - ward.occupied);
              const bucket = bedBucket(value);

              return (
                <button className={`coo-bed-cell coo-bed-cell--${bucket}`} key={branch} role="cell" type="button" aria-label={`${branch} ${department}: ${emptyBeds} empty beds, ${value}% full`}>
                  <span>{emptyBeds}</span>
                  <em>
                    <strong>
                      {branch} · {department}
                    </strong>
                    <span>
                      Empty beds <b>{emptyBeds}</b>
                    </span>
                    <span>
                      Occupancy <b>{value}%</b>
                    </span>
                    <small className="coo-bed-tooltip-meter" aria-label={`${ward.occupied} of ${ward.capacity} beds occupied`}>
                      <i aria-hidden="true">
                        <b style={{ width: `${value}%` }} />
                      </i>
                      <span>
                        {ward.occupied}/{ward.capacity}
                      </span>
                    </small>
                  </em>
                </button>
              );
            })}
          </div>
        ))}
      </div>
      <div className="coo-bed-legend" aria-label="Occupancy intensity legend">
        <span>
          <i className="coo-bed-key coo-bed-key--available" aria-hidden="true" />
          &lt;80% stable
        </span>
        <span>
          <i className="coo-bed-key coo-bed-key--high" aria-hidden="true" />
          80-94% tight
        </span>
        <span>
          <i className="coo-bed-key coo-bed-key--critical" aria-hidden="true" />
          95%+ full
        </span>
      </div>
    </article>
  );
}

function DischargePipeline() {
  return (
    <article className="ceo-scan-card coo-action-card coo-discharge-card">
      <div className="ceo-scan-card-head">
        <div>
          <span>Discharge Pipeline</span>
        </div>
        <em className="coo-card-summary">{dischargeRows.length} active blockers</em>
      </div>
      <div className="coo-queue-list">
        {dischargeRows.map((row) => (
          <LiveListRow
            item={{
              primary: row.patient,
              branchColumn: row.branch,
              pill: row.blocker,
              tone: row.tone,
              value: `${row.wait}m`,
              alert: row.wait > 90,
            }}
            key={row.patient}
          />
        ))}
      </div>
    </article>
  );
}

function BranchRiskLoad() {
  return (
    <article className="ceo-scan-card coo-action-card coo-branch-risk-card">
      <div className="ceo-scan-card-head">
        <div>
          <span>Service Pressure by Branch</span>
          <strong>Worst-to-best triage across OT, dialysis, pharmacy, equipment, nursing, and housekeeping.</strong>
        </div>
      </div>
      <div className="coo-branch-risk-list" aria-label="Branch risk ranking">
        {branchRiskRows.map((row, index) => (
          <section className={`coo-branch-risk-row coo-branch-risk-row--${row.tone}`} key={row.branch} aria-label={`${row.branch}: ${row.score} out of 10 risk load`}>
            <div className="coo-branch-risk-rank">
              <small>#{index + 1}</small>
              <strong>{row.branch}</strong>
              <span>{row.state}</span>
            </div>
            <div className="coo-branch-risk-main">
              <div className="coo-branch-risk-score">
                <strong>{row.score}/10</strong>
                <span>Risk load</span>
                <i aria-hidden="true">
                  <b style={{ width: `${row.score * 10}%` }} />
                </i>
              </div>
              <div className="coo-branch-service-strip" aria-label={`${row.branch} service status`}>
                {row.services.map((service) => (
                  <span className={`coo-branch-service-chip coo-branch-service-chip--${service.tone}`} key={service.code} title={`${service.label}: ${service.status}`}>
                    <b>{service.code}</b>
                    <em>{service.status}</em>
                  </span>
                ))}
              </div>
            </div>
            <p className="coo-branch-risk-drivers">
              <span>Top drivers</span>
              <strong>{row.drivers.join(" · ")}</strong>
              <em>
                <b>{row.owner}</b>
                <i>{row.eta}</i>
              </em>
            </p>
          </section>
        ))}
      </div>
    </article>
  );
}

function OtBoard() {
  const segmentCount = 32;

  return (
    <article className="ceo-scan-card coo-action-card coo-ot-board-card">
      <div className="ceo-scan-card-head">
        <div>
          <span>Operation Theatre Board</span>
        </div>
        <a className="dashboard-link-action" href="/capacity-flow?role=COO&tab=ot">
          View theatre schedule <span aria-hidden="true">→</span>
        </a>
      </div>
      <div className="coo-ot-list">
        {otRows.map((row, index) => {
          const branchColors = ["#23a9b7", "#ff765e", "#f4b451", "#2fbf7f"];
          const usedHours = (row.scheduledHours * row.util) / 100;
          const activeSegments = Math.round((row.util / 100) * segmentCount);
          return (
            <div
              className="coo-ot-row"
              key={row.branch}
              role="group"
              tabIndex="0"
              style={{ "--branch-color": branchColors[index], "--ot-util": `${row.util}%` }}
              aria-label={`${row.branch} OT utilization ${row.util}%`}
            >
              <div className="coo-ot-row-head">
                <strong>{row.branch}</strong>
                <em className={`coo-ot-status ${row.delayed ? "is-watch" : "is-ok"}`}>{row.delayed ? "Delayed" : "On time"}</em>
              </div>
              <div className="coo-ot-usage-block">
                <div className="coo-ot-value-row">
                  <strong className="coo-ot-util">{row.util}%</strong>
                  <span>{usedHours.toFixed(1)}/{row.scheduledHours} hrs</span>
                </div>
                <div className="coo-ot-segment-bar" aria-hidden="true">
                  {Array.from({ length: segmentCount }, (_, segmentIndex) => (
                    <i className={segmentIndex < activeSegments ? "is-active" : ""} key={segmentIndex} />
                  ))}
                </div>
              </div>
              <dl className="coo-ot-metrics">
                <div>
                  <dt>Cases Today</dt>
                  <dd>{String(row.cases).padStart(2, "0")}</dd>
                </div>
                <div className={row.delayed ? "coo-ot-metric-alert" : ""}>
                  <dt>Delayed</dt>
                  <dd>{row.delayed}</dd>
                </div>
              </dl>
            </div>
          );
        })}
      </div>
    </article>
  );
}

function EquipmentStatus() {
  const defaultEquipmentBranch = [...equipmentRows].sort((a, b) => equipmentSeverityRank[a.tone] - equipmentSeverityRank[b.tone])[0];
  const [activeBranch, setActiveBranch] = useState(equipmentBranch(defaultEquipmentBranch));
  const sortedEquipmentRows = [...equipmentRows].sort((a, b) => equipmentSeverityRank[a.tone] - equipmentSeverityRank[b.tone]);
  const equipmentBranches = branches
    .map((branch, index) => {
      const branchRows = sortedEquipmentRows.filter((row) => equipmentBranch(row) === branch);
      const worstTone = branchRows[0]?.tone || "clear";
      return { branch, branchRows, index, worstTone, rank: branchRows.length ? equipmentSeverityRank[worstTone] : 99 };
    })
    .sort((a, b) => a.rank - b.rank || b.branchRows.length - a.branchRows.length || a.index - b.index);
  const activeEquipmentRows = sortedEquipmentRows.filter((row) => equipmentBranch(row) === activeBranch);
  const equipmentSummary = `${equipmentRows.filter((row) => row.tone === "critical").length} critical · ${equipmentRows.filter((row) => row.tone !== "critical").length} warnings`;

  return (
    <article className="ceo-scan-card coo-action-card coo-equipment-watch-card">
      <div className="ceo-scan-card-head">
        <div>
          <span>Critical Equipment</span>
        </div>
        <em className="coo-card-summary is-alert">{equipmentSummary}</em>
      </div>
      <div className="coo-equipment-layout">
        <div className="coo-equipment-tabs" role="tablist" aria-label="Critical equipment by branch" aria-orientation="vertical">
          {equipmentBranches.map(({ branch, branchRows, worstTone }) => {
            const count = branchRows.length;
            return (
              <button className="coo-equipment-tab" data-state={activeBranch === branch ? "active" : "idle"} data-tone={worstTone} key={branch} type="button" role="tab" aria-selected={activeBranch === branch} onClick={() => setActiveBranch(branch)}>
                <span>{branch}</span>
                <em aria-label={count ? `${count} active faults` : "No active faults"}>{count}</em>
              </button>
            );
          })}
        </div>
        <div className="coo-equipment-branch-card">
          <div className="coo-equipment-branch-list" aria-label={`${activeBranch} active equipment faults`}>
          {activeEquipmentRows.length ? activeEquipmentRows.map((row) => {
            return (
            <button className="coo-equipment-branch-row" data-severity={row.tone} key={`${row.asset}-${row.location}`} type="button" aria-label={`${row.asset}, ${row.location}: ${row.severity}, ${row.issue}, ${equipmentElapsedLabel(row)}`}>
              <span className="coo-equipment-branch-icon">
                <EquipmentAssetIcon asset={row.asset} />
              </span>
              <span className="coo-equipment-branch-copy">
                <span className="coo-equipment-branch-title">
                  <strong>{row.asset}</strong>
                </span>
                <em>{row.issue}</em>
              </span>
              <span className="coo-equipment-branch-meta">
                <b>
                  <Clock3 aria-hidden="true" size={13} />
                  {row.elapsed.startsWith("Opened") ? "Today" : row.elapsed}
                </b>
              </span>
              <span className="coo-equipment-branch-action">
                {row.action} <span aria-hidden="true">→</span>
              </span>
            </button>
            );
          }) : (
            <div className="coo-equipment-empty-state">
              <strong>No active equipment faults</strong>
              <span>{activeBranch} has no critical equipment tickets right now.</span>
            </div>
          )}
          </div>
        </div>
      </div>
    </article>
  );
}

function DialysisSessionsCard() {
  return (
    <article className="ceo-scan-card ceo-scan-card--chart ceo-scan-card--dialysis-bullet coo-dialysis-reuse-card">
      <div className="ceo-scan-card-head">
        <div>
          <span>Dialysis Sessions</span>
        </div>
      </div>
      <div className="coo-dialysis-chart" role="img" aria-label="Delivered dialysis sessions compared with scheduled sessions">
        <div className="coo-dialysis-y-axis" aria-hidden="true">
          {[["100%", "50"], ["75%", "45"], ["50%", "40"], ["25%", "35"], ["0%", "30"]].map(([y, label]) => (
            <span key={label} style={{ "--y": y }}>
              {label}
            </span>
          ))}
        </div>
        <div className="coo-dialysis-plot">
          {["100%", "75%", "50%", "25%", "0%"].map((y) => (
            <i className="coo-dialysis-gridline" key={y} style={{ "--y": y }} aria-hidden="true" />
          ))}
          <div className="coo-dialysis-bars">
            {dialysisRows.map((point) => (
              <button
                className="coo-dialysis-day"
                key={point.name}
                style={{ "--delivered-height": `${point.deliveredHeight.toFixed(2)}%`, "--scheduled-height": `${point.scheduledHeight.toFixed(2)}%` }}
                type="button"
                aria-label={`${point.name}: ${point.delivered} delivered, ${point.scheduled} scheduled, ${point.missed} missed`}
              >
                <span className={`coo-dialysis-bar-stack${point.missed ? " has-missed" : ""}`}>
                  <span className="coo-dialysis-scheduled" />
                  <span className="coo-dialysis-delivered" />
                </span>
                <span className="coo-dialysis-x-label">{point.name}</span>
                <em className="coo-dialysis-tooltip">
                  <strong>{point.name}</strong>
                  <span>
                    <i style={{ background: "var(--color-primary)" }} />
                    Delivered Sessions <b>{point.delivered}</b>
                  </span>
                  <span>
                    <i style={{ background: "color-mix(in srgb, #f97316 34%, var(--color-surface))" }} />
                    Scheduled Sessions <b>{point.scheduled}</b>
                  </span>
                  <span>
                    <i style={{ background: "#f97316" }} />
                    Missed Sessions <b>{point.missed}</b>
                  </span>
                </em>
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="ceo-scan-legend" aria-label="Chart legend">
        <span>
          <i className="ceo-scan-legend-dot" style={{ background: "var(--color-primary)" }} />
          Delivered Sessions
        </span>
        <span>
          <i className="ceo-scan-legend-dot" style={{ background: "color-mix(in srgb, #f97316 34%, var(--color-surface))" }} />
          Scheduled Sessions
        </span>
      </div>
    </article>
  );
}

function PharmacyFillRate() {
  return (
    <article className="ceo-scan-card coo-action-card coo-pharmacy-card">
      <div className="ceo-scan-card-head">
        <div>
          <span>Pharmacy Fill Rate</span>
        </div>
        <em className="coo-card-summary coo-pharmacy-summary">
          <span>96.2%</span>
          <small>network-wide</small>
        </em>
      </div>
      <div className="coo-pharmacy-shortage-list" key="pharmacy-shortage-list-padded">
        {pharmacyRows.map((row) => (
          <button className="coo-pharmacy-shortage-row" key={`${row.drug}-${row.branch}`} type="button" aria-label={`${row.drug}, ${row.branch}: ${row.status}, ${row.qty}`}>
            <strong>{row.drug}</strong>
            <span>{row.branch}</span>
            <em data-tone={row.tone}>{row.status}</em>
            <b className={row.alert ? "is-alert" : ""}>{row.qty}</b>
            <svg className="coo-row-chevron" viewBox="0 0 24 24" aria-hidden="true">
              <path d="m9 18 6-6-6-6" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.25" />
            </svg>
          </button>
        ))}
      </div>
    </article>
  );
}

function isOverOneHour(value) {
  if (String(value).includes("h")) return true;
  const minutes = Number.parseInt(value, 10);
  return Number.isFinite(minutes) && minutes > 60;
}

function OperationsActionBoard() {
  return (
    <article className="ceo-scan-card coo-action-board">
      <div className="ceo-scan-card-head">
        <div>
          <span>Operations Action Queue</span>
        </div>
      </div>
      <div className="coo-action-board-grid" role="table" aria-label="Operations action queue">
        <div className="coo-action-board-head" role="row">
          <span>Location</span>
          <span>The Bottleneck</span>
          <span>Escalate To</span>
          <span>Open For</span>
          <span>Status</span>
          <span>System Proposal</span>
        </div>
        {sortedActionRows.map(([branch, unit, issue, impact, owner, sla, action, status]) => (
          <section className="coo-action-board-row" data-status={status.value.toLowerCase()} key={`${branch}-${unit}-${issue}`} role="row">
            <div className="coo-action-location">
              <strong>{branch}</strong>
              <span>{unit}</span>
            </div>
            <div className="coo-action-bottleneck">
              <strong>{issue}</strong>
              <span>{impact}</span>
            </div>
            <div className="coo-action-owner">
              <span>
                <UserRound aria-hidden="true" size={15} />
                <strong>{owner}</strong>
              </span>
            </div>
            <em className={`coo-action-age ${isOverOneHour(sla) ? "is-late" : ""}`}>
              <Clock3 aria-hidden="true" size={14} />
              {sla}
            </em>
            <StatusPill status={status.value} />
            <button className="dashboard-link-action coo-action-proposal" type="button">
              {action}
              <span aria-hidden="true">→</span>
            </button>
          </section>
        ))}
      </div>
    </article>
  );
}

export function CooOverview() {
  return (
    <section className="ceo-scan-page" data-coo-executive-overview="true">
      <article className="ceo-scan-summary ceo-scan-summary--attention">
        <div className="ceo-signal-copy">
          <span className="ceo-signal-badge">Good morning, Sarah!</span>
          <p>
            Patient flow is stable, but <strong>Whitefield ICU capacity and Hebbal OT delays</strong> need review before afternoon peak.
          </p>
          <div className="ceo-signal-actions">
            <a className="ceo-signal-cta dashboard-link-action" href="/operations?tab=patient-flow">
              Review operations <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </article>

      <ExecutiveKpiSection
        kpis={[
          { label: "Bed Occupancy", value: "82%", change: "↑ 1.4 pts", tone: "warn" },
          { label: "ED Door-to-Doctor", value: "18m", change: "↓ 4m", tone: "up" },
          { label: "Bed Turnaround", value: "42m", change: "6m over target", tone: "warn" },
          { label: "Discharge TAT", value: "3.8 hrs", change: "↑ 0.6 hrs", tone: "warn" },
          { label: "OT Utilization", value: "76%", change: "↓ 5 pts", tone: "down" },
          { label: "Pharmacy Fill Rate", value: "96.2%", change: "↑ 1.1 pts", tone: "up" },
          { label: "Equip. Uptime", value: "94%", change: "2 units down", tone: "down" },
          { label: "Dialysis Delivery", value: "81 / 94", change: "86.2%", tone: "up" },
        ]}
        role="COO"
        score={{ label: "Live Bed Status", score: 82, state: "45 Available Beds", variant: "bed-status" }}
      />

      <section className="coo-bento-grid">
        <BedCapacityMatrix />
        <DischargePipeline />
        <OtBoard />
        <EquipmentStatus />
        <PharmacyFillRate />
      </section>

      <OperationsActionBoard />
    </section>
  );
}
