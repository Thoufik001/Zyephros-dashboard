import {
  BarChart3,
  Building2,
  FileText,
  Fingerprint,
  LayoutDashboard,
  Stethoscope,
  UsersRound,
  WalletCards,
} from "lucide-react";

export const navigation = [
  { label: "Dashboard", path: "/overview?role=CEO", icon: LayoutDashboard, roles: ["CEO", "COO"] },
  { label: "Finance", path: "/finance?role=CEO", icon: WalletCards, roles: ["CEO"] },
  { label: "Branches", path: "/branches?role=CEO", icon: Building2, roles: ["CEO", "COO"] },
  { label: "Capacity & Flow", path: "/capacity-flow?role=COO", icon: UsersRound, roles: ["COO"] },
  { label: "Dialysis Program", path: "/dialysis-program?role=COO", icon: Stethoscope, roles: ["COO"] },
  { label: "Reports", path: "/reports?role=CEO", icon: FileText, roles: ["CEO", "COO"] },
];

export const hrmsNavigation = [
  { label: "Dashboard", tab: "overview", icon: LayoutDashboard },
  { label: "Staff", tab: "staff", icon: UsersRound },
  { label: "Departments", tab: "departments", icon: Building2 },
  { label: "Roles & Access", tab: "access", icon: Fingerprint },
  { label: "Reports", tab: "reports", icon: BarChart3, disabled: true },
];

export function hrefForHrmsTab(tab) {
  return `/hrms?role=HR_ADMIN&tab=${tab}`;
}
