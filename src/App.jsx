import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import U3Exp4 from "./U3Exp4/U3Exp4";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/exp4/*"
          element={<U3Exp4 />}
        />

        <Route
          path="*"
          element={<U3Exp4 />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;