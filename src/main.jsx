import { createRoot } from "react-dom/client";
import { App } from "./app/App.jsx";
import "./styles/tokens.css";
import "./styles/base.css";
import "./styles/components.css";
import "./styles/shell.css";
import "./styles/overview.css";
import "./styles/finance.css";
import "./styles/hrms.css";

createRoot(document.getElementById("root")).render(<App />);
