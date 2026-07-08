export const financeTabs = [
  ["revenue-analysis", "Revenue Analysis"],
  ["ebitda-margin", "EBITDA / Margin"],
  ["payor-collections", "Payor & Collections"],
  ["patient-mix", "Patient Mix"],
  ["service-conversion", "Service Conversion"],
  ["revenue-drilldown", "Revenue Drilldown"],
];

export const revenueFields = ["Service Line", "Branch", "Doctor Name", "Patient Mix", "Year"];

export const revenueKpis = [
  ["Net Revenue", "₹43.0Cr", "+6.4% vs previous", "good"],
  ["Revenue per Visit", "₹5,388", "+2.1%", "good"],
  ["ARPP", "₹5,999", "On track", "good"],
  ["Lab Visit %", "23.5%", "Watch", "watch"],
];

export const branches = [
  { name: "Westside", revenue: 9.8, margin: 24.6, occupancy: 86.5, alos: 4.2, opd: 1280, dialysis: 91, staffing: 97, risk: "Low" },
  { name: "Eastview", revenue: 8.7, margin: 23.2, occupancy: 84.1, alos: 4.0, opd: 1160, dialysis: 88, staffing: 94, risk: "Low" },
  { name: "Northgate", revenue: 7.6, margin: 21.1, occupancy: 82.3, alos: 4.3, opd: 980, dialysis: 84, staffing: 91, risk: "Medium" },
  { name: "Southpoint", revenue: 6.1, margin: 19.6, occupancy: 85.0, alos: 4.6, opd: 840, dialysis: 79, staffing: 88, risk: "Low" },
  { name: "Central", revenue: 5.4, margin: 18.4, occupancy: 80.2, alos: 4.5, opd: 790, dialysis: 73, staffing: 82, risk: "High" },
  { name: "Riverside", revenue: 5.2, margin: 17.8, occupancy: 78.1, alos: 5.0, opd: 720, dialysis: 69, staffing: 79, risk: "High" },
];

export const departments = [
  { name: "In-centre dialysis", value: 48, female: 15, male: 29, unmapped: 4, visits: 1840, conversion: 82, growth: 8.7 },
  { name: "Nephrology OPD", value: 44, female: 13, male: 28, unmapped: 3, visits: 1280, conversion: 76, growth: 6.4 },
  { name: "Renal ICU", value: 41, female: 17, male: 21, unmapped: 3, visits: 1325, conversion: 79, growth: 5.9 },
  { name: "Kidney transplant workup", value: 32, female: 10, male: 20, unmapped: 2, visits: 760, conversion: 71, growth: 4.8 },
  { name: "Vascular access procedures", value: 27, female: 8, male: 17, unmapped: 2, visits: 610, conversion: 69, growth: 3.2 },
  { name: "Renal diagnostics", value: 24, female: 9, male: 13, unmapped: 2, visits: 890, conversion: 73, growth: 2.8 },
  { name: "Pharmacy & ESA therapy", value: 21, female: 12, male: 8, unmapped: 1, visits: 940, conversion: 67, growth: 2.1 },
  { name: "Home dialysis / CAPD", value: 17, female: 7, male: 9, unmapped: 1, visits: 680, conversion: 64, growth: 1.4 },
];

export const financeTrend = [
  { label: "Jan", revenue: 42, prev: -2.3, same: 8.7 },
  { label: "Feb", revenue: 41, prev: -11.5, same: -1.8 },
  { label: "Mar", revenue: 45, prev: 9.4, same: -17.8 },
  { label: "Apr", revenue: 45, prev: 26.3, same: 3.2 },
  { label: "May", revenue: 40, prev: -8.4, same: 9.9 },
  { label: "Jun", revenue: 43, prev: 6.9, same: -17.5 },
  { label: "Jul", revenue: 36, prev: -56.0, same: 3.6 },
  { label: "Aug", revenue: 45, prev: 0.2, same: -1.8 },
  { label: "Sep", revenue: 48, prev: -1.2, same: -0.3 },
  { label: "Oct", revenue: 47, prev: -11.5, same: -3.4 },
  { label: "Nov", revenue: 43, prev: -26.6, same: 13.5 },
  { label: "Dec", revenue: 49, prev: -14.5, same: -9.8 },
];

