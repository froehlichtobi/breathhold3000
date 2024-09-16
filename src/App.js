import React, { useState, useEffect } from "react";
import AuthPage from "./components/AuthPage";
import LogOut from "./components/LogOut";
import "./styles/App.css";
import MaxBreathHold from "./components/MaxBreathHold";
import BreathTrainingComponent from "./components/BreathTrainingComponent";
import PostTrainingDifficultySelector from "./components/PostTrainingDifficultySelector";
import { onAuthStateChanged } from "firebase/auth";
import {auth} from "./authentication/firebaseAuth";


const App = () => {
  const [isGuest, setGuest] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user); 
    });

    return () => unsubscribe(); // unsubscribe will stop the useEffect "listener", this would happen if App would be dismounted (as far as i understood this)
  }, []);

  console.log(user);
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
      {(!isGuest && !user) && <AuthPage setGuest={setGuest} />}
      {isGuest && <h2>Welcome, Guest!</h2>}
      {(isGuest || user) && <MaxBreathHold />}
      {(isGuest || user) && <BreathTrainingComponent currentTrainingTime={40} />}
      <PostTrainingDifficultySelector />
      {user && <h1>{user.email}</h1>}
      {!user && <h1>not logged in</h1>}
      {user && <LogOut />}
    </div>
  );
};

export default App;
