export const hrStaff = [
  { name: "Asha Menon", id: "EMP-1048", department: "Nursing", role: "Senior Nurse", branch: "Westside", status: "Active", biometric: "Enrolled", onboarding: "Complete", shift: "Day" },
  { name: "Ravi Kumar", id: "EMP-1052", department: "Dialysis", role: "Technician", branch: "Riverside", status: "Onboarding", biometric: "Pending", onboarding: "Biometrics", shift: "Evening" },
  { name: "Nisha Varma", id: "EMP-1033", department: "ICU", role: "Nurse", branch: "Central", status: "Active", biometric: "Enrolled", onboarding: "Complete", shift: "Night" },
  { name: "Farah Ali", id: "EMP-1061", department: "Revenue Cycle", role: "Claims Executive", branch: "Central", status: "Onboarding", biometric: "Scheduled", onboarding: "Documents", shift: "Day" },
  { name: "Kabir Rao", id: "EMP-1019", department: "Operations", role: "Floor Manager", branch: "Eastview", status: "Active", biometric: "Enrolled", onboarding: "Complete", shift: "Day" },
  { name: "Leena Joseph", id: "EMP-1068", department: "Pharmacy", role: "Pharmacist", branch: "Northgate", status: "Offer", biometric: "Not started", onboarding: "Offer accepted", shift: "Rotational" },
];

export const hrDepartments = [
  { name: "Nursing", head: "Asha Menon", staff: 126, open: 8, attendance: 96, biometric: 94, risk: "Low" },
  { name: "Dialysis", head: "Ravi Kumar", staff: 38, open: 5, attendance: 91, biometric: 87, risk: "Watch" },
  { name: "ICU", head: "Nisha Varma", staff: 44, open: 6, attendance: 89, biometric: 92, risk: "Watch" },
  { name: "Operations", head: "Kabir Rao", staff: 52, open: 3, attendance: 95, biometric: 96, risk: "Low" },
  { name: "Revenue Cycle", head: "Farah Ali", staff: 31, open: 4, attendance: 93, biometric: 90, risk: "Low" },
  { name: "Pharmacy", head: "Leena Joseph", staff: 29, open: 2, attendance: 94, biometric: 88, risk: "Low" },
];

export const hrOnboardingStages = [
  { name: "Offer accepted", count: 14, owner: "Recruiting", status: "Low" },
  { name: "Documents", count: 9, owner: "HR Ops", status: "Watch" },
  { name: "Medical clearance", count: 6, owner: "Clinical admin", status: "Low" },
  { name: "Biometrics", count: 11, owner: "HRMS admin", status: "High" },
  { name: "System access", count: 7, owner: "IT support", status: "Watch" },
];

export const hrRoleTemplates = ["Senior Nurse", "Technician", "Floor Manager", "Claims Executive", "Pharmacist", "HR Executive"];
export const hrBranches = ["Westside", "Riverside", "Central", "Eastview", "Northgate"];

export const onboardingQueue = [
  { name: "Ravi Kumar", wait: "1d 6h", blocker: "Biometric slot", branch: "Riverside", status: "High" },
  { name: "Farah Ali", wait: "22h", blocker: "Document verification", branch: "Central", status: "Watch" },
  { name: "Leena Joseph", wait: "18h", blocker: "Offer to access", branch: "Northgate", status: "Watch" },
  { name: "Meera Nair", wait: "12h", blocker: "Manager approval", branch: "Westside", status: "Low" },
  { name: "Imran Shah", wait: "9h", blocker: "Badge issue", branch: "Eastview", status: "Low" },
];

export const liveCallouts = {
  absent: 15,
  updated: "Roster lock in 42m",
  pain: ["4 ICU nurses", "2 Dialysis techs", "1 night supervisor"],
};

export const rosterPulseKpis = [
  { label: "Roster Coverage", value: "91%", change: "12 clinical gaps", tone: "watch", icon: "coverage" },
  { label: "Critical Vacancies", value: "6", change: "ICU, Dialysis, RN", tone: "critical", icon: "vacancy" },
  { label: "Access Blockers", value: "3", change: "badges + biometrics", tone: "watch", icon: "access" },
  { label: "Credential Risks", value: "2", change: "expire this week", tone: "critical", icon: "credential" },
];

export const shiftCoverage = [
  { label: "Morning", window: "07:00-13:00", coverage: 98, gap: "No clinical gaps", ratio: "All ratios inside safe band", action: "Hold float pool", status: "Low" },
  { label: "Afternoon", window: "13:00-19:00", coverage: 94, gap: "Short 1 Dialysis Tech", ratio: "Bay load 1:5 vs safe 1:4", action: "Pull OPD float", status: "Watch" },
  { label: "Evening", window: "19:00-01:00", coverage: 91, gap: "Short 2 ICU Nurses", ratio: "Nurse ratio 1:7 vs safe 1:4", action: "Call RN pool", status: "High" },
  { label: "Night", window: "01:00-07:00", coverage: 89, gap: "Float pool needed", ratio: "Step-down ratio 1:6 vs safe 1:5", action: "Reassign ward nurse", status: "Watch" },
];

