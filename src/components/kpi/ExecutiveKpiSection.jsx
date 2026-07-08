import {
  Activity,
  Bed,
  CalendarCheck,
  ChartNoAxesCombined,
  Clock3,
  Droplets,
  Fingerprint,
  HeartPulse,
  IndianRupee,
  MonitorCheck,
  Pill,
  ShieldCheck,
  TrendingDown,
  UserPlus,
  UsersRound,
} from "lucide-react";

const iconByLabel = [
  [/revenue|arpob/i, IndianRupee],
  [/ebitda|margin|conversion/i, ChartNoAxesCombined],
  [/dialysis/i, Droplets],
  [/occupancy|bed|turnaround/i, Bed],
  [/er|boarding/i, HeartPulse],
  [/door-to-doctor|discharge|tat/i, Clock3],
  [/ot|utilization/i, Activity],
  [/pharmacy|fill/i, Pill],
  [/equip|uptime/i, MonitorCheck],
  [/attendance/i, CalendarCheck],
  [/biometric|access/i, Fingerprint],
  [/credential|risk/i, ShieldCheck],
  [/onboarding/i, UserPlus],
  [/vacanc|staff|coverage/i, UsersRound],
];

function iconFor(label) {
  return iconByLabel.find(([pattern]) => pattern.test(label))?.[1] || TrendingDown;
}

function scoreBandColor(progressPercent, variant) {
  if (variant === "bed-status") {
    if (progressPercent <= 60) return "var(--score-green)";
    if (progressPercent <= 85) return "var(--score-optimal)";
    if (progressPercent <= 95) return "var(--score-yellow)";
    return "var(--score-red)";
  }

  return progressPercent < 34 ? "var(--score-red)" : progressPercent < 67 ? "var(--score-yellow)" : "var(--score-green)";
}

function scoreTone(score, variant) {
  if (variant === "bed-status") {
    if (score > 95) return "risk";
    if (score > 85) return "attention";
    if (score > 60) return "optimal";
    return "stable";
  }

  return score >= 76 ? "stable" : score >= 62 ? "attention" : "risk";
}

function ScoreMeter({ score, variant }) {
  const totalSegments = 32;
  const numericScore = Math.max(0, Math.min(100, Number(score || 0)));
  const activeSegments = Math.round((numericScore / 100) * totalSegments);
  const centerX = 112;
  const centerY = 112;
  const innerRadius = 78;
  const outerRadius = 102;

  return (
    <svg aria-label={`${numericScore}% score`} className="executive-score-arc" role="img" viewBox="0 0 224 118">
      <g>
        {Array.from({ length: totalSegments }, (_, index) => {
          const progress = totalSegments === 1 ? 0 : index / (totalSegments - 1);
          const progressPercent = progress * 100;
          const angle = Math.PI - progress * Math.PI;
          const x1 = centerX + Math.cos(angle) * innerRadius;
          const y1 = centerY - Math.sin(angle) * innerRadius;
          const x2 = centerX + Math.cos(angle) * outerRadius;
          const y2 = centerY - Math.sin(angle) * outerRadius;
          const bandColor = scoreBandColor(progressPercent, variant);

          return (
            <line
              key={index}
              stroke={index >= activeSegments ? "var(--score-muted)" : bandColor}
              x1={x1.toFixed(1)}
              x2={x2.toFixed(1)}
              y1={y1.toFixed(1)}
              y2={y2.toFixed(1)}
            />
          );
        })}
      </g>
    </svg>
  );
}

function ScoreCard({ label, score, state, tone, variant }) {
  const numericScore = Number(score || 0);
  const resolvedTone = tone || scoreTone(numericScore, variant);

  return (
    <article className={`executive-score-card executive-score-card--${resolvedTone}`}>
      <span>{label}</span>
      <ScoreMeter score={score} variant={variant} />
      <strong>{score}%</strong>
      <em>{state}</em>
    </article>
  );
}

function KpiCard({ change, label, tone = "up", value }) {
  const Icon = iconFor(label);

  return (
    <article className="executive-kpi-card">
      <span className="executive-kpi-title">
        <Icon aria-hidden="true" className="executive-kpi-title-icon" />
        <span>{label}</span>
      </span>
      <div>
        <strong>{value}</strong>
        <em className={`is-${tone}`}>{change}</em>
      </div>
    </article>
  );
}

export function ExecutiveKpiSection({ kpis, role, score }) {
  return (
    <section aria-label={`${role} KPI summary`} className={`executive-kpi-section executive-kpi-section--${role.toLowerCase()}`}>
      <ScoreCard {...score} />
      <div className="executive-kpi-grid">
        {kpis.map((kpi) => (
          <KpiCard key={kpi.label} {...kpi} />
        ))}
      </div>
    </section>
  );
}
