import { Building2, ShieldCheck, UserPlus, UsersRound } from "lucide-react";
import { departmentWireRows } from "../../data/hrmsData.js";
import { statusTone } from "../../utils/status.js";
import { HrmsMetricStrip } from "./HrmsMetricStrip.jsx";
import { HrmsTableToolbar } from "./HrmsTableToolbar.jsx";

function StatusTag({ status }) {
  return <span className={`hrms-wire-status hrms-wire-status--${statusTone(status)}`}>{status}</span>;
}

export function HrmsDepartments() {
  return (
    <section className="hrms-wire-page">
      <HrmsMetricStrip
        metrics={[
          { icon: Building2, label: "Total departments", note: "6 active - 1 inactive", value: "7" },
          { icon: UsersRound, label: "Operational units", note: "Available for staff assignment", value: "6" },
          { icon: ShieldCheck, label: "Head coverage", note: "1 active unit needs a head", value: "5/6" },
          { icon: UserPlus, label: "Staffing gaps", note: "All active units have staff", value: "0" },
        ]}
      />
      <HrmsTableToolbar
        action={
          <button className="hrms-primary-action" data-v2-drawer="Add department" data-v2-kind="Department setup" data-v2-status="Open" type="button">
            <UserPlus aria-hidden="true" size={16} />
            Add department
          </button>
        }
        filterTitle="Filter departments"
        filters={[
          { label: "Status", value: "All status (7)" },
          { label: "Head", value: "All heads (7)" },
          { label: "Department", value: "Search department", search: true },
          { label: "Created date", value: "All dates" },
        ]}
        searchPlaceholder="Search departments"
      />
      <article className="hrms-wire-table-card">
        <div className="hrms-wire-table hrms-wire-table--departments">
          <b>Department</b>
          <b>Code</b>
          <b>Head of department</b>
          <b>Staff</b>
          <b>Status</b>
          <b />
          {departmentWireRows.flatMap(([name, note, code, head, initials, staff, status]) => [
            <div className="hrms-dept-name" key={`${name}-name`}>
              <strong>{name}</strong>
              <em>{note}</em>
            </div>,
            <span className="hrms-mono" key={`${name}-code`}>
              {code}
            </span>,
            <span className={head === "No head assigned" ? "hrms-no-head" : "hrms-head"} key={`${name}-head`}>
              {initials ? <i>{initials}</i> : null}
              {head}
            </span>,
            <span key={`${name}-staff`}>{staff}</span>,
            <span key={`${name}-status`}>
              <StatusTag status={status} />
            </span>,
            <button className="hrms-row-arrow" data-v2-drawer={name} data-v2-kind="Department" data-v2-status={status} key={`${name}-open`} type="button">
              &gt;
            </button>,
          ])}
        </div>
        <div className="hrms-wire-table-footer">
          <span>Showing 1-7 of 7 departments</span>
          <span>
            <button type="button">&lt;</button> 1 / 1 <button type="button">&gt;</button>
          </span>
        </div>
      </article>
    </section>
  );
}