const doctors = ["Dr. Nair", "Dr. Menon", "Dr. Kapoor", "Dr. Iyer", "Dr. Shah", "Dr. Fernandes"].map((name, index) => ({
  name,
  value: [31, 28, 24, 19, 16, 12][index],
  female: [9, 8, 7, 6, 5, 4][index],
  male: [19, 17, 14, 11, 9, 7][index],
  unmapped: [3, 3, 3, 2, 2, 1][index],
  visits: [560, 510, 430, 380, 310, 260][index],
  conversion: [78, 74, 71, 69, 66, 63][index],
  growth: [7.2, 5.8, 4.6, 2.9, 1.4, -1.1][index],
  restricted: index > 2,
}));

const patientMix = ["Female 31-45", "Male 46-60", "Female 46-60", "Male 31-45", "Senior 60+", "New patients"].map((name, index) => ({
  name,
  value: [39, 34, 31, 26, 21, 18][index],
  female: [30, 3, 24, 4, 10, 8][index],
  male: [6, 28, 4, 19, 9, 7][index],
  unmapped: [3, 3, 3, 3, 2, 3][index],
  visits: [1320, 1140, 980, 880, 690, 720][index],
  conversion: [76, 72, 69, 68, 61, 64][index],
  growth: [6.9, 5.2, 4.4, 2.8, 1.1, 3.7][index],
}));

const years = ["2026 YTD", "2025", "2024", "2023", "2022", "2021"].map((name, index) => ({
  name,
  value: [286, 512, 466, 421, 386, 348][index],
  female: [98, 178, 162, 144, 132, 119][index],
  male: [171, 306, 278, 252, 232, 209][index],
  unmapped: [17, 28, 26, 25, 22, 20][index],
  visits: [11200, 21400, 19800, 18400, 17200, 16050][index],
  conversion: [78, 75, 73, 71, 68, 65][index],
  growth: [8.7, 6.1, 4.9, 3.7, 2.2, 1.4][index],
}));

export const contributionRowsByField = {
  "Service Line": departments,
  Branch: branches.map((branch) => ({
    name: branch.name,
    value: branch.revenue * 5,
    female: branch.revenue * 1.6,
    male: branch.revenue * 2.9,
    unmapped: branch.revenue * 0.5,
    visits: branch.opd,
    conversion: branch.dialysis,
    growth: branch.margin - 16,
  })),
  "Doctor Name": doctors,
  "Patient Mix": patientMix,
  Year: years,
};

export const performanceRowsByField = {
  "Service Line": [
    ["In-centre dialysis", "₹17Cr", "19%", "+8.4%", "38%", "Healthy"],
    ["Nephrology OPD", "₹16Cr", "17%", "+6.1%", "34%", "Healthy"],
    ["Renal ICU", "₹15Cr", "16%", "-2.4%", "29%", "Watch"],
    ["Kidney transplant workup", "₹12Cr", "13%", "+3.2%", "31%", "Healthy"],
    ["Vascular access procedures", "₹9.7Cr", "11%", "-4.1%", "27%", "Risk"],
  ],
  Branch: [
    ["Indiranagar", "₹18.6Cr", "31%", "+7.2%", "36%", "Healthy"],
    ["Whitefield", "₹14.2Cr", "24%", "-3.8%", "28%", "Watch"],
    ["Jayanagar", "₹12.8Cr", "22%", "+4.9%", "33%", "Healthy"],
    ["Hebbal", "₹9.8Cr", "17%", "-5.6%", "24%", "Risk"],
  ],
  "Doctor Name": [
    ["Dr. Arvind Rao", "₹8.4Cr", "14%", "+5.1%", "35%", "Healthy"],
    ["Dr. Meera Iyer", "₹7.8Cr", "13%", "+3.6%", "33%", "Healthy"],
    ["Dr. Sanjay Kulkarni", "₹6.9Cr", "11%", "-2.8%", "29%", "Watch"],
    ["Dr. Nisha Menon", "₹5.6Cr", "9%", "+2.4%", "31%", "Healthy"],
    ["Dr. Farhan Ali", "₹4.8Cr", "8%", "-4.2%", "26%", "Risk"],
  ],
  "Patient Mix": [
    ["Repeat CKD cohort", "₹19Cr", "32%", "+6.9%", "37%", "Healthy"],
    ["New OPD patients", "₹13Cr", "22%", "+4.2%", "31%", "Healthy"],
    ["Dialysis maintenance patients", "₹12Cr", "20%", "+7.1%", "36%", "Healthy"],
    ["Insurance IPD patients", "₹9Cr", "15%", "-1.9%", "28%", "Watch"],
    ["Cash OPD patients", "₹6Cr", "10%", "-3.4%", "25%", "Risk"],
  ],
  Year: [
    ["2022", "₹312Cr", "18%", "+8.1%", "29%", "Healthy"],
    ["2023", "₹356Cr", "21%", "+14.1%", "31%", "Healthy"],
    ["2024", "₹402Cr", "24%", "+12.9%", "33%", "Healthy"],
    ["2025", "₹438Cr", "26%", "+9.0%", "34%", "Healthy"],
    ["2026 YTD", "₹241Cr", "14%", "+6.4%", "35%", "Watch"],
  ],
};

