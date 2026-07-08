export const monthLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export const ceoRevenueTrend = monthLabels.map((month, index) => ({
  month,
  current: [4.5, 5.4, 5.2, 6.1, 5.6, 6.4, 6.0, 7.0, 6.6, 7.4, 6.9, 7.8][index],
  previous: [3.9, 4.4, 4.2, 4.9, 4.7, 5.3, 5.0, 5.7, 5.6, 6.1, 5.8, 6.4][index],
  target: 5.6,
}));

export const serviceLineMix = [
  { name: "Dialysis", value: 34, revenue: 24.0, color: "#32b7c8" },
  { name: "Transplant", value: 22, revenue: 15.5, color: "#ff765e" },
  { name: "Nephrology IPD", value: 18, revenue: 12.7, color: "#f4b451" },
  { name: "Procedures", value: 14, revenue: 9.9, color: "#e77aae" },
  { name: "OPD", value: 12, revenue: 8.5, color: "#2fbf7f" },
];

export const capacityEfficiency = [
  { day: "Mon", occupancy: 81, alos: 3.9 },
  { day: "Tue", occupancy: 83, alos: 4.2 },
  { day: "Wed", occupancy: 85, alos: 4.5 },
  { day: "Thu", occupancy: 88, alos: 4.9 },
  { day: "Fri", occupancy: 84, alos: 4.3 },
  { day: "Sat", occupancy: 83, alos: 4.0 },
  { day: "Sun", occupancy: 86, alos: 4.6 },
];

export const growthDemand = monthLabels.map((month, index) => ({
  month,
  admissions: [1128, 1104, 1196, 1174, 1168, 1162, 1184, 1192, 1128, 1190, 1154, 1208][index],
  conversion: [38, 40, 39, 41, 39, 42, 40, 42, 39, 43, 41, 44][index],
}));

export const networkRows = [
  ["Whitefield", { value: "₹29.6Cr", delta: "+3.0%" }, { value: "23.0%", delta: "+1.2pp" }, { value: "91.2%", delta: "+2.8pp" }, { value: "₹32,000", delta: "+3.4%" }, "43/45", { value: "Low", pill: true }],
  ["Jayanagar", { value: "₹17.8Cr", delta: "+5.0%" }, { value: "21.8%", delta: "+0.0pp" }, { value: "78.4%", delta: "+1.1pp" }, { value: "₹32,000", delta: "+2.8%" }, "42/44", { value: "Medium", pill: true }],
  ["Hebbal", { value: "₹12.5Cr", delta: "+10.7%" }, { value: "20.8%", delta: "-1.0pp" }, { value: "58.6%", delta: "-2.4pp" }, { value: "₹32,000", delta: "+1.6%" }, "40/42", { value: "High", pill: true }],
  ["Electronic City", { value: "₹10.5Cr", delta: "+8.0%" }, { value: "19.5%", delta: "-2.3pp" }, { value: "87.8%", delta: "-5.7pp" }, { value: "₹32,000", delta: "-0.9%" }, "38/40", { value: "Medium", pill: true }],
];

export const cooActionRows = [
  ["Whitefield", "ICU", "Bed pressure above 90%", "12 beds at risk", "Asha Menon", "2h", "Open surge bay", { value: "High", pill: true }],
  ["Jayanagar", "Discharge", "18 files past SLA", "Delayed bed turns", "Ravi Kumar", "4h", "Escalate summaries", { value: "Medium", pill: true }],
  ["Hebbal", "Dialysis", "3 session slots uncovered", "Utilization gap", "Nisha Varma", "Today", "Move float tech", { value: "Medium", pill: true }],
  ["Electronic City", "Pharmacy", "Fill rate stable", "No blocker", "Kabir Rao", "Live", "Monitor", { value: "Low", pill: true }],
];

export const bedHeatmapRows = [
  { branch: "Whitefield", icu: 92, dialysis: 86, ward: 81, status: "High" },
  { branch: "Jayanagar", icu: 84, dialysis: 78, ward: 76, status: "Watch" },
  { branch: "Hebbal", icu: 88, dialysis: 73, ward: 68, status: "Watch" },
  { branch: "Electronic City", icu: 79, dialysis: 82, ward: 74, status: "Low" },
];
