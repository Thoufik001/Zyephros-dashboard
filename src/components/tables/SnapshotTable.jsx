import { StatusPill } from "../ui/StatusPill.jsx";

function SnapshotCell({ cell }) {
  if (cell && typeof cell === "object") {
    if (cell.pill) return <StatusPill status={cell.value} />;

    return (
      <span className="ceo-scan-metric-cell">
        <span>{cell.value}</span>
        {cell.delta ? <em className={`ceo-scan-delta ${String(cell.delta).trim().startsWith("-") ? "is-down" : "is-up"}`}>{cell.delta}</em> : null}
      </span>
    );
  }

  return cell;
}

export function SnapshotTable({ actionHref = "", actionLabel = "View breakdown", headers, rows, summary = "", title }) {
  return (
    <article className="ceo-scan-card ceo-scan-card--table">
      <div className="ceo-scan-card-head">
        <div>
          <span>{title}</span>
          {summary ? <strong>{summary}</strong> : null}
        </div>
        {actionHref ? (
          <a className="dashboard-link-action" href={actionHref}>
            {actionLabel} <span aria-hidden="true">→</span>
          </a>
        ) : null}
      </div>
      <div className="ceo-scan-table-wrap">
        <table className="ceo-scan-table">
          <thead>
            <tr>
              {headers.map((header) => (
                <th key={header}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td key={`${rowIndex}-${cellIndex}`}>
                    <SnapshotCell cell={cell} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </article>
  );
}
