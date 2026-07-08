import { BellRing, UserCheck } from "lucide-react";
import { ExecutiveKpiSection } from "../../components/kpi/ExecutiveKpiSection.jsx";
import { SnapshotTable } from "../../components/tables/SnapshotTable.jsx";
import { complianceExceptions, departmentCriticality, liveCallouts, onboardingAccessQueue, operationsLogRows, rosterPulseKpis, shiftCoverage } from "../../data/hrmsData.js";

function toneClass(status) {
  if (/high|critical/i.test(status)) return "critical";
  if (/watch|pending|medium/i.test(status)) return "watch";
  return "stable";
}

function kpiTone(status) {
  if (/high|critical/i.test(status)) return "down";
  if (/watch|pending|medium/i.test(status)) return "warn";
  return "up";
}

function StatusBanner() {
  return (
    <article className="ceo-scan-summary ceo-scan-summary--attention">
      <div className="ceo-signal-copy">
        <span className="ceo-signal-badge">Good morning, Sam!</span>
        <p>
          Afternoon roster lock is approaching. <strong>ICU, Dialysis, biometrics, and license renewals</strong> need action before staff can safely take the floor.
        </p>
        <div className="ceo-signal-actions">
          <button className="ceo-signal-cta" data-v2-drawer="HR command queue" data-v2-kind="HRMS Dashboard" data-v2-status="Watch" type="button">
            Open staffing huddle <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    </article>
  );
}

function RosterPulse() {
  const executiveKpis = [
    { label: "Live Call-Outs", value: String(liveCallouts.absent), change: "Absent today", tone: "down" },
    ...rosterPulseKpis.map((kpi) => ({
      label: kpi.label,
      value: kpi.value,
      change: kpi.change,
      tone: kpiTone(kpi.tone),
    })),
    { label: "Roster Lock", value: "42m", change: "Afternoon huddle", tone: "warn" },
  ];

  return (
    <ExecutiveKpiSection
      kpis={executiveKpis}
      role="HR"
      score={{ label: "Workforce Readiness", score: 91, state: liveCallouts.updated, tone: "attention" }}
    />
  );
}

function ShiftCoveragePanel() {
  return (
    <article className="ceo-scan-card hrms-command-card hrms-shift-card">
      <div className="ceo-scan-card-head hrms-panel-head">
        <div>
          <span>Shift Coverage</span>
          <strong>Only active gaps, with clinical ratio context.</strong>
        </div>
      </div>
      <div className="hrms-shift-gap-list">
        {shiftCoverage.map((shift) => (
          <section className={`hrms-shift-gap-row hrms-shift-gap-row--${toneClass(shift.status)}`} data-v2-drawer={`${shift.label} shift`} data-v2-kind="Roster coverage" data-v2-status={shift.status} key={shift.label}>
            <div className="hrms-shift-window">
              <strong>{shift.label}</strong>
              <span>{shift.window}</span>
            </div>
            <div className="hrms-shift-gap-main">
              <span>{shift.gap}</span>
              <strong>{shift.ratio}</strong>
            </div>
            <div className="hrms-shift-action">
              <em>{shift.coverage}% ready</em>
              <button type="button">
                <BellRing aria-hidden="true" size={14} />
                {shift.action}
              </button>
            </div>
          </section>
        ))}
      </div>
    </article>
  );
}

function DepartmentCriticalityPanel() {
  return (
    <article className="ceo-scan-card hrms-command-card">
      <div className="ceo-scan-card-head hrms-panel-head">
        <div>
          <span>Department Criticality</span>
          <strong>Departments below safe staffing ratios.</strong>
        </div>
      </div>
      <div className="hrms-criticality-list">
        {departmentCriticality.map((department) => (
          <section className={`hrms-criticality-row hrms-criticality-row--${toneClass(department.status)}`} data-v2-drawer={department.department} data-v2-kind="Department ratio" data-v2-status={department.status} key={`${department.department}-${department.branch}`}>
            <div>
              <strong>{department.department}</strong>
              <span>{department.branch}</span>
            </div>
            <p>
              <b>{department.coverage}%</b>
              <span>{department.actualRatio} now · safe {department.safeRatio}</span>
            </p>
            <i aria-hidden="true">
              <b style={{ width: `${department.coverage}%` }} />
            </i>
            <em>{department.gap}</em>
          </section>
        ))}
      </div>
    </article>
  );
}

function OnboardingAccessQueuePanel() {
  return (
    <article className="ceo-scan-card hrms-command-card">
      <div className="ceo-scan-card-head hrms-panel-head">
        <div>
          <span>Onboarding & Access Queue</span>
          <strong>People who should be working but are blocked by admin.</strong>
        </div>
      </div>
      <div className="hrms-exception-list">
        {onboardingAccessQueue.map((item) => (
          <section className={`hrms-exception-row hrms-exception-row--${toneClass(item.status)}`} data-v2-drawer={item.name} data-v2-kind="Onboarding blocker" data-v2-status={item.status} key={`${item.name}-${item.age}`}>
            <div className="hrms-exception-person">
              <strong>{item.name}</strong>
              <span>
                {item.role} · {item.branch}
              </span>
            </div>
            <p>
              <b>{item.blocker}</b>
              <span>
                Owner: {item.owner} · {item.age}
              </span>
            </p>
            <button type="button">
              <BellRing aria-hidden="true" size={14} />
              {item.action}
            </button>
          </section>
        ))}
      </div>
    </article>
  );
}

function ComplianceExceptionsPanel() {
  return (
    <article className="ceo-scan-card hrms-command-card">
      <div className="ceo-scan-card-head hrms-panel-head">
        <div>
          <span>Compliance Exceptions</span>
          <strong>Pull or clear staff before audit exposure.</strong>
        </div>
      </div>
      <div className="hrms-exception-list">
        {complianceExceptions.map((item) => (
          <section className={`hrms-exception-row hrms-exception-row--${toneClass(item.status)}`} data-v2-drawer={item.name} data-v2-kind="Compliance exception" data-v2-status={item.status} key={`${item.name}-${item.issue}`}>
            <div className="hrms-exception-person">
              <strong>{item.name}</strong>
              <span>
                {item.role} · {item.branch}
              </span>
            </div>
            <p>
              <b>{item.issue}</b>
              <span>Due: {item.due}</span>
            </p>
            <button type="button">
              <UserCheck aria-hidden="true" size={14} />
              {item.action}
            </button>
          </section>
        ))}
      </div>
    </article>
  );
}

export function HrmsDashboard() {
  return (
    <section className="ceo-scan-page hrms-scan-page">
      <StatusBanner />
      <RosterPulse />
      <section className="hrms-clinical-grid hrms-clinical-grid--floor">
        <ShiftCoveragePanel />
        <DepartmentCriticalityPanel />
      </section>
      <section className="hrms-clinical-grid hrms-clinical-grid--risk">
        <OnboardingAccessQueuePanel />
        <ComplianceExceptionsPanel />
      </section>
      <SnapshotTable headers={["Department", "Branch", "Open roles", "Current blocker", "Owner", "Risk"]} rows={operationsLogRows} title="HR Operations Log" />
    </section>
  );
}
