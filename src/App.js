import React, { useState } from "react";
import AuthPage from "./components/AuthPage";
import "./styles/App.css";
import MaxBreathHold from "./components/MaxBreathHold";
import BreathTrainingComponent from "./components/BreathTrainingComponent";
import PostTrainingDifficultySelector from "./components/PostTrainingDifficultySelector";

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
      {isGuest && <MaxBreathHold />}
      {isGuest && <BreathTrainingComponent currentTrainingTime={40} />}
      <PostTrainingDifficultySelector />
    </div>
  );
};

export default App;
