import { AppShell } from "../layout/AppShell.jsx";
import { BranchesPage } from "../pages/branches/BranchesPage.jsx";
import { CapacityFlowPage } from "../pages/capacityFlow/CapacityFlowPage.jsx";
import { DialysisProgramPage } from "../pages/dialysisProgram/DialysisProgramPage.jsx";
import { FinancePage } from "../pages/finance/FinancePage.jsx";
import { CeoOverview } from "../pages/overview/CeoOverview.jsx";
import { CooOverview } from "../pages/overview/CooOverview.jsx";
import { HrmsAccess } from "../pages/hrms/HrmsAccess.jsx";
import { HrmsDashboard } from "../pages/hrms/HrmsDashboard.jsx";
import { HrmsDepartments } from "../pages/hrms/HrmsDepartments.jsx";
import { HrmsStaff } from "../pages/hrms/HrmsStaff.jsx";
import { NotFoundPage } from "../pages/notFound/NotFoundPage.jsx";
import { ReportsPage } from "../pages/reports/ReportsPage.jsx";
import { normalizeRole } from "../config/roles.js";
import { financeTabs } from "../data/financeData.js";

const hrmsPageByTab = {
  overview: HrmsDashboard,
  staff: HrmsStaff,
  departments: HrmsDepartments,
  access: HrmsAccess,
};

const hrmsBreadcrumbByTab = {
  overview: ["HRMS", "Dashboard"],
  staff: ["HRMS", "Staff"],
  departments: ["HRMS", "Departments"],
  access: ["HRMS", "Roles & Access"],
};

function currentLocation() {
  const location = window.location;
  const params = new URLSearchParams(location.search);

  return {
    path: location.pathname,
    role: params.get("role") || "CEO",
    tab: params.get("tab") || "overview",
  };
}

function normalizeHrmsTab(tab) {
  return hrmsPageByTab[tab] ? tab : "overview";
}

function financeBreadcrumb(tab) {
  const normalized = financeTabs.some(([id]) => id === tab) ? tab : "revenue-analysis";
  const label = financeTabs.find(([id]) => id === normalized)?.[1] || "Revenue Analysis";
  return ["Finance", label];
}

export function App() {
  const location = currentLocation();
  const role = normalizeRole(location.role);

  if (location.path.startsWith("/hrms")) {
    const tab = normalizeHrmsTab(location.tab);
    const Page = hrmsPageByTab[tab];

    return (
      <AppShell activePath="/hrms" activeTab={tab} breadcrumbs={hrmsBreadcrumbByTab[tab]} role="HR_ADMIN" title="HRMS">
        <Page />
      </AppShell>
    );
  }

  if (location.path === "/overview" || location.path === "/") {
    const isCoo = role === "COO";
    const Page = isCoo ? CooOverview : CeoOverview;

    return (
      <AppShell activePath="/overview" breadcrumbs={["Dashboard"]} role={isCoo ? "COO" : "CEO"} title="Dashboard">
        <Page />
      </AppShell>
    );
  }

  if (location.path === "/finance" && role === "CEO") {
    return (
      <AppShell activePath="/finance" breadcrumbs={financeBreadcrumb(location.tab)} role="CEO" title="Finance">
        <FinancePage />
      </AppShell>
    );
  }

  if (location.path === "/branches" && ["CEO", "COO"].includes(role)) {
    return (
      <AppShell activePath="/branches" breadcrumbs={["Branches"]} role={role} title="Branches">
        <BranchesPage role={role} />
      </AppShell>
    );
  }

  if (location.path === "/capacity-flow" && role === "COO") {
    return (
      <AppShell activePath="/capacity-flow" breadcrumbs={["Capacity & Flow"]} role="COO" title="Capacity & Flow">
        <CapacityFlowPage />
      </AppShell>
    );
  }

  if (location.path === "/dialysis-program" && role === "COO") {
    return (
      <AppShell activePath="/dialysis-program" breadcrumbs={["Dialysis Program"]} role="COO" title="Dialysis Program">
        <DialysisProgramPage />
      </AppShell>
    );
  }

  if (location.path === "/reports" && ["CEO", "COO"].includes(role)) {
    return (
      <AppShell activePath="/reports" breadcrumbs={["Reports"]} role={role} title="Reports">
        <ReportsPage role={role} />
      </AppShell>
    );
  }

  return (
    <AppShell activePath={location.path} breadcrumbs={["Page not found"]} role={role} title="Page not found">
      <NotFoundPage role={role} />
    </AppShell>
  );
}
