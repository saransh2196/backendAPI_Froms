import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import DocumentForm from "./components/DocumentForm";

const App = () => {
  const [token, setToken] = useState("");

  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          {token ? (
            <li>
              <Link to="/documents">Add Document</Link>
            </li>
          ) : null}
        </ul>
      </nav>

      <Routes>
        <Route
          exact
          path="/"
          element={<LoginForm  setToken={setToken}/>}
        ></Route>
        <Route
          path="/documents"
          element={<DocumentForm token={token} />}
        ></Route>
      </Routes>
    </Router>
  );
};

export default App;
