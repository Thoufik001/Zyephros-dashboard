import { useMemo, useState } from "react";
import { Area, Bar, CartesianGrid, Cell, ComposedChart, Line, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { capacityEfficiency, ceoRevenueTrend, growthDemand, serviceLineMix } from "../../data/overviewData.js";

const axisStyle = { fill: "var(--color-muted-foreground)", fontSize: 12 };
const gridStroke = "#dfe7ee";
const ranges = ["Daily", "Weekly", "Monthly", "Yearly"];
const year = 2025;
const yearlyCmi = [
  { value: "1.21", change: "↑2%" },
  { value: "1.26", change: "↑3%" },
  { value: "1.31", change: "↑4%" },
  { value: "1.36", change: "↑5%" },
  { value: "1.40", change: "↑6%" },
  { value: "1.43", change: "↑8%" },
];

const branchMix = [
  { label: "Whitefield", value: 42.1, revenue: 29.6, color: "#32b7c8" },
  { label: "Jayanagar", value: 25.2, revenue: 17.8, color: "#ff765e" },
  { label: "Hebbal", value: 17.8, revenue: 12.5, color: "#f4b451" },
  { label: "Electronic City", value: 15.0, revenue: 10.5, color: "#2fbf7f" },
];

const payorMix = [
  { label: "Insurance", value: 35.1, revenue: 24.7, color: "#32b7c8" },
  { label: "Self-Pay", value: 30.0, revenue: 21.1, color: "#ff765e" },
  { label: "TPA", value: 24.9, revenue: 17.5, color: "#f4b451" },
  { label: "Govt Scheme", value: 10.0, revenue: 7.1, color: "#e77aae" },
];

function formatValue(value, suffix = "") {
  if (typeof value !== "number") return value || "-";
  if (suffix === "%") return `${value.toFixed(1)}%`;
  if (suffix === "d") return `${value.toFixed(2)}d`;
  if (suffix === "Cr") return `₹${value.toFixed(1)}Cr`;
  return `${value.toLocaleString("en-IN")}${suffix}`;
}

function TooltipBox({ tooltip }) {
  if (!tooltip) return null;
  return (
    <div className="ceo-chart-tooltip" style={tooltip.style}>
      <strong>{tooltip.title}</strong>
      {tooltip.rows.map((row) => (
        <span key={row.label}>
          <i style={{ "--tooltip-color": row.color }} />
          <em>{row.label}</em>
          <b>
            {row.display}
            {row.delta ? <small data-tone={row.delta.startsWith("↓") || row.delta.startsWith("-") ? "negative" : "positive"}>{row.delta}</small> : null}
          </b>
        </span>
      ))}
    </div>
  );
}

function tooltipStyle(event, card) {
  const rect = card.getBoundingClientRect();
  const halfWidth = Math.min(132, Math.max(96, rect.width / 2 - 12));
  const rawLeft = event.clientX - rect.left;
  const left = Math.max(halfWidth, Math.min(Math.max(halfWidth, rect.width - halfWidth), rawLeft));
  const localY = event.clientY - rect.top;
  const canPlaceAbove = localY > 170;
  const top = canPlaceAbove ? localY - 14 : localY + 14;
  return {
    left: `${left}px`,
    top: `${top}px`,
    transform: canPlaceAbove ? "translate(-50%, -100%)" : "translateX(-50%)",
  };
}

function chartIndex(event, host, length, rightPad = 12) {
  const rect = host.getBoundingClientRect();
  const plotLeft = 42;
  const usableWidth = Math.max(1, rect.width - plotLeft - rightPad);
  const cursorX = Math.max(0, Math.min(usableWidth, event.clientX - rect.left - plotLeft));
  return Math.max(0, Math.min(length - 1, Math.round((cursorX / usableWidth) * (length - 1))));
}

function RangePicker({ compact = false, items, onChange, selected }) {
  return (
    <div className={`ceo-scan-range ${compact ? "ceo-scan-range--compact" : ""}`} role="group">
      {items.map((item) => (
        <button aria-pressed={String(item === selected)} className={item === selected ? "is-active" : ""} key={item} onClick={() => onChange(item)} type="button">
          {item}
        </button>
      ))}
    </div>
  );
}

function rangeLabels(range) {
  if (range === "Daily") return ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  if (range === "Weekly") return ["W1", "W2", "W3", "W4", "W5", "W6"];
  if (range === "Yearly") return ["2020", "2021", "2022", "2023", "2024", "2025"];
  return ceoRevenueTrend.map((item) => item.month);
}

function rangeValues(values, range, kindIndex) {
  const last = Number(values.at(-1) || 0);
  const previous = Number(values.at(-2) || last);
  if (range === "Daily") {
    const base = Math.max(1, (last + previous) / 14);
    const patterns = [
      [0.88, 1.02, 0.95, 1.16, 0.98, 1.22, 1.06],
      [1.04, 0.9, 1.08, 0.96, 0.92, 1.06, 0.98],
      [1.02, 1.02, 1.02, 1.02, 1.02, 1.02, 1.02],
    ];
    return patterns[kindIndex].map((factor) => base * factor);
  }
  if (range === "Weekly") {
    const base = Math.max(1, last / 4.3);
    const patterns = [
      [0.86, 1.08, 0.98, 1.16, 1.03, 1.24],
      [0.94, 0.9, 1.04, 0.97, 1.1, 1.02],
      [0.98, 1, 1.01, 1.02, 1.03, 1.03],
    ];
    return patterns[kindIndex].map((factor) => base * factor);
  }
  if (range === "Yearly") {
    const base = Math.max(1, last);
    const patterns = [
      [0.58, 0.66, 0.74, 0.84, 0.94, 1.05],
      [0.5, 0.58, 0.65, 0.74, 0.82, 0.93],
      [0.62, 0.7, 0.78, 0.86, 0.96, 1.06],
    ];
    return patterns[kindIndex].map((factor) => base * factor);
  }
  return values;
}

function revenueData(range) {
  const labels = rangeLabels(range);
  const current = rangeValues(ceoRevenueTrend.map((item) => item.current), range, 0);
  const previous = rangeValues(ceoRevenueTrend.map((item) => item.previous), range, 1);
  const target = rangeValues(ceoRevenueTrend.map((item) => item.target), range, 2);
  return labels.map((label, index) => ({
    month: label,
    current: current[index],
    previous: previous[index],
    target: target[index],
    ...(range === "Yearly" ? { cmi: yearlyCmi[index]?.value, cmiChange: yearlyCmi[index]?.change } : {}),
  }));
}

function revenueAxis(range, data) {
  if (range === "Monthly") return { domain: [0, 8], ticks: [0, 2, 4, 6, 8] };
  if (range === "Yearly") return { domain: [0, 9], ticks: [0, 2, 4, 6, 8] };

  const maxValue = Math.max(...data.flatMap((item) => [item.current, item.previous, item.target]).filter(Number.isFinite), 1);
  const top = Math.max(1, Math.ceil(maxValue * 1.28));
  const step = top <= 2 ? 0.5 : top <= 4 ? 1 : 2;
  const ticks = [];
  for (let value = 0; value <= top + 0.001; value += step) ticks.push(Number(value.toFixed(1)));
  return { domain: [0, top], ticks };
}

function cmiContext(range) {
  return {
    Daily: { value: "1.36", change: "↑2%" },
    Weekly: { value: "1.38", change: "↑4%" },
    Monthly: { value: "1.40", change: "↑6%" },
    Yearly: { value: "1.43", change: "↑8%" },
  }[range];
}

function revenueLegend(range) {
  const labels = {
    Daily: ["Current period (last 30 days)", "Previous period (prior 30 days)"],
    Weekly: ["Current period (last 6 weeks)", "Previous period (prior 6 weeks)"],
    Monthly: [`Current period (Jan-Dec ${year})`, `Previous period (Jan-Dec ${year - 1})`],
    Yearly: ["Current period (2020-2025)", "Previous period (2014-2019)"],
  }[range];
  return labels;
}

function RevenueLegend({ range }) {
  const labels = revenueLegend(range);
  return (
    <div className="ceo-scan-legend" aria-label="Chart legend">
      <span>
        <i className="ceo-scan-legend-dot" style={{ background: "var(--color-primary)" }} />
        {labels[0]}
      </span>
      {range !== "Yearly" ? (
        <span>
          <i className="ceo-scan-legend-dot ceo-scan-legend-dot--previous" />
          {labels[1]}
        </span>
      ) : null}
      <span>
        <i className="ceo-scan-legend-dot ceo-scan-legend-dot--target" />
        Target
      </span>
    </div>
  );
}

function conicSegments(rows) {
  const total = rows.reduce((sum, row) => sum + Number(row.value || 0), 0) || 1;
  let offset = 0;
  return rows
    .flatMap((row) => {
      const share = (Number(row.value || 0) / total) * 100;
      const start = offset;
      const end = offset + share;
      offset = end;
      const gap = Math.min(0.42, Math.max(0, share) / 4);
      const visualStart = start + gap / 2;
      const visualEnd = end - gap / 2;
      return [
        `var(--color-surface) ${start.toFixed(2)}% ${visualStart.toFixed(2)}%`,
        `${row.color} ${visualStart.toFixed(2)}% ${visualEnd.toFixed(2)}%`,
        `var(--color-surface) ${visualEnd.toFixed(2)}% ${end.toFixed(2)}%`,
      ];
    })
    .join(", ");
}

function rowsWithSegments(rows) {
  let offset = 0;
  return rows.map((row) => {
    const start = offset;
    const end = offset + row.value;
    offset = end;
    return { ...row, start, end };
  });
}

function DonutContent({ rows, title }) {
  const sorted = [...rows].sort((a, b) => b.value - a.value);
  const leader = sorted[0];
  const [tooltip, setTooltip] = useState(null);
  const segments = rowsWithSegments(sorted);

  function showTooltip(event) {
    const donut = event.currentTarget;
    const rect = donut.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = event.clientX - centerX;
    const dy = event.clientY - centerY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < rect.width / 2 - 26) {
      setTooltip(null);
      return;
    }
    const percent = (((Math.atan2(dy, dx) * 180) / Math.PI + 90 + 360) % 360) / 360 * 100;
    const segment = segments.find((item) => percent >= item.start && percent < item.end) || segments.at(-1);
    setTooltip({
      title: segment.label,
      rows: [
        { label: "Revenue", display: formatValue(segment.revenue, "Cr"), color: segment.color },
        { label: "Share", display: `${segment.value.toFixed(1)}%`, color: segment.color },
      ],
      style: tooltipStyle(event, donut.closest(".ceo-scan-card")),
    });
  }

  return (
    <>
      <div className="ceo-branch-donut-layout">
        <div className="ceo-driver-donut" onMouseLeave={() => setTooltip(null)} onMouseMove={showTooltip} role="img" aria-label={title} style={{ "--driver-donut": conicSegments(sorted) }}>
          <div>
            <strong>{leader.value.toFixed(1)}%</strong>
            <span>{leader.label}</span>
          </div>
        </div>
        <div className="ceo-branch-donut-legend">
          {sorted.map((row) => (
            <div className="ceo-branch-donut-row" key={row.label} style={{ "--branch-color": row.color }}>
              <i />
              <span>{row.label}</span>
              <strong>{row.value.toFixed(1)}%</strong>
            </div>
          ))}
        </div>
      </div>
      <TooltipBox tooltip={tooltip} />
    </>
  );
}

