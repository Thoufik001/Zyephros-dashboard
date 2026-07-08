# ZyephrOS Dashboard

React/Vite frontend for the ZyephrOS executive dashboard.

## Setup

```bash
pnpm install
pnpm dev
```

Default local URL:

```txt
http://127.0.0.1:5175/
```

Build:

```bash
pnpm build
```

## Project Structure

```txt
src/
  app/          app entry and route selection
  layout/       sidebar, topbar, shell, profile menu
  pages/        dashboard screens
  components/   shared UI components
  data/         static demo data
  config/       roles, navigation, route metadata
  styles/       design tokens and page styles
```

## Main Routes

- `/overview?role=CEO`
- `/overview?role=COO`
- `/finance?role=CEO`
- `/branches?role=CEO`
- `/branches?role=COO`
- `/capacity-flow?role=COO`
- `/dialysis-program?role=COO`
- `/reports?role=CEO`
- `/reports?role=COO`
- `/hrms?role=HR_ADMIN&tab=overview`
- `/hrms?role=HR_ADMIN&tab=staff`
- `/hrms?role=HR_ADMIN&tab=departments`
- `/hrms?role=HR_ADMIN&tab=access`

## Data

Demo data currently lives in `src/data/*.js`. Backend integration can replace those modules with API adapters while keeping the page data shape normalized.
