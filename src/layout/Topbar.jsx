import { useState } from "react";
import { Bell, Building2, CalendarDays, ChevronDown, Droplets, Search, TrendingUp, Users, X } from "lucide-react";

const alertItems = [
  {
    action: "View beds",
    detail: "47.1% occupancy · 4.30d ALOS",
    priority: "High priority",
    title: "Bed pressure review at Whitefield",
    tone: "high",
  },
  {
    action: "Open queue",
    detail: "16.1m ED door-to-doctor",
    priority: "High priority",
    title: "Discharge flow watch at Jayanagar",
    tone: "high",
  },
  {
    action: "View shifts",
    detail: "96.2% completion · 7.3% complications",
    priority: "Medium",
    title: "Dialysis utilization watch at Electronic City",
    tone: "medium",
  },
  {
    action: "View ED",
    detail: "1,800 ED visits",
    priority: "Medium",
    title: "Emergency volume watch, Hebbal",
    tone: "medium",
  },
  {
    action: "Reassign",
    detail: "3 idle slots across 2 branches",
    priority: "Low",
    title: "OT slot underbooked tomorrow",
    tone: "low",
  },
];

const updateItems = [
  {
    detail: "MTD performance · 4m ago",
    icon: TrendingUp,
    title: "Revenue tracking 4.2% above target",
    tone: "teal",
  },
  {
    detail: "92.1% occupancy · 12m ago",
    icon: Users,
    title: "Bed pressure review at Whitefield",
    tone: "amber",
  },
  {
    detail: "Shift handover · 38m ago",
    icon: Droplets,
    title: "Riverside dialysis missed 2 sessions",
    tone: "red",
  },
];

function NotificationDrawer({ onClose, tab, setTab }) {
  const items = tab === "alerts" ? alertItems : updateItems;

  return (
    <div className="notify-layer" role="presentation">
      <button aria-label="Close notifications" className="notify-scrim" onClick={onClose} type="button" />
      <aside aria-label="Executive watchlist" aria-modal="true" className="notify-drawer" role="dialog">
        <header className="notify-header">
          <h2>Executive watchlist</h2>
          <button aria-label="Close Executive watchlist" onClick={onClose} type="button">
            <X aria-hidden="true" size={20} />
          </button>
        </header>
        <div className="notify-tabs segmented-control" role="tablist">
          <button aria-selected={String(tab === "alerts")} className={tab === "alerts" ? "is-active" : ""} onClick={() => setTab("alerts")} role="tab" type="button">
            Alerts <strong>5</strong>
          </button>
          <button aria-selected={String(tab === "updates")} className={tab === "updates" ? "is-active" : ""} onClick={() => setTab("updates")} role="tab" type="button">
            Updates <strong>0</strong>
          </button>
        </div>
        <div className={`notify-list ${tab === "updates" ? "notify-list--updates" : ""}`}>
          {tab === "updates"
            ? items.map((item) => {
                const Icon = item.icon;
                return (
                  <button className="notify-update-card" data-tone={item.tone} key={item.title} type="button">
                    <span className="notify-update-icon">
                      <Icon aria-hidden="true" size={19} />
                    </span>
                    <span>
                      <strong>{item.title}</strong>
                      <em>{item.detail}</em>
                    </span>
                  </button>
                );
              })
            : items.map((item) => (
                <button className="notify-card" data-tone={item.tone} key={item.title} type="button">
                  <span className="notify-priority">
                    <i />
                    {item.priority}
                  </span>
                  <strong>{item.title}</strong>
                  <em>{item.detail}</em>
                  <span className="notify-action ceo-signal-cta">
                    {item.action} <span aria-hidden="true">→</span>
                  </span>
                </button>
              ))}
        </div>
      </aside>
    </div>
  );
}

export function Topbar({ breadcrumbs, role, title }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [notificationTab, setNotificationTab] = useState("alerts");

  return (
    <header className="clean-topbar">
      <div>
        {breadcrumbs?.length ? (
          <nav aria-label="Breadcrumb" className="clean-breadcrumb">
            {breadcrumbs.map((crumb, index) => (
              <span aria-current={index === breadcrumbs.length - 1 ? "page" : undefined} key={`${crumb}-${index}`}>
                {crumb}
              </span>
            ))}
          </nav>
        ) : (
          <nav aria-label="Breadcrumb" className="clean-breadcrumb">
            <span aria-current="page">{title || "Dashboard"}</span>
          </nav>
        )}
      </div>
      <div className="clean-topbar-actions">
        <button type="button">
          <Building2 aria-hidden="true" size={15} />
          <span>All Network Branches</span>
          <ChevronDown aria-hidden="true" size={14} />
        </button>
        <button type="button">
          <CalendarDays aria-hidden="true" size={15} />
          <span>Last 30 days</span>
          <ChevronDown aria-hidden="true" size={14} />
        </button>
        <label className="clean-search global-search-control">
          <Search aria-hidden="true" size={16} />
          <input aria-label="Search" placeholder="Search..." type="search" />
          <kbd>
            <span aria-hidden="true">⌘</span> K
          </kbd>
        </label>
        <button aria-expanded={drawerOpen} aria-label="Notifications" className="clean-bell" onClick={() => setDrawerOpen(true)} type="button">
          <Bell aria-hidden="true" size={16} />
          <i>5</i>
        </button>
      </div>
      {drawerOpen ? <NotificationDrawer onClose={() => setDrawerOpen(false)} setTab={setNotificationTab} tab={notificationTab} /> : null}
    </header>
  );
}
