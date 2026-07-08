import { hrefForHrmsTab, hrmsNavigation, navigation } from "../config/navigation.js";
import { ProfileMenu } from "./ProfileMenu.jsx";

function Logo() {
  return (
    <a className="clean-brand" href="/overview?role=CEO" aria-label="ZyephrOS">
      <span className="clean-brand-mark" aria-hidden="true" />
      <strong>ZyephrOS</strong>
    </a>
  );
}

function hrefForPersonaRoute(item, role) {
  const url = new URL(item.path, window.location.origin);
  const routeRole = item.roles.includes(role) ? role : item.roles[0];
  url.searchParams.set("role", routeRole);
  return `${url.pathname}?${url.searchParams.toString()}`;
}

export function Sidebar({ activePath, activeTab, role }) {
  const isHrms = role === "HR_ADMIN";
  const items = isHrms ? hrmsNavigation : navigation.filter((item) => item.roles.includes(role));

  return (
    <aside className="clean-sidebar" aria-label="Primary navigation">
      <Logo />
      <nav className={isHrms ? "hrms-sidebar-nav clean-sidebar-nav" : "clean-sidebar-nav"}>
        {items.map((item) => {
          const Icon = item.icon;
          const href = isHrms ? hrefForHrmsTab(item.tab) : hrefForPersonaRoute(item, role);
          const active = isHrms ? activeTab === item.tab : activePath === new URL(item.path, window.location.origin).pathname;

          return (
            <a
              aria-current={active ? "page" : undefined}
              className={isHrms ? "hrms-sidebar-link clean-sidebar-link" : "clean-sidebar-link"}
              data-v2-sidebar-active={active ? "true" : undefined}
              href={item.disabled ? hrefForHrmsTab(activeTab) : href}
              key={item.label}
            >
              <Icon aria-hidden="true" className={isHrms ? "hrms-sidebar-icon" : undefined} size={18} />
              <span>{item.label}</span>
            </a>
          );
        })}
      </nav>
      <ProfileMenu role={role} />
    </aside>
  );
}
