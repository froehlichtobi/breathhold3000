import React, { useState } from "react";
import AuthPage from "./components/AuthPage";
import "./App.css";

const App = () => {
  const [isGuest, setGuest] = useState(false);

  return (
    <div className="App">
      <h1>
        <a
          href="#"
          onClick={() => window.location.reload()}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          BreathHold3000
        </a>
      </h1>
      {!isGuest && <AuthPage setGuest={setGuest} />}
      {isGuest && <h2>Welcome, Guest!</h2>}
    </div>
  );
};

export default App;