function chartTooltipRows(point, rows) {
  return rows.map((row) => ({
    ...row,
    display: row.display ?? formatValue(point[row.key], row.suffix),
  }));
}

export function RevenueTrendCard() {
  const [range, setRange] = useState("Monthly");
  const [tooltip, setTooltip] = useState(null);
  const data = useMemo(() => revenueData(range), [range]);
  const axis = revenueAxis(range, data);
  const cmi = cmiContext(range);

  function showTooltip(event) {
    const host = event.currentTarget;
    const point = data[chartIndex(event, host, data.length)] || data[0];
    setTooltip({
      title: point.month,
      rows: chartTooltipRows(point, [
        { key: "current", label: "Current period", color: "var(--color-primary)", suffix: "Cr" },
        ...(range === "Yearly" ? [] : [{ key: "previous", label: "Previous period", color: "#4f7fa8", suffix: "Cr" }]),
        { key: "target", label: "Target", color: "#f97316", suffix: "Cr" },
        ...(range === "Yearly" ? [{ label: "Avg CMI", color: "#1f9b61", display: point.cmi, delta: point.cmiChange }] : []),
      ]),
      style: tooltipStyle(event, host.closest(".ceo-scan-card")),
    });
  }

  return (
    <article className="ceo-scan-card ceo-scan-card--chart" data-ceo-trend-key="revenue-trend">
      <div className="ceo-scan-card-head">
        <div className="ceo-scan-card-title-group">
          <span>Revenue trend</span>
          {range !== "Yearly" ? (
            <em className="ceo-context-pill">
              <span>Avg CMI</span>
              <strong>{cmi.value}</strong>
              <b>{cmi.change}</b>
            </em>
          ) : null}
        </div>
        <RangePicker items={ranges} onChange={setRange} selected={range} />
      </div>
      <div className="ceo-recharts-host ceo-recharts-host--trend" onMouseLeave={() => setTooltip(null)} onMouseMove={showTooltip} role="img" aria-label="Revenue trend">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart accessibilityLayer={false} data={data} margin={{ top: 8, right: 12, left: 4, bottom: 6 }}>
            <defs>
              <linearGradient id="revenueArea" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#18a9b8" stopOpacity={0.22} />
                <stop offset="100%" stopColor="#18a9b8" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke={gridStroke} strokeDasharray="4 8" vertical={false} />
            <XAxis dataKey="month" tick={axisStyle} tickLine={false} axisLine={false} />
            <YAxis domain={axis.domain} ticks={axis.ticks} tick={axisStyle} tickLine={false} axisLine={false} width={28} />
            <Tooltip />
            <Area dataKey="current" fill="url(#revenueArea)" isAnimationActive={false} stroke="#18a9b8" strokeWidth={2} type="monotone" name="Current period" />
            {range !== "Yearly" ? <Line dataKey="previous" isAnimationActive={false} stroke="#6f98bd" strokeDasharray="6 6" strokeWidth={2} dot={false} type="monotone" name="Previous period" /> : null}
            <Line dataKey="target" isAnimationActive={false} stroke="#f97316" strokeDasharray="3 4" strokeWidth={2} dot={false} name="Target" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      <RevenueLegend range={range} />
      <TooltipBox tooltip={tooltip} />
    </article>
  );
}

