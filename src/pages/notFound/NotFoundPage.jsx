import { ArrowLeft, LayoutDashboard, SearchX } from "lucide-react";

export function NotFoundPage({ role }) {
  const dashboardHref = role === "COO" ? "/overview?role=COO" : "/overview?role=CEO";
  const reportsHref = `/reports?role=${role === "COO" ? "COO" : "CEO"}`;

  return (
    <section className="route-not-found">
      <article className="ceo-scan-card route-not-found-card">
        <div className="route-not-found-icon">
          <SearchX size={34} />
        </div>
        <span>404</span>
        <h1>Page not found</h1>
        <p>The page may not exist for this persona, or the route has not been added to the clean dashboard yet.</p>
        <div className="route-not-found-actions">
          <a href={dashboardHref}>
            <LayoutDashboard size={16} /> Dashboard
          </a>
          <a href={reportsHref}>
            <ArrowLeft size={16} /> Reports
          </a>
        </div>
      </article>
    </section>
  );
}
