import { ExecutiveKpiSection } from "../../components/kpi/ExecutiveKpiSection.jsx";
import { SnapshotTable } from "../../components/tables/SnapshotTable.jsx";
import { networkRows } from "../../data/overviewData.js";
import { CapacityEfficiencyCard, GrowthDemandCard, RevenueTrendCard, ServiceLineCard } from "./OverviewCharts.jsx";

export function CeoOverview() {
  return (
    <section className="ceo-scan-page" data-ceo-executive-overview="true">
      <article className="ceo-scan-summary ceo-scan-summary--stable">
        <div className="ceo-signal-copy">
          <span className="ceo-signal-badge">Good morning, Sarah!</span>
          <p>
            Revenue is <strong>+5.7%</strong> month over month and service volume is <strong>+6.2%</strong>; Whitefield and Jayanagar lead network
            contribution.
          </p>
          <div className="ceo-signal-actions">
            <a className="ceo-signal-cta dashboard-link-action" href="/finance?tab=revenue-analysis">
              View breakdown <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </article>

      <ExecutiveKpiSection
        kpis={[
          { label: "Revenue vs Target", value: "₹70.5Cr", change: "↑ 5.7%", tone: "up" },
          { label: "EBITDA Margin", value: "21.8%", change: "↑ 1.2 pts", tone: "up" },
          { label: "ARPOB", value: "₹42,800", change: "↑ 3.4%", tone: "up" },
          { label: "Dialysis Sessions", value: "90.5%", change: "134 / 148 delivered", tone: "up" },
          { label: "Bed Occupancy", value: "84.2%", change: "↓ 1.2 pts", tone: "down" },
          { label: "Service Conversion", value: "38.4%", change: "↑ 4.1 pts", tone: "up" },
        ]}
        role="CEO"
        score={{ label: "Network Health", score: 78, state: "Stable" }}
      />

      <section className="ceo-scan-grid overview-executive-grid">
        <RevenueTrendCard />
        <ServiceLineCard />
        <CapacityEfficiencyCard />
        <GrowthDemandCard />
      </section>

      <SnapshotTable
        actionHref="/branches?role=CEO"
        actionLabel="View branch breakdown"
        headers={["Branch", "Revenue", "EBITDA Margin", "Occupancy", "ARPOB", "Dialysis", "Risk"]}
        rows={networkRows}
        title="Network snapshot"
      />
    </section>
  );
}