export function ServiceLineCard() {
  const slides = [
    { title: "Revenue by Service Line", rows: serviceLineMix.map((row) => ({ label: row.name, value: row.value, revenue: row.revenue, color: row.color })) },
    { title: "Branch Contribution", rows: branchMix },
    { title: "Revenue by Payor Mix", rows: payorMix },
  ];
  const [active, setActive] = useState(0);
  const slide = slides[active];

  function move(direction) {
    setActive((value) => (value + direction + slides.length) % slides.length);
  }

  return (
    <article className="ceo-scan-card ceo-scan-card--drivers" data-ceo-driver-carousel>
      <div className="ceo-scan-card-head">
        <div>
          <span data-ceo-driver-title>{slide.title}</span>
        </div>
        <div className="ceo-carousel-controls" aria-label="Revenue driver carousel controls">
          <button aria-label="Previous driver" onClick={() => move(-1)} type="button">
            <ChevronLeft aria-hidden="true" />
          </button>
          <strong>
            <span data-ceo-driver-index>{active + 1}</span> / {slides.length}
          </strong>
          <button aria-label="Next driver" onClick={() => move(1)} type="button">
            <ChevronRight aria-hidden="true" />
          </button>
        </div>
      </div>
      <div className="ceo-driver-slides">
        {slides.map((item, index) => (
          <section className={`ceo-driver-slide ${index === active ? "is-active" : ""}`} data-ceo-driver-label={item.title} data-ceo-driver-slide={index} hidden={index !== active} key={item.title}>
            <DonutContent rows={item.rows} title={item.title} />
          </section>
        ))}
      </div>
    </article>
  );
}

