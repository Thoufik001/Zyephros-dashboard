import { FileText, UserPlus, UsersRound } from "lucide-react";
import { staffWireRows } from "../../data/hrmsData.js";
import { statusTone } from "../../utils/status.js";
import { HrmsMetricStrip } from "./HrmsMetricStrip.jsx";
import { HrmsTableToolbar } from "./HrmsTableToolbar.jsx";

function RoleTag({ role }) {
  return <span className="hrms-role-tag">{role}</span>;
}

function StatusTag({ status }) {
  return <span className={`hrms-wire-status hrms-wire-status--${statusTone(status)}`}>{status}</span>;
}

export function HrmsStaff() {
  return (
    <section className="hrms-wire-page">
      <HrmsMetricStrip
        metrics={[
          { icon: UsersRound, label: "Staff", note: "Total accounts", value: "15" },
          { icon: UsersRound, label: "Active", note: "Can sign in", value: "11" },
          { icon: UserPlus, label: "Invites", note: "Pending setup", value: "2" },
          { icon: FileText, label: "No role", note: "Needs access", value: "2" },
        ]}
      />
      <HrmsTableToolbar
        action={
          <button className="hrms-primary-action" data-v2-drawer="Add staff" data-v2-kind="Staff onboarding" data-v2-status="Open" type="button">
            <UserPlus aria-hidden="true" size={16} />
            Add staff
          </button>
        }
        filterTitle="Filter staff"
        searchPlaceholder="Search by name, username, or email"
      />
      <article className="hrms-wire-table-card">
        <div className="hrms-wire-table hrms-wire-table--staff">
          <b>Name</b>
          <b>Username</b>
          <b>Department</b>
          <b>Roles</b>
          <b>Status</b>
          <b />
          {staffWireRows.flatMap(([name, email, username, department, role, status]) => {
            const initials = name
              .split(" ")
              .map((part) => part[0])
              .join("")
              .slice(0, 2);

            return [
              <div className="hrms-person" key={`${name}-person`}>
                <span>{initials}</span>
                <strong>{name}</strong>
                <em>{email}</em>
              </div>,
              <span className="hrms-mono" key={`${name}-username`}>
                {username}
              </span>,
              <span key={`${name}-department`}>{department}</span>,
              <span key={`${name}-role`}>
                <RoleTag role={role} />
              </span>,
              <span key={`${name}-status`}>
                <StatusTag status={status} />
              </span>,
              <button className="hrms-row-arrow" data-v2-drawer={name} data-v2-kind="Staff" data-v2-status={status} key={`${name}-open`} type="button">
                &gt;
              </button>,
            ];
          })}
        </div>
      </article>
    </section>
  );
}
