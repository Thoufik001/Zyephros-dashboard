import { statusTone } from "../../utils/status.js";

export function StatusPill({ status }) {
  return <span className={`v2-status v2-status--${statusTone(status)}`}>{status}</span>;
}