export function CapacityEfficiencyCard() {
  const [tooltip, setTooltip] = useState(null);
  const [activeBar, setActiveBar] = useState(-1);

  function showTooltip(event) {
    const host = event.currentTarget;
    const index = chartIndex(event, host, capacityEfficiency.length, 42);
    const point = capacityEfficiency[index] || capacityEfficiency[0];
    setActiveBar(index);
    setTooltip({
      title: point.day,
      rows: [
        { label: "Bed occupancy", display: formatValue(point.occupancy, "%"), color: "var(--color-primary)" },
        { label: "ALOS", display: formatValue(point.alos, "d"), color: "#f97316" },
      ],
      style: tooltipStyle(event, host.closest(".ceo-scan-card")),
    });
  }

  return (
    <article className="ceo-scan-card ceo-capacity-efficiency-card">
      <div className="ceo-scan-card-head">
        <div>
          <span>Capacity &amp; Efficiency</span>
        </div>
      </div>
      <div className="ceo-capacity-recharts-frame">
        <span className="ceo-capacity-axis-label ceo-capacity-axis-label--left">Bed occupancy</span>
        <div
          className={`ceo-recharts-host ceo-recharts-host--capacity ${activeBar >= 0 ? "is-bar-focus" : ""}`}
          onMouseLeave={() => {
            setTooltip(null);
            setActiveBar(-1);
          }}
          onMouseMove={showTooltip}
          role="img"
          aria-label="Daily bed occupancy bars and ALOS trend line"
        >
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart accessibilityLayer={false} data={capacityEfficiency} margin={{ top: 8, right: 6, left: 0, bottom: 8 }}>
              <CartesianGrid stroke={gridStroke} strokeDasharray="4 8" vertical={false} />
              <XAxis dataKey="day" tick={axisStyle} tickLine={false} axisLine={false} />
              <YAxis domain={[0, 100]} tick={axisStyle} tickFormatter={(value) => `${value}%`} tickLine={false} axisLine={false} ticks={[0, 50, 85, 100]} width={42} yAxisId="left" />
              <YAxis domain={[3, 6]} orientation="right" tick={axisStyle} tickFormatter={(value) => `${value}d`} tickLine={false} axisLine={false} ticks={[3, 4, 5, 6]} width={28} yAxisId="right" />
              <Tooltip />
              <Bar dataKey="occupancy" fill="#18a9b8" isAnimationActive={false} radius={[7, 7, 0, 0]} yAxisId="left" name="Bed occupancy">
                {capacityEfficiency.map((entry, index) => (
                  <Cell fill="#18a9b8" fillOpacity={activeBar < 0 || activeBar === index ? 1 : 0.58} key={entry.day} />
                ))}
              </Bar>
              <ReferenceLine ifOverflow="extendDomain" isFront stroke="#ff765e" strokeDasharray="3 5" strokeWidth={2} y={85} yAxisId="left" />
              <Line dataKey="alos" dot={{ r: 3, stroke: "#fff", strokeWidth: 2 }} isAnimationActive={false} stroke="#ff765e" strokeWidth={2} yAxisId="right" name="ALOS" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
        <span className="ceo-capacity-axis-label ceo-capacity-axis-label--right">ALOS</span>
      </div>
      <div className="ceo-capacity-legend">
        <span>
          <i className="is-bar" /> Bed occupancy
        </span>
        <span>
          <i className="is-line" /> ALOS
        </span>
        <span>
          <i className="is-target" /> Target
        </span>
      </div>
      <TooltipBox tooltip={tooltip} />
    </article>
  );
}