export const departmentCriticality = [
  { department: "ICU", branch: "Central", safeRatio: "1:4", actualRatio: "1:7", coverage: 82, gap: "2 nurses short", owner: "Nisha Varma", status: "High" },
  { department: "Dialysis", branch: "Riverside", safeRatio: "1:4", actualRatio: "1:5", coverage: 85, gap: "1 tech short", owner: "Ravi Kumar", status: "Watch" },
  { department: "Nursing", branch: "Central", safeRatio: "1:5", actualRatio: "1:6", coverage: 88, gap: "float pool thin", owner: "Asha Menon", status: "Watch" },
  { department: "Pharmacy", branch: "Northgate", safeRatio: "1:1 desk", actualRatio: "solo cover", coverage: 92, gap: "badge pending", owner: "Leena Joseph", status: "Low" },
];

export const onboardingAccessQueue = [
  { name: "Ravi Kumar", role: "Dialysis Technician", branch: "Riverside", blocker: "Biometric device offline", owner: "IT support", age: "1d 6h", action: "Nudge IT", status: "High" },
  { name: "Imran Shah", role: "Floor Manager", branch: "Eastview", blocker: "Access badge not issued", owner: "Facilities", age: "9h", action: "Issue badge", status: "Watch" },
  { name: "Farah Ali", role: "Claims Executive", branch: "Central", blocker: "Payroll approval pending", owner: "Finance", age: "22h", action: "Escalate finance", status: "Watch" },
];

export const complianceExceptions = [
  { name: "Nisha Varma", role: "ICU Nurse", branch: "Central", issue: "BLS renewal due", due: "2 days", action: "Book renewal", status: "High" },
  { name: "Asha Menon", role: "Senior Nurse", branch: "Westside", issue: "Medical license expires", due: "5 days", action: "Collect proof", status: "High" },
  { name: "Kabir Rao", role: "Floor Manager", branch: "Eastview", issue: "Background recheck", due: "This week", action: "Request HR docs", status: "Watch" },
];

export const accessSystems = [
  { label: "Biometric kiosks", value: "3/4 online", status: "Watch" },
  { label: "Access approvals", value: "7 pending", status: "Watch" },
  { label: "Credential expiry", value: "2 due", status: "High" },
  { label: "Role templates", value: "Ready", status: "Low" },
];

export const operationsLogRows = [
  ["Nursing", "Central", "6", "Short 2 ICU nurses for evening shift", "Nisha Varma", { value: "High", pill: true }],
  ["Dialysis", "Riverside", "5", "Biometric device offline for technician onboarding", "Ravi Kumar", { value: "Medium", pill: true }],
  ["Revenue Cycle", "Central", "4", "Claims executive access approval pending", "Farah Ali", { value: "Medium", pill: true }],
  ["Operations", "Eastview", "3", "One floor manager transfer awaiting approval", "Kabir Rao", { value: "Low", pill: true }],
  ["Pharmacy", "Northgate", "2", "Offer accepted, badge and access pending", "Leena Joseph", { value: "Low", pill: true }],
];

export const staffWireRows = [
  ["Ahmed Farouk", "ahmed.farouk@zyephr.health", "@ahmed.farouk", "Renal Diagnostics", "Staff", "Inactive"],
  ["Anita Rao", "anita.rao@zyephr.health", "@anita.rao", "Administration", "Owner", "Active"],
  ["Chen Wei", "chen.wei@zyephr.health", "@chen.wei", "Nephrology OPD", "Front Desk", "Active"],
  ["Diego Alves", "diego.alves@zyephr.health", "@diego.alves", "Dialysis Program", "No role", "Invited"],
  ["Elena Rossi", "elena.rossi@zyephr.health", "@elena.rossi", "Renal Diagnostics", "Doctor", "Active"],
  ["Fatima Bensalem", "fatima.b@zyephr.health", "@fatima.b", "Administration", "Manager", "Active"],
  ["Ines Moreau", "ines.moreau@zyephr.health", "@ines.moreau", "Renal ICU", "Nurse", "Active"],
  ["Ji-ho Park", "jiho.park@zyephr.health", "@ji-ho.park", "In-centre dialysis", "Nurse", "Active"],
  ["Lukas Schreiber", "lukas.s@zyephr.health", "@lukas.s", "-", "No role", "Invited"],
];

export const departmentWireRows = [
  ["Administration", "Operations and support", "ADMIN", "Anita Rao", "AR", "2", "Active"],
  ["Nephrology OPD", "Consults and chronic kidney care", "N-OPD", "Marcus Lee", "ML", "3", "Active"],
  ["Renal ICU", "High-acuity renal care", "RICU", "Sara Khan", "SK", "2", "Active"],
  ["Transplant Workup", "Evaluation and clearance pathway", "TXWK", "No head assigned", "", "0", "Inactive"],
  ["Dialysis Program", "HD, CAPD, and session operations", "DIAL", "No head assigned", "", "2", "Active"],
  ["Pharmacy", "Medication dispensing", "PHAR", "Naomi Tanaka", "NT", "2", "Active"],
  ["Renal Diagnostics", "Lab and renal imaging support", "RDX", "Elena Rossi", "ER", "3", "Active"],
];
