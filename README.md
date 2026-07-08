# ZyephrOS Dashboard Clean

Clean React/Vite migration workspace for the ZyephrOS executive dashboard.

This app is independent from the old layered static implementation. It does not load `public/enhancements.js`; route behavior lives in React components under `src/`.

## Run

```bash
pnpm install
pnpm dev
```

Default dev URL:

```txt
http://127.0.0.1:5175/
```

Build:

```bash
pnpm build
```

## Structure

```txt
src/
  app/          app entry, route selection
  layout/       shell, sidebar, topbar, profile switcher
  pages/        route-level screens
  components/   shared UI, KPI blocks, tables
  data/         temporary static data and future API mapping layer
  config/       navigation, roles, route metadata
  styles/       tokens, shell styles, page styles, migrated legacy CSS
```

## Migrated Routes

- `/overview?role=CEO` - migrated with interactive overview charts.
- `/overview?role=COO` - migrated with COO-specific operations bento cards.
- `/finance?role=CEO&tab=revenue-analysis` - first-pass migrated.
- `/branches?role=CEO` - first-pass migrated.
- `/branches?role=COO` - first-pass migrated.
- `/capacity-flow?role=COO` - first-pass migrated.
- `/dialysis-program?role=COO` - first-pass migrated.
- `/reports?role=CEO` - first-pass migrated.
- `/reports?role=COO` - first-pass migrated.
- `/hrms?role=HR_ADMIN&tab=overview` - first-pass migrated.
- `/hrms?role=HR_ADMIN&tab=staff` - first-pass migrated.
- `/hrms?role=HR_ADMIN&tab=departments` - first-pass migrated.
- `/hrms?role=HR_ADMIN&tab=access` - first-pass migrated.
- Unknown or role-mismatched routes render the themed 404 page.

## Backend Handoff Notes

- Static demo data is currently in `src/data/*.js`.
- Replace data modules with API adapters or query hooks route by route.
- Keep component contracts stable while wiring backend data: page components should receive normalized data, not raw API payloads.
- Keep generated output out of source control. `dist/` is intentionally ignored.

## Remaining Frontend Cleanup

- `src/styles/legacy-app.css` and `src/styles/legacy-overrides.css` still contain migrated CSS from the original app. They are CSS only, not runtime JS behavior.
- As pages stabilize, move page-specific CSS into smaller files and delete unused legacy selectors.
- Add route-level tests once API contracts are defined.