function growthData(range, metric) {
  if (range === "Yearly") {
    return ["2020", "2021", "2022", "2023", "2024", "2025"].map((month, index) => {
      const admission = [1015, 1098, 1062, 1172, 1137, 1234][index];
      const opd = [5300, 5580, 5420, 5910, 5750, 6250][index];
      const conversion = [33, 35, 34, 38, 37, 40][index];
      return { month, admissions: metric === "OPD Consults" ? opd : admission, conversion };
    });
  }
  return growthDemand.map((item) => ({ ...item, admissions: metric === "OPD Consults" ? Math.round(item.admissions * 5.1) : item.admissions }));
}

export function GrowthDemandCard() {
  const [range, setRange] = useState("Monthly");
  const [metric, setMetric] = useState("IPD Admissions");
  const [menuOpen, setMenuOpen] = useState(false);
  const [tooltip, setTooltip] = useState(null);
  const data = useMemo(() => growthData(range, metric), [range, metric]);
  const metricColor = metric === "OPD Consults" ? "#7c5cff" : "#18a9b8";
  const metricGradientId = metric === "OPD Consults" ? "growthAreaOpdConsults" : "growthAreaIpdAdmissions";

  function showTooltip(event) {
    const host = event.currentTarget;
    const point = data[chartIndex(event, host, data.length, 42)] || data[0];
    setTooltip({
      title: point.month,
      rows: [
        { label: metric, display: formatValue(point.admissions), color: metricColor },
        { label: "OPD → IPD Conversion Rate", display: formatValue(point.conversion, "%"), color: "#f97316" },
      ],
      style: tooltipStyle(event, host.closest(".ceo-scan-card")),
    });
  }

  return (
    <article className="ceo-scan-card ceo-scan-card--chart ceo-scan-card--growth-demand">
      <div className="ceo-scan-card-head">
        <div>
          <div className="ceo-growth-demand-title">
            <span>Growth &amp; Demand:</span>
            <button aria-expanded={String(menuOpen)} onClick={() => setMenuOpen((value) => !value)} type="button">
              {metric}
              <ChevronDown aria-hidden="true" />
            </button>
          </div>
          {menuOpen ? (
            <div className="overview-growth-menu" role="menu">
              {["IPD Admissions", "OPD Consults"].map((option) => (
                <button
                  aria-checked={String(option === metric)}
                  key={option}
                  onClick={() => {
                    setMetric(option);
                    setMenuOpen(false);
                  }}
                  role="menuitemradio"
                  type="button"
                >
                  {option}
                </button>
              ))}
            </div>
          ) : null}
        </div>
        <RangePicker compact items={["Monthly", "Yearly"]} onChange={setRange} selected={range} />
      </div>
      <div className="ceo-recharts-host ceo-recharts-host--trend ceo-recharts-host--growth-demand" onMouseLeave={() => setTooltip(null)} onMouseMove={showTooltip} role="img" aria-label="Growth and demand trend for IPD admissions and OPD to IPD conversion">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart accessibilityLayer={false} data={data} margin={{ top: 8, right: 12, left: 0, bottom: 8 }}>
            <defs>
              <linearGradient id={metricGradientId} x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor={metricColor} stopOpacity={0.22} />
                <stop offset="100%" stopColor={metricColor} stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke={gridStroke} strokeDasharray="4 8" vertical={false} />
            <XAxis dataKey="month" tick={axisStyle} tickLine={false} axisLine={false} />
            <YAxis domain={metric === "OPD Consults" ? [5000, 6500] : [1039, 1259]} tick={axisStyle} tickLine={false} axisLine={false} width={52} yAxisId="left" />
            <YAxis domain={[0, 80]} orientation="right" tick={axisStyle} tickFormatter={(value) => `${value}%`} tickLine={false} axisLine={false} ticks={[0, 40, 80]} width={40} yAxisId="right" />
            <Tooltip />
            <Area dataKey="admissions" fill={`url(#${metricGradientId})`} isAnimationActive={false} stroke={metricColor} strokeWidth={2} type="monotone" yAxisId="left" name={metric} />
            <Line dataKey="conversion" dot={false} isAnimationActive={false} stroke="#ff765e" strokeWidth={2} yAxisId="right" name="OPD to IPD Conversion Rate" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      <div className="ceo-scan-legend" aria-label="Chart legend">
        <span>
          <i className="ceo-scan-legend-dot" style={{ background: metricColor }} />
          {metric}
        </span>
        <span>
          <i className="ceo-scan-legend-dot" style={{ background: "#f97316" }} />
          OPD → IPD Conversion Rate
        </span>
      </div>
      <TooltipBox tooltip={tooltip} />
    </article>
  );
}
