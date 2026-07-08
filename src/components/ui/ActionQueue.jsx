import { statusTone } from "../../utils/status.js";
import { StatusPill } from "./StatusPill.jsx";

export function ActionQueue({ items, summary, title }) {
  return (
    <article className="v2-panel v2-action-queue-panel">
      <div className="v2-panel-heading">
        <div>
          <span>{title}</span>
          <strong>{summary}</strong>
        </div>
      </div>
      <div className="v2-action-queue">
        {items.map((item) => (
          <button
            className={`v2-action-item v2-action-item--${statusTone(item.status || "Open")}`}
            data-v2-drawer={item.title}
            data-v2-kind={title}
            data-v2-status={item.status || "Open"}
            key={`${item.label}-${item.title}`}
            type="button"
          >
            <span>
              <em>{item.label}</em>
              <strong>{item.title}</strong>
            </span>
            <p>{item.detail}</p>
            <StatusPill status={item.status || "Open"} />
          </button>
        ))}
      </div>
    </article>
  );
}
