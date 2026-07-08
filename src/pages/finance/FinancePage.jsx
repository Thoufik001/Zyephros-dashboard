import { useState } from "react";
import { RotateCcw } from "lucide-react";
import { Bar, CartesianGrid, Cell, ComposedChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { WorkflowTable } from "../../components/tables/WorkflowTable.jsx";
import { StatusPill } from "../../components/ui/StatusPill.jsx";
import {
  contributionRowsByField,
  financeTabContent,
  financeTabs,
  financeTrend,
  performanceRowsByField,
  revenueFields,
  revenueKpis,
} from "../../data/financeData.js";

const axisStyle = { fill: "var(--color-muted-foreground)", fontSize: 12 };

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function overlayValue(value, min, max, revenue) {
  const normalized = (clamp(value, min, max) - min) / Math.max(1, max - min);
  const visualValue = 28 + normalized * 12;
  return Number(clamp(visualValue, 18, Math.max(20, revenue - 5)).toFixed(2));
}

const financeTrendDisplay = financeTrend.map((item) => ({
  label: item.label,
  netRevenue: item.revenue,
  growthVsPrevious: item.prev,
  varianceVsYtdAverage: item.same,
  growthPlot: overlayValue(item.prev, -30, 30, item.revenue),
  variancePlot: overlayValue(item.same, -20, 20, item.revenue),
}));

function formatCr(value) {
  return `₹${Number(value || 0).toFixed(Number(value || 0) < 10 ? 1 : 0)}Cr`;
}

function formatPercent(value) {
  const number = Number(value || 0);
  return `${number > 0 ? "+" : ""}${number.toFixed(1)}%`;
}

function FinanceLineDot({ cx, cy, fill }) {
  if (typeof cx !== "number" || typeof cy !== "number") return null;
  return <circle cx={cx} cy={cy} fill={fill} r={4} stroke="#fff" strokeWidth={1.25} vectorEffect="non-scaling-stroke" />;
}

function financeTooltipStyle(event, host) {
  const rect = host.getBoundingClientRect();
  const halfWidth = Math.min(164, Math.max(124, rect.width / 2 - 12));
  const rawLeft = event.clientX - rect.left;
  const left = Math.max(halfWidth, Math.min(Math.max(halfWidth, rect.width - halfWidth), rawLeft));
  const localY = event.clientY - rect.top;
  const canPlaceAbove = localY > 160;

  return {
    left: `${left}px`,
    top: `${canPlaceAbove ? localY - 14 : localY + 14}px`,
    transform: canPlaceAbove ? "translate(-50%, -100%)" : "translateX(-50%)",
  };
}

function financeChartIndex(event, host, length) {
  const rect = host.getBoundingClientRect();
  const plotLeft = 42;
  const plotRight = 18;
  const usableWidth = Math.max(1, rect.width - plotLeft - plotRight);
  const cursorX = Math.max(0, Math.min(usableWidth, event.clientX - rect.left - plotLeft));
  return Math.max(0, Math.min(length - 1, Math.round((cursorX / usableWidth) * (length - 1))));
}

function FinanceTooltipBox({ tooltip }) {
  if (!tooltip) return null;

  return (
    <div className="ceo-chart-tooltip finance-chart-tooltip" style={tooltip.style}>
      <strong>{tooltip.title}</strong>
      {tooltip.rows.map((row) => (
        <span key={row.label}>
          <i style={{ "--tooltip-color": row.color }} />
          <em>{row.label}</em>
          <b>{row.display}</b>
        </span>
      ))}
    </div>
  );
}

function FinanceRevenueLegend() {
  return (
    <div className="ceo-scan-legend finance-revenue-legend" aria-label="Chart legend">
      <span>
        <i className="ceo-scan-legend-dot" style={{ background: "var(--color-primary)" }} />
        Net revenue
      </span>
      <span>
        <i className="ceo-scan-legend-dot ceo-scan-legend-dot--previous" />
        Growth vs previous month
      </span>
      <span>
        <i className="ceo-scan-legend-dot ceo-scan-legend-dot--target" />
        Variance vs YTD average
      </span>
    </div>
  );
}

function query() {
  return new URLSearchParams(window.location.search);
}

function routeHref(nextParams) {
  const params = query();
  params.set("role", params.get("role") || "CEO");

  Object.entries(nextParams).forEach(([key, value]) => {
    if (value) params.set(key, value);
    else params.delete(key);
  });

  return `/finance?${params.toString()}`;
}

function activeFinanceTab() {
  const tab = query().get("tab") || "revenue-analysis";
  return financeTabs.some(([id]) => id === tab) ? tab : "revenue-analysis";
}

function activeRevenueField() {
  const field = query().get("field") || revenueFields[0];
  return revenueFields.includes(field) ? field : revenueFields[0];
}

function PageTabs({ activeTab }) {
  return (
    <div className="v2-toolbar">
      <div className="v2-tabs" role="tablist">
        {financeTabs.map(([id, label]) => (
          <a aria-selected={String(id === activeTab)} href={routeHref({ tab: id, field: id === "revenue-analysis" ? activeRevenueField() : null })} key={id} role="tab">
            {label}
          </a>
        ))}
      </div>
    </div>
  );
}

function RevenueKpiStrip() {
  return (
    <div className="v2-revenue-kpi-strip">
      {revenueKpis.map(([label, value, status, tone]) => (
        <article className="v2-revenue-kpi" key={label}>
          <span>{label}</span>
          <strong>{value}</strong>
          <b className={`is-${tone}`}>{status}</b>
        </article>
      ))}
    </div>
  );
}

function FieldTabs({ field }) {
  return (
    <div className="v2-control-section v2-control-section--analyze">
      <div className="v2-field-tabs segmented-control" role="tablist">
        {revenueFields.map((item) => (
          <a aria-selected={String(item === field)} href={routeHref({ tab: "revenue-analysis", field: item })} key={item} role="tab">
            {item}
          </a>
        ))}
      </div>
    </div>
  );
}

function LocalFilterStrip({ field }) {
  const chips = [
    ["Period", "YTD"],
    ["Branch", field === "Branch" ? "Grouped" : "All"],
    ["Department", field === "Service Line" ? "Grouped" : "All"],
    ["Doctor", field === "Doctor Name" ? "Grouped" : "All"],
    ["Patient Mix", field === "Patient Mix" ? "Grouped" : "All"],
  ].filter(([, value]) => value !== "Grouped");

  return (
    <div className="v2-control-section v2-control-section--filters">
      <span>Refine slice</span>
      <div className="v2-local-filter-row">
        {chips.map(([label, value]) => (
          <div className="v2-local-filter" key={label}>
            <button aria-expanded="false" aria-haspopup="menu" type="button">
              <span>{label}</span>
              <strong>{value}</strong>
            </button>
          </div>
        ))}
        <button className="v2-local-filter v2-local-filter--reset" type="button">
          <RotateCcw size={14} /> Reset
        </button>
      </div>
    </div>
  );
}

function ContributionPanel({ field }) {
  const rows = contributionRowsByField[field] || contributionRowsByField["Service Line"];
  const max = Math.max(...rows.map((row) => row.value), 1);
  const total = Math.max(rows.reduce((sum, row) => sum + row.value, 0), 1);

  return (
    <article className="v2-panel v2-contribution-panel">
      <div className="v2-panel-heading">
        <div>
          <span>Revenue by {field}</span>
          <strong>Segment contribution with gender and unmapped split.</strong>
        </div>
        <div className="v2-mini-legend">
          <span data-color="pink">Female</span>
          <span data-color="blue">Male</span>
          <span data-color="muted">Other</span>
        </div>
      </div>
      <div className="v2-contribution-list">
        {rows.map((row) => {
          const rowWidth = `${Math.max(8, (row.value / max) * 100).toFixed(2)}%`;
          const femaleWidth = `${Math.max(4, (row.female / Math.max(row.value, 0.1)) * 100).toFixed(2)}%`;
          const maleWidth = `${Math.max(4, (row.male / Math.max(row.value, 0.1)) * 100).toFixed(2)}%`;
          const unmappedWidth = `${Math.max(3, (row.unmapped / Math.max(row.value, 0.1)) * 100).toFixed(2)}%`;

          return (
            <button className="v2-contribution-row" data-v2-drawer={row.name} data-v2-kind={field} data-v2-status={row.restricted ? "Restricted" : "Open"} key={row.name} type="button">
              <span className="v2-contribution-label">
                <strong>{row.name}</strong>
                <em>{row.restricted ? "Restricted revenue detail" : `${Math.round((row.value / total) * 100)}% of selected revenue`}</em>
              </span>
              <span className="v2-contribution-track">
                <span className="v2-contribution-fill" style={{ "--row-width": rowWidth }}>
                  <i style={{ "--segment-width": femaleWidth }} />
                  <i style={{ "--segment-width": maleWidth }} />
                  <i style={{ "--segment-width": unmappedWidth }} />
                </span>
              </span>
              <span className="v2-contribution-value">₹{row.value.toFixed(row.value < 10 ? 1 : 0)}Cr</span>
            </button>
          );
        })}
      </div>
    </article>
  );
}

function MovementBoard({ field }) {
  const [tooltip, setTooltip] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const latest = financeTrend.at(-1);
  const average = financeTrend.reduce((sum, item) => sum + item.revenue, 0) / financeTrend.length;

  function showTooltip(event) {
    const host = event.currentTarget;
    const nextIndex = financeChartIndex(event, host, financeTrendDisplay.length);
    const point = financeTrendDisplay[nextIndex] || financeTrendDisplay[0];
    setActiveIndex(nextIndex);
    setTooltip({
      title: point.label,
      rows: [
        { label: "Net revenue", display: formatCr(point.netRevenue), color: "var(--color-primary)" },
        { label: "Growth vs previous", display: formatPercent(point.growthVsPrevious), color: "#315f9d" },
        { label: "Variance vs YTD avg", display: formatPercent(point.varianceVsYtdAverage), color: "#ff765e" },
      ],
      style: financeTooltipStyle(event, host),
    });
  }

  return (
    <article className="v2-panel v2-movement-panel v2-movement-panel--visual">
      <div className="v2-panel-heading">
        <div>
          <span>Revenue over time</span>
        </div>
      </div>
      <div className="finance-movement-layout">
        <div
          className="finance-recharts-host finance-recharts-host--overview"
          onMouseLeave={() => {
            setTooltip(null);
            setActiveIndex(null);
          }}
          onMouseMove={showTooltip}
          role="img"
          aria-label="Revenue over time"
        >
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart accessibilityLayer={false} data={financeTrendDisplay} margin={{ top: 12, right: 12, left: 4, bottom: 8 }}>
              <CartesianGrid stroke="#dfe7ee" strokeDasharray="4 8" vertical={false} />
              <XAxis dataKey="label" tick={axisStyle} tickLine={false} axisLine={false} />
              <YAxis domain={[0, 60]} ticks={[0, 15, 30, 45, 60]} tick={axisStyle} tickFormatter={(value) => `₹${value}Cr`} tickLine={false} axisLine={false} width={46} yAxisId="revenue" />
              <Tooltip content={() => null} cursor={false} />
              <Bar dataKey="netRevenue" isAnimationActive={false} name="Net revenue" radius={[5, 5, 0, 0]} yAxisId="revenue">
                {financeTrendDisplay.map((point, index) => (
                  <Cell fill="#18a9b8" fillOpacity={activeIndex === null || activeIndex === index ? 0.96 : 0.42} key={point.label} />
                ))}
              </Bar>
              <Line activeDot={(props) => <FinanceLineDot {...props} fill="#315f9d" />} dataKey="growthPlot" dot={(props) => <FinanceLineDot {...props} fill="#315f9d" />} isAnimationActive={false} name="Growth vs previous month" stroke="#315f9d" strokeDasharray="5 5" strokeWidth={2} type="linear" yAxisId="revenue" />
              <Line activeDot={(props) => <FinanceLineDot {...props} fill="#ff765e" />} dataKey="variancePlot" dot={(props) => <FinanceLineDot {...props} fill="#ff765e" />} isAnimationActive={false} name="Variance vs YTD average" stroke="#ff765e" strokeDasharray="3 5" strokeWidth={2} type="linear" yAxisId="revenue" />
            </ComposedChart>
          </ResponsiveContainer>
          <FinanceRevenueLegend />
          <FinanceTooltipBox tooltip={tooltip} />
        </div>
        <div className="v2-movement-grid finance-movement-cards">
          <button className="v2-movement-card" type="button">
            <span>Current month</span>
            <strong>₹{latest.revenue.toFixed(0)}Cr</strong>
            <p>{latest.prev > 0 ? "+" : ""}{latest.prev.toFixed(1)}% vs previous month.</p>
          </button>
          <button className="v2-movement-card" type="button">
            <span>Average month</span>
            <strong>₹{average.toFixed(1)}Cr</strong>
            <p>Rolling monthly average across the current view.</p>
          </button>
          <button className="v2-movement-card" type="button">
            <span>Vs previous</span>
            <strong>{latest.prev > 0 ? "+" : ""}{latest.prev.toFixed(1)}%</strong>
            <p>Immediate month-over-month movement.</p>
          </button>
          <button className="v2-movement-card" type="button">
            <span>Decision signal</span>
            <strong>Watch</strong>
            <p>Protect margin where contribution is growing below plan.</p>
          </button>
        </div>
      </div>
    </article>
  );
}

function DataTable({ columns, drawerKind, rows }) {
  const statusIndex = columns.findIndex((column) => /status|risk/i.test(column));
  const actionIndex = columns.findIndex((column) => /action/i.test(column));

  return (
    <article className="v2-panel v2-table-panel v2-revenue-performance">
      <div className="v2-panel-heading">
        <div>
          <span>{drawerKind}</span>
          <strong>Detailed records</strong>
        </div>
      </div>
      <div className="v2-table-wrap">
        <table className="v2-table" style={{ "--v2-table-min": columns.length >= 7 ? "900px" : "780px" }}>
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column}>{column}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr data-v2-drawer={row[0]} data-v2-kind={drawerKind} data-v2-status={statusIndex >= 0 ? row[statusIndex] : "Open"} key={row.join("-")}>
                {row.map((cell, index) => {
                  if (index === statusIndex) {
                    return (
                      <td className="is-status" key={`${row[0]}-${index}`}>
                        <StatusPill status={cell} />
                      </td>
                    );
                  }
                  if (index === actionIndex) {
                    return (
                      <td className="is-action" key={`${row[0]}-${index}`}>
                        <button type="button">{cell}</button>
                      </td>
                    );
                  }
                  return (
                    <td className={index === 3 && String(cell).startsWith("-") ? "is-negative" : index === 3 && String(cell).startsWith("+") ? "is-positive" : ""} key={`${row[0]}-${index}`}>
                      {cell}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </article>
  );
}

function FinanceMetricCards({ metrics }) {
  return (
    <div className="v2-metric-grid">
      {metrics.map((metric) => (
        <div className="v2-metric-card" key={metric.label}>
          <span>{metric.label}</span>
          <strong>{metric.value}</strong>
          <em>{metric.delta || metric.note || ""}</em>
        </div>
      ))}
    </div>
  );
}

function DriverBoard({ legend, rows, summary, title }) {
  const max = Math.max(...rows.map((row) => row.value), 1);

  return (
    <article className="v2-panel">
      <div className="v2-panel-heading">
        <div>
          <span>{title}</span>
          <strong>{summary}</strong>
        </div>
        {legend ? <div className="v2-mini-legend">{legend}</div> : null}
      </div>
      <div className="v2-driver-list">
        {rows.map((row) => (
          <button className="v2-driver-row" data-v2-drawer={row.name} data-v2-kind={title} data-v2-status={row.status || "Open"} key={row.name} type="button">
            <span>
              <strong>{row.name}</strong>
              <em>{row.note || ""}</em>
            </span>
            <i style={{ "--driver-width": `${Math.max(7, (row.value / max) * 100).toFixed(2)}%` }}>
              <b />
              {row.target ? <u style={{ left: `${Math.min(98, (row.target / max) * 100).toFixed(2)}%` }} /> : null}
            </i>
            <strong>{row.display || String(row.value)}</strong>
          </button>
        ))}
      </div>
    </article>
  );
}

function CompactMetricRail({ cards }) {
  return (
    <aside className="v2-panel v2-side-panel">
      {cards.map((card) => (
        <div className="v2-insight-card" key={card.label}>
          <span>{card.label}</span>
          <strong>{card.value}</strong>
          <p>{card.note || ""}</p>
        </div>
      ))}
    </aside>
  );
}

function BucketBoard({ buckets, rows, title }) {
  return (
    <article className="v2-panel">
      <div className="v2-panel-heading">
        <div>
          <span>{title}</span>
        </div>
      </div>
      <div className="v2-bucket-grid" style={{ "--bucket-columns": buckets.length }}>
        <span />
        {buckets.map((bucket) => (
          <strong key={bucket}>{bucket}</strong>
        ))}
        {rows.flatMap((row) => [
          <b key={`${row.name}-label`}>{row.name}</b>,
          ...row.values.map((value, index) => {
            const status = index >= 3 && value > 10 ? "High" : index >= 2 ? "Watch" : "Low";
            return (
              <button className={`v2-bucket-cell v2-bucket-cell--age-${index} v2-bucket-cell--${status.toLowerCase()}`} data-v2-drawer={`${row.name} · ${buckets[index]}`} data-v2-kind={title} data-v2-status={status} key={`${row.name}-${buckets[index]}`} type="button">
                <span>₹{value}L</span>
              </button>
            );
          }),
        ])}
      </div>
    </article>
  );
}

function FunnelBoard({ steps, summary, title }) {
  const max = Math.max(...steps.map((step) => step.value), 1);

  return (
    <article className="v2-panel">
      <div className="v2-panel-heading">
        <div>
          <span>{title}</span>
          <strong>{summary}</strong>
        </div>
      </div>
      <div className="v2-funnel">
        {steps.map((step, index) => (
          <button className="v2-funnel-step" data-v2-drawer={step.name} data-v2-kind={title} data-v2-status={step.status || "Open"} key={step.name} type="button">
            <span>{step.name}</span>
            <i style={{ "--funnel-width": `${Math.max(18, (step.value / max) * 100).toFixed(2)}%` }} />
            <strong>{step.display}</strong>
            {index < steps.length - 1 ? <em /> : null}
          </button>
        ))}
      </div>
    </article>
  );
}

function TileGrid({ summary, tiles, title }) {
  return (
    <article className="v2-panel">
      <div className="v2-panel-heading">
        <div>
          <span>{title}</span>
          <strong>{summary}</strong>
        </div>
      </div>
      <div className="v2-tile-grid">
        {tiles.map((tile) => (
          <button className="v2-analysis-tile" data-v2-drawer={tile.title} data-v2-kind={title} data-v2-status={tile.status || "Open"} key={`${tile.label}-${tile.title}`} type="button">
            <span>{tile.label}</span>
            <strong>{tile.title}</strong>
            <em>{tile.value}</em>
            <p>{tile.note}</p>
          </button>
        ))}
      </div>
    </article>
  );
}

function MarginBoard() {
  const rows = financeTabContent["ebitda-margin"].rows.map(([name, revenue, ebitda, margin, gap, pressure, risk]) => ({
    name,
    note: `${revenue} revenue · ${risk} risk`,
    value: Number.parseFloat(margin),
    display: margin,
    status: risk,
    gap,
    pressure,
    ebitda,
  }));
  const min = 16;
  const max = 26;
  const target = 22;
  const targetPct = ((target - min) / (max - min)) * 100;
  const toPct = (value) => Math.max(4, Math.min(100, ((value - min) / (max - min)) * 100));

  return (
    <article className="v2-panel v2-margin-panel">
      <div className="v2-panel-heading">
        <div>
          <span>EBITDA Margin vs Target</span>
          <strong>Fixed scale bullet chart, target 22%.</strong>
        </div>
        <div className="v2-mini-legend">
          <span>
            <i style={{ "--legend-color": "var(--color-primary)" }} /> Current margin
          </span>
          <span>
            <i style={{ "--legend-color": "var(--color-chart-4)" }} /> Target
          </span>
        </div>
      </div>
      <div className="v2-margin-axis" style={{ "--target-left": `${targetPct.toFixed(2)}%` }}>
        <span>{min}%</span>
        <span>Target {target}%</span>
        <span>{max}%</span>
      </div>
      <div className="v2-margin-list">
        {rows.map((row) => {
          const gap = row.value - target;
          const tone = gap >= 0 ? "good" : gap > -2 ? "watch" : "bad";

          return (
            <button className="v2-margin-row" data-v2-drawer={row.name} data-v2-kind="EBITDA margin" data-v2-status={row.status} key={row.name} type="button">
              <span>
                <strong>{row.name}</strong>
                <em>{row.note}</em>
              </span>
              <i className="v2-margin-track" style={{ "--margin-width": `${toPct(row.value).toFixed(2)}%`, "--target-left": `${targetPct.toFixed(2)}%` }}>
                <b data-tone={tone} />
                <u />
              </i>
              <strong>{row.display}</strong>
              <em data-tone={tone}>
                {gap >= 0 ? "+" : ""}
                {gap.toFixed(1)}pp
              </em>
            </button>
          );
        })}
      </div>
    </article>
  );
}

function ArpobEbitdaBoard() {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const arpobSeries = [41.2, 39.4, 38.1, 36.6, 37.8, 40.1, 42.4, 41.8, 39.9, 38.7, 40.8, 43.2];
  const marginSeries = [24.6, 23.8, 22.9, 22.1, 21.4, 21.9, 22.8, 23.5, 22.7, 21.8, 22.4, 24.1];
  const chartRows = months.map((month, index) => ({ month, arpob: arpobSeries[index], margin: marginSeries[index] }));
  const xFor = (index) => 88 + index * 88;
  const barBase = 300;
  const chartTop = 34;
  const chartHeight = 266;
  const barTop = (value) => barBase - (value / 45) * chartHeight;
  const yForMargin = (value) => barBase - ((value - 18) / 8) * chartHeight;
  const roundedTopBar = (x, y, width, height, radius = 8) => {
    const left = x - width / 2;
    const right = x + width / 2;
    const bottom = y + height;
    return `M${left},${bottom}V${y + radius}Q${left},${y} ${left + radius},${y}H${right - radius}Q${right},${y} ${right},${y + radius}V${bottom}Z`;
  };
  const points = chartRows.map((row, index) => `${xFor(index)},${yForMargin(row.margin).toFixed(1)}`).join(" ");

  return (
    <article className="v2-panel v2-quality-panel">
      <div className="v2-panel-heading">
        <div>
          <span>ARPOB vs EBITDA Margin</span>
          <strong>12-month ARPOB (₹k) bars with EBITDA margin trend.</strong>
        </div>
        <div className="v2-mini-legend">
          <span>
            <i style={{ "--legend-color": "var(--color-primary)" }} /> ARPOB (₹k)
          </span>
          <span>
            <i style={{ "--legend-color": "#f97316" }} /> EBITDA margin
          </span>
        </div>
      </div>
      <div className="v2-combo-chart" role="img" aria-label="ARPOB bars and EBITDA margin line by month">
        <svg preserveAspectRatio="xMidYMid meet" viewBox="0 0 1180 340">
          <g className="v2-combo-grid">
            {[chartTop, 101, 167, 234, barBase].map((y) => (
              <line key={y} x1="56" x2="1088" y1={y} y2={y} />
            ))}
          </g>
          <g className="v2-combo-bars">
            {chartRows.map((row, index) => {
              const x = xFor(index);
              const y = barTop(row.arpob);
              const height = barBase - y;
              return (
                <g key={row.month}>
                  <path d={roundedTopBar(x, Number(y.toFixed(1)), 42, Number(height.toFixed(1)))} />
                  <text textAnchor="middle" x={x} y="326">
                    {row.month}
                  </text>
                </g>
              );
            })}
          </g>
          <polyline className="v2-combo-line" points={points} />
          <g className="v2-combo-points">
            {chartRows.map((row, index) => (
              <circle cx={xFor(index)} cy={yForMargin(row.margin).toFixed(1)} key={row.month} r="5" />
            ))}
          </g>
          <g className="v2-combo-axis">
            <text className="v2-combo-axis-name" textAnchor="middle" transform="rotate(-90 4 167)" x="4" y="167">
              ARPOB (₹k)
            </text>
            {[["45", chartTop + 4], ["34", 105], ["23", 171], ["11", 238], ["0", barBase + 4]].map(([label, y]) => (
              <text key={label} textAnchor="end" x="32" y={y}>
                {label}
              </text>
            ))}
          </g>
        </svg>
      </div>
    </article>
  );
}

function FinanceWorkflow({ columns, rows, summary, title }) {
  return <WorkflowTable columns={columns} rows={rows} summary={summary} title={title} />;
}

function RevenueAnalysis() {
  const field = activeRevenueField();

  return (
    <section className="v2-revenue-workspace">
      <RevenueKpiStrip />
      <div className="v2-revenue-analysis-layout">
        <div className="v2-revenue-main">
          <div className="v2-revenue-controls">
            <FieldTabs field={field} />
          </div>
          <div className="v2-revenue-grid">
            <ContributionPanel field={field} />
            <aside className="v2-panel v2-revenue-control-panel">
              <LocalFilterStrip field={field} />
            </aside>
          </div>
        </div>
      </div>
      <MovementBoard field={field} />
      <DataTable columns={["Name", "Revenue", "Contribution", "Growth", "Margin", "Status"]} drawerKind="Performance Breakdown" rows={performanceRowsByField[field]} />
    </section>
  );
}

function GenericFinanceTab({ tab }) {
  const content = financeTabContent[tab];

  if (tab === "ebitda-margin") {
    return (
      <section className="finance-tab-stack">
        <FinanceMetricCards metrics={content.metrics} />
        <div className="v2-board-grid v2-board-grid--full">
          <MarginBoard />
          <ArpobEbitdaBoard />
        </div>
        <FinanceWorkflow
          columns={["Branch", "Revenue", "EBITDA", "EBITDA Margin", "Margin vs Target", "Cost Pressure", "Risk"]}
          rows={content.rows.map(([branch, revenue, ebitda, margin, gap, pressure, risk]) => [{ value: branch, note: `${risk} risk` }, revenue, ebitda, margin, gap, pressure, { value: risk, status: risk }])}
          summary="Revenue, EBITDA, ARPOB, and operating risk by branch."
          title="Branch Margin Snapshot"
        />
      </section>
    );
  }

  if (tab === "payor-collections") {
    return (
      <section className="finance-tab-stack">
        <FinanceMetricCards metrics={content.metrics} />
        <div className="v2-board-grid">
          <BucketBoard
            buckets={["0-30", "31-60", "61-90", "90+"]}
            rows={[
              { name: "Insurance", values: [42, 31, 18, 12] },
              { name: "TPA", values: [34, 27, 22, 16] },
              { name: "Corporate", values: [26, 18, 10, 7] },
              { name: "Government", values: [18, 16, 14, 11] },
              { name: "Cash", values: [11, 7, 4, 2] },
            ]}
            title="Pending Exposure"
          />
          <CompactMetricRail
            cards={[
              { label: "Payor Mix", value: "Insurance 41%", note: "Largest revenue share and highest review load." },
              { label: "Aging Signal", value: "TPA watch", note: "Queries aging into 90+ bucket." },
              { label: "Next Action", value: "Central", note: "Review 61-90 and 90+ exposure." },
            ]}
          />
        </div>
        <FinanceWorkflow columns={content.columns} rows={content.rows.map((row) => row.map((cell, index) => (index === row.length - 1 ? { value: cell, status: cell } : cell)))} summary="Aging and expected closure by payor and branch." title="Collection Risk Snapshot" />
      </section>
    );
  }

  if (tab === "patient-mix") {
    return (
      <section className="finance-tab-stack">
        <FinanceMetricCards metrics={content.metrics} />
        <div className="v2-board-grid">
          <TileGrid
            summary="Demographic and retention BI grid."
            tiles={[
              { label: "Age profile", title: "31-45", value: "32%", note: "Largest unique patient segment." },
              { label: "Revenue + ARPOB", title: "46-60", value: "₹38k", note: "Highest revenue per patient." },
              { label: "New vs Repeat", title: "Repeat", value: "66%", note: "Stable returning base." },
              { label: "Channel / Payor", title: "Insurance", value: "41%", note: "Dominant payor channel." },
            ]}
            title="Patient Mix"
          />
          <CompactMetricRail
            cards={[
              { label: "Retention Signal", value: "Good", note: "<90 day repeat cohort improving." },
              { label: "Risk", value: "New patient dependency", note: "Southpoint relies heavily on first visits." },
              { label: "Report", value: "Retention Report", note: "Open via Reports for cohort export." },
            ]}
          />
        </div>
        <DriverBoard
          rows={[
            { name: "<30 days", value: 28, display: "28%", note: "Fast return" },
            { name: "<60 days", value: 46, display: "46%", note: "Healthy" },
            { name: "<90 days", value: 61, display: "61%", note: "Target cohort" },
            { name: "<120 days", value: 72, display: "72%", note: "Watch" },
            { name: "<180 days", value: 84, display: "84%", note: "Long-cycle return" },
          ]}
          summary="Repeat visit window by cohort."
          title="Retention Window"
        />
        <FinanceWorkflow columns={content.columns} rows={content.rows.map((row) => row.map((cell, index) => (index === row.length - 1 ? { value: cell, status: cell } : cell)))} summary="Patient segment revenue and cohort status." title="Patient Segment Revenue Table" />
      </section>
    );
  }

  if (tab === "service-conversion") {
    return (
      <section className="finance-tab-stack">
        <FinanceMetricCards metrics={content.metrics} />
        <div className="v2-board-grid">
          <FunnelBoard
            steps={[
              { name: "OPD Visits", value: 28420, display: "28,420" },
              { name: "With Orders", value: 11320, display: "11,320" },
              { name: "Lab Orders", value: 6680, display: "6,680" },
              { name: "Lab Visits", value: 5020, display: "5,020" },
              { name: "Pharmacy Visits", value: 8860, display: "8,860" },
            ]}
            summary="OPD visit to lab/pharmacy conversion path."
            title="Service Conversion"
          />
          <CompactMetricRail
            cards={[
              { label: "Lowest lab conversion", value: "Kidney transplant workup", note: "Workup pathway not consistently ordering renal panels." },
              { label: "Lowest pharmacy conversion", value: "Nephrology OPD", note: "ESA and CKD medication leakage likely." },
              { label: "Open report", value: "Service Conversion", note: "Use Reports for founder-format export." },
            ]}
          />
        </div>
        <DriverBoard
          rows={[
            { name: "Nephrology OPD", value: 72, display: "72%", note: "Lab 29% · Pharmacy 43%" },
            { name: "In-centre dialysis", value: 68, display: "68%", note: "Lab 31% · Pharmacy 37%" },
            { name: "Renal ICU", value: 52, display: "52%", note: "Lab 24% · Pharmacy 28%", status: "Watch" },
            { name: "Kidney transplant workup", value: 46, display: "46%", note: "Lab 18% · Pharmacy 28%", status: "High" },
          ]}
          summary="Service-line lab and pharmacy conversion rate."
          title="Conversion by Service Line"
        />
        <FinanceWorkflow columns={content.columns} rows={content.rows.map((row) => row.map((cell, index) => (index === row.length - 1 ? { value: cell, status: cell } : cell)))} summary="Service line conversion and revenue impact." title="Service Conversion Table" />
      </section>
    );
  }

  return (
    <section className="finance-drilldown-card">
      <header className="finance-dd-header">
        <div>
          <span className="finance-dd-kicker">Revenue Drilldown</span>
          <h2>Source contribution by department, center, doctor, demographics, and year</h2>
          <p>Revenue-source view migrated with the same source fields used by the live redesigned layer.</p>
        </div>
      </header>
      <RevenueAnalysis />
    </section>
  );
}

export function FinancePage() {
  const tab = activeFinanceTab();

  return (
    <section className="v2-foundation finance-clean-page" data-v2-role="CEO">
      <PageTabs activeTab={tab} />
      {tab === "revenue-analysis" ? <RevenueAnalysis /> : <GenericFinanceTab tab={tab} />}
    </section>
  );
}
