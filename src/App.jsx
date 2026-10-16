import React from "react";
import {
  HashRouter,
  Routes,
  Route,
  NavLink,
  useLocation
} from "react-router-dom";

// Redux Provider & Store Integration
import { Provider } from "react-redux";
import reduxStore from "./redux/store";

import U3Exp4 from "./U3Exp4/U3Exp4";
import U4Exp1 from "./U4Exp1/U4Exp1";
import U4Exp2 from "./U4Exp2/U4Exp2";
import U4Exp3 from "./U4Exp3/U4Exp3";
import U4Exp4 from "./U4Exp4/U4Exp4";
import U5Exp1 from "./U5Exp1/U5Exp1";
import U5Exp2 from "./U5Exp2/U5Exp2";
import U5Exp3 from "./U5Exp3/U5Exp3";

function GlobalNavBar() {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "U3 Exp 4 (Base)" },
    { path: "/u4-exp1", label: "U4 Exp 1 (REST API)" },
    { path: "/u4-exp2", label: "U4 Exp 2 (State)" },
    { path: "/u4-exp3", label: "U4 Exp 3 (CRUD)" },
    { path: "/u4-exp4", label: "U4 Exp 4 (Auth)" },
    { path: "/u5-exp1", label: "U5 Exp 1 (Testing)" },
    { path: "/u5-exp2", label: "U5 Exp 2 (Optimize)" },
    { path: "/u5-exp3", label: "U5 Exp 3 (Deploy)" }
  ];

  const isBaseApp =
    location.pathname === "/" ||
    location.pathname.startsWith("/login") ||
    location.pathname.startsWith("/dashboard") ||
    location.pathname.startsWith("/apply") ||
    location.pathname.startsWith("/profile") ||
    location.pathname.startsWith("/exp4");

  return (
    <nav
      style={{
        background: "#0f172a",
        color: "#ffffff",
        padding: "10px 16px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "10px",
        borderBottom: "1px solid #1e293b",
        fontFamily: "'Inter', system-ui, sans-serif",
        position: "sticky",
        top: 0,
        zIndex: 9999
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <span style={{ fontSize: "1.2rem" }}>💼</span>
        <strong style={{ fontSize: "0.95rem", letterSpacing: "-0.3px" }}>
          JobPortal Studio
        </strong>
      </div>

      <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
        {navItems.map((item) => {
          const isActive =
            item.path === "/"
              ? isBaseApp
              : location.pathname.startsWith(item.path);

          return (
            <NavLink
              key={item.path}
              to={item.path}
              style={{
                textDecoration: "none",
                padding: "5px 11px",
                borderRadius: "6px",
                fontSize: "0.78rem",
                fontWeight: 600,
                transition: "all 0.2s",
                background: isActive ? "#4f46e5" : "rgba(255, 255, 255, 0.08)",
                color: isActive ? "#ffffff" : "#cbd5e1",
                boxShadow: isActive
                  ? "0 2px 8px rgba(79, 70, 229, 0.4)"
                  : "none"
              }}
            >
              {item.label}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}

function App() {
  return (
    <Provider store={reduxStore}>
      <HashRouter>
        <GlobalNavBar />
        <Routes>
          {/* Unit 4 Experiments */}
          <Route path="/u4-exp1/*" element={<U4Exp1 />} />
          <Route path="/u4exp1/*" element={<U4Exp1 />} />
          <Route path="/uexp1/*" element={<U4Exp1 />} />

          <Route path="/u4-exp2/*" element={<U4Exp2 />} />
          <Route path="/u4exp2/*" element={<U4Exp2 />} />
          <Route path="/uexp2/*" element={<U4Exp2 />} />

          <Route path="/u4-exp3/*" element={<U4Exp3 />} />
          <Route path="/u4exp3/*" element={<U4Exp3 />} />
          <Route path="/uexp3/*" element={<U4Exp3 />} />

          <Route path="/u4-exp4/*" element={<U4Exp4 />} />
          <Route path="/u4exp4/*" element={<U4Exp4 />} />
          <Route path="/uexp4/*" element={<U4Exp4 />} />

          {/* Unit 5 Experiments */}
          <Route path="/u5-exp1/*" element={<U5Exp1 />} />
          <Route path="/u5exp1/*" element={<U5Exp1 />} />

          <Route path="/u5-exp2/*" element={<U5Exp2 />} />
          <Route path="/u5exp2/*" element={<U5Exp2 />} />

          <Route path="/u5-exp3/*" element={<U5Exp3 />} />
          <Route path="/u5exp3/*" element={<U5Exp3 />} />

          {/* Unit 3 Base Application */}
          <Route path="/exp4/*" element={<U3Exp4 />} />
          <Route path="/*" element={<U3Exp4 />} />
        </Routes>
      </HashRouter>
    </Provider>
  );
}

export default App;