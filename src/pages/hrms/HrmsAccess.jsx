import { Fingerprint, ShieldCheck, UserCheck, UsersRound } from "lucide-react";
import { WorkflowTable } from "../../components/tables/WorkflowTable.jsx";
import { ActionQueue } from "../../components/ui/ActionQueue.jsx";
import { hrDepartments, hrStaff } from "../../data/hrmsData.js";
import { HrmsMetricStrip } from "./HrmsMetricStrip.jsx";

function metrics() {
  const active = hrStaff.filter((staff) => staff.status === "Active").length;
  const onboarding = hrStaff.filter((staff) => /onboarding|offer/i.test(staff.status)).length;
  const biometricPending = hrStaff.filter((staff) => !/enrolled/i.test(staff.biometric)).length;
  const openRoles = hrDepartments.reduce((sum, department) => sum + department.open, 0);

  return [
    { icon: UserCheck, label: "Active Staff", value: String(active), note: "Credentialed" },
    { icon: UsersRound, label: "Open Roles", value: String(openRoles), note: "Across departments" },
    { icon: ShieldCheck, label: "Onboarding", value: String(onboarding), note: "In progress" },
    { icon: Fingerprint, label: "Biometric Pending", value: String(biometricPending), note: "Needs HRMS action" },
  ];
}

export function HrmsAccess() {
  return (
    <section className="v2-foundation hrms-access-page">
      <HrmsMetricStrip metrics={metrics()} />
      <div className="v2-workspace-split">
        <WorkflowTable
          columns={["Area", "Permission", "Scope", "Restricted From", "Status"]}
          rows={[
            ["Staff directory", "Create / edit", "Employee profile, branch, department, shift", "Payroll amounts", { value: "Allowed", status: "Low" }],
            ["Departments", "Manage", "Department heads, open roles, staffing targets", "Finance margins", { value: "Allowed", status: "Low" }],
            ["Onboarding", "Run workflow", "Documents, medical clearance, access requests", "Patient records", { value: "Allowed", status: "Low" }],
            ["Biometrics", "Enroll / update", "Consent, device station, enrollment status", "Raw biometric data export", { value: "Controlled", status: "Watch" }],
            ["Dashboard", "View", "HRMS and HR reports only", "CEO/COO pages", { value: "Restricted", status: "High" }],
          ]}
          summary="HR Manager can manage staff and departments, but cannot access finance, operations, or clinical performance workspaces."
          title="HRMS RBAC Matrix"
        />
        <ActionQueue
          items={[
            { label: "Allowed", title: "Manage staff records", detail: "Create employees, update departments, and assign shifts.", status: "Low" },
            { label: "Allowed", title: "Complete onboarding", detail: "Track documents, clearance, access request, and biometrics.", status: "Low" },
            { label: "Restricted", title: "No finance or patient dashboards", detail: "CEO, COO, and clinical/finance pages redirect to HRMS.", status: "High" },
          ]}
          summary="RBAC decisions for this HR Manager role."
          title="Access Controls"
        />
      </div>
    </section>
  );
}
