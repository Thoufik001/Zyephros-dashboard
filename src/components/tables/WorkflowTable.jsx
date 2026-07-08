import { statusTone } from "../../utils/status.js";

function cellValue(cell) {
  return typeof cell === "object" && cell !== null ? cell.value : cell;
}

export function WorkflowTable({ columns, rows, summary, title }) {
  return (
    <article className="v2-panel v2-workflow-panel">
      <div className="v2-panel-heading">
        <div>
          <span>{title}</span>
          <strong>{summary}</strong>
        </div>
      </div>
      <div className="v2-workflow-table" style={{ "--workflow-columns": columns.length }}>
        {columns.map((column) => (
          <b key={column}>{column}</b>
        ))}
        {rows.flatMap((row, rowIndex) =>
          row.map((cell, index) => {
            const value = cellValue(cell);
            const note = typeof cell === "object" && cell !== null ? cell.note : "";
            const status = typeof cell === "object" && cell !== null ? cell.status : "";
            const drawer = typeof cell === "object" && cell !== null ? cell.drawer || value : value;

            return (
              <button
                className={`v2-workflow-cell ${index === 0 ? "is-primary" : ""} ${
                  status ? `v2-workflow-cell--${statusTone(status)}` : ""
                }`}
                data-v2-drawer={drawer}
                data-v2-kind={title}
                data-v2-status={status || "Open"}
                key={`${rowIndex}-${index}-${value}`}
                type="button"
              >
                <strong>{value}</strong>
                {note ? <em>{note}</em> : null}
              </button>
            );
          }),
        )}
      </div>
    </article>
  );
}
