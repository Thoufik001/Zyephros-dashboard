export const roleProfiles = {
  CEO: {
    id: "CEO",
    name: "Marcus Reed",
    label: "CEO · All Branches",
    shortLabel: "CEO",
    avatar: "/assets/people/ceo-marcus-reed.png",
    href: "/overview?role=CEO",
  },
  COO: {
    id: "COO",
    name: "Elena Morris",
    label: "COO · Operations",
    shortLabel: "COO",
    avatar: "/assets/people/coo-elena-morris.png",
    href: "/overview?role=COO",
  },
  HR_ADMIN: {
    id: "HR_ADMIN",
    name: "Daniel Kapoor",
    label: "HR Manager",
    shortLabel: "HR",
    avatar: "/assets/people/hr-manager-daniel-kapoor.png",
    href: "/hrms?role=HR_ADMIN&tab=overview",
  },
};

export const roleProfileList = [roleProfiles.CEO, roleProfiles.COO, roleProfiles.HR_ADMIN];

export function normalizeRole(role) {
  return roleProfiles[role] ? role : "CEO";
}

export function roleProfile(role) {
  return roleProfiles[normalizeRole(role)];
}
