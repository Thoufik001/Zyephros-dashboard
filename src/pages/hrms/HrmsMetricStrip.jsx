export function HrmsMetricStrip({ metrics }) {
  return (
    <div className="hrms-wire-metrics">
      {metrics.map(({ icon: Icon, label, note, value }) => (
        <article className="hrms-wire-metric" key={label}>
          <div className="hrms-wire-title">
            {Icon ? (
              <span className="hrms-wire-icon">
                <Icon aria-hidden="true" size={16} />
              </span>
            ) : null}
            <strong>{label}</strong>
          </div>
          <div className="hrms-wire-value">
            <b>{value}</b>
            <em>{note}</em>
          </div>
        </article>
      ))}
    </div>
  );
}
