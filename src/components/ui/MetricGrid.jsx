export function MetricGrid({ metrics }) {
  return (
    <div className="v2-metric-grid">
      {metrics.map((metric) => (
        <div className="v2-metric-card" key={metric.label}>
          <span>{metric.label}</span>
          <strong>{metric.value}</strong>
          <em>{metric.delta || metric.note}</em>
        </div>
      ))}
    </div>
  );
}