export const financeTabContent = {
  "ebitda-margin": {
    metrics: [
      { label: "EBITDA Margin", value: "22.4%", delta: "+1.2pp" },
      { label: "Network EBITDA", value: "₹9.6Cr", delta: "+₹0.8Cr" },
      { label: "Target Gap", value: "+0.4pp", delta: "Above plan" },
      { label: "Cost Pressure", value: "Medium", delta: "2 branches" },
    ],
    columns: ["Branch", "Revenue", "EBITDA", "EBITDA Margin", "Margin vs Target", "Cost Pressure", "Risk"],
    rows: [
      ["Westside", "₹9.8Cr", "₹2.4Cr", "24.6%", "+2.6pp", "Low", "Low"],
      ["Eastview", "₹8.7Cr", "₹2.0Cr", "23.2%", "+1.2pp", "Low", "Low"],
      ["Northgate", "₹7.6Cr", "₹1.6Cr", "21.1%", "-0.9pp", "Consumables", "Medium"],
      ["Central", "₹5.4Cr", "₹1.0Cr", "18.4%", "-3.6pp", "Staffing", "High"],
    ],
  },
  "payor-collections": {
    metrics: [
      { label: "Pending Exposure", value: "₹6.8Cr", delta: "-₹0.4Cr" },
      { label: "90+ Aging", value: "₹1.1Cr", delta: "High focus" },
      { label: "Collection Risk", value: "Medium", delta: "2 branches" },
      { label: "Expected Closure", value: "11d", delta: "Target 9d" },
    ],
    columns: ["Branch", "Payor", "Pending Amount", "Aging Bucket", "Collection Risk", "Expected Closure", "Status"],
    rows: [
      ["Central", "TPA", "₹1.2Cr", "90+", "High", "18 Jun", "High"],
      ["Riverside", "Government", "₹0.8Cr", "61-90", "Medium", "21 Jun", "Watch"],
      ["Northgate", "Insurance", "₹0.6Cr", "31-60", "Medium", "16 Jun", "Medium"],
      ["Westside", "Cash", "₹0.2Cr", "0-30", "Low", "12 Jun", "Low"],
    ],
  },
  "patient-mix": {
    metrics: [
      { label: "Total Patients", value: "18,420", delta: "+5.1%" },
      { label: "New Patients", value: "6,210", delta: "+8.4%" },
      { label: "Repeat Patients", value: "12,210", delta: "+3.0%" },
      { label: "Repeat Revenue", value: "62%", delta: "Healthy" },
    ],
    columns: ["Segment", "Patients", "Revenue", "Revenue per Patient", "Repeat %", "Growth", "Status"],
    rows: [
      ["Female 31-45", "3,820", "₹8.4Cr", "₹22k", "69%", "+7.2%", "Low"],
      ["Male 46-60", "3,140", "₹7.9Cr", "₹25k", "63%", "+5.1%", "Low"],
      ["Senior 60+", "2,280", "₹6.1Cr", "₹27k", "58%", "+2.4%", "Watch"],
    ],
  },
  "service-conversion": {
    metrics: [
      { label: "Total Visits", value: "28,420", delta: "+4.2%" },
      { label: "Lab Conversion", value: "23.5%", delta: "+1.8pp" },
      { label: "Pharmacy Conversion", value: "31.2%", delta: "+2.4pp" },
      { label: "Revenue Impact", value: "₹2.4Cr", delta: "Open upside" },
    ],
    columns: ["Service Line", "OPD Visits", "Lab Orders", "Drug Orders", "Lab Conversion %", "Pharmacy Conversion %", "Revenue Impact", "Status"],
    rows: [
      ["Nephrology OPD", "6,420", "1,860", "2,780", "29%", "43%", "₹82L", "Low"],
      ["In-centre dialysis", "3,240", "1,010", "1,200", "31%", "37%", "₹64L", "Low"],
      ["Renal ICU", "2,820", "680", "790", "24%", "28%", "₹41L", "Watch"],
      ["Kidney transplant workup", "3,180", "570", "890", "18%", "28%", "₹38L", "High"],
    ],
  },
};
