import { useEffect, useRef, useState } from "react";
import { ArrowUpDown, Check, ChevronDown, Search, SlidersHorizontal } from "lucide-react";

const defaultFilters = [
  { label: "Status", value: "All status (15)" },
  { label: "Department", value: "All departments (7)" },
  { label: "Staff", value: "Search staff", search: true },
  { label: "Created date", value: "All dates" },
];

const defaultSortOptions = ["Last visit: newest", "Last visit: oldest", "Name: A to Z", "Date created", "Date updated"];

export function HrmsTableToolbar({
  action,
  filters = defaultFilters,
  filterTitle = "Filter staff",
  searchPlaceholder,
  sortOptions = defaultSortOptions,
}) {
  const [openPanel, setOpenPanel] = useState(null);
  const [sortLabel, setSortLabel] = useState(sortOptions[2] ?? sortOptions[0]);
  const toolbarRef = useRef(null);

  useEffect(() => {
    function closeOnOutsideClick(event) {
      if (!toolbarRef.current?.contains(event.target)) {
        setOpenPanel(null);
      }
    }

    document.addEventListener("pointerdown", closeOnOutsideClick);
    return () => document.removeEventListener("pointerdown", closeOnOutsideClick);
  }, []);

  return (
    <div className="hrms-wire-toolbar" ref={toolbarRef}>
      <label className="hrms-wire-search">
        <Search aria-hidden="true" size={18} />
        <input type="search" placeholder={searchPlaceholder} />
      </label>

      <div className={`hrms-wire-control${openPanel === "filters" ? " is-open" : ""}`}>
        <button className="hrms-wire-filter" onClick={() => setOpenPanel(openPanel === "filters" ? null : "filters")} type="button">
          <SlidersHorizontal aria-hidden="true" size={18} />
          <span>Filters</span>
          <ChevronDown aria-hidden="true" size={18} />
        </button>
        <div className="hrms-wire-popover hrms-wire-popover--filters">
          <h3>{filterTitle}</h3>
          {filters.map((filter) => (
            <div className="hrms-wire-filter-row" key={filter.label}>
              <label>
                <input type="checkbox" />
                <span>{filter.label}</span>
              </label>
              {filter.search ? (
                <input aria-label={filter.value} placeholder={filter.value} type="search" />
              ) : (
                <button type="button">
                  <span>{filter.value}</span>
                  <ChevronDown aria-hidden="true" size={18} />
                </button>
              )}
            </div>
          ))}
          <div className="hrms-wire-popover-actions">
            <button className="hrms-wire-clear" type="button">
              Clear
            </button>
            <button className="hrms-wire-apply" onClick={() => setOpenPanel(null)} type="button">
              Apply filters
            </button>
          </div>
        </div>
      </div>

      <div className={`hrms-wire-control${openPanel === "sort" ? " is-open" : ""}`}>
        <button className="hrms-wire-filter" onClick={() => setOpenPanel(openPanel === "sort" ? null : "sort")} type="button">
          <ArrowUpDown aria-hidden="true" size={18} />
          <span>{sortLabel}</span>
          <ChevronDown aria-hidden="true" size={18} />
        </button>
        <div className="hrms-wire-popover hrms-wire-popover--sort">
          {sortOptions.map((option) => (
            <button
              className={option === sortLabel ? "is-active" : ""}
              key={option}
              onClick={() => {
                setSortLabel(option);
                setOpenPanel(null);
              }}
              type="button"
            >
              <span>{option}</span>
              {option === sortLabel ? <Check aria-hidden="true" size={18} /> : null}
            </button>
          ))}
        </div>
      </div>

      {action}
    </div>
  );
}
