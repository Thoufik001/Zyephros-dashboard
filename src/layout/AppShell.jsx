import { Sidebar } from "./Sidebar.jsx";
import { Topbar } from "./Topbar.jsx";

export function AppShell({ activePath, activeTab, breadcrumbs, children, role, title }) {
  return (
    <div className="clean-app-root" data-clean-role={role}>
      <Sidebar activePath={activePath} activeTab={activeTab} role={role} />
      <main className="clean-main-shell">
        <Topbar breadcrumbs={breadcrumbs} role={role} title={title} />
        <div className="clean-main-content">{children}</div>
      </main>
    </div>
  );
}
