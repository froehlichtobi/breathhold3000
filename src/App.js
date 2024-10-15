import React, { useState, useEffect } from "react";
import AuthPage from "./components/AuthPage";
import LogOut from "./components/LogOut";
import "./styles/App.css";
import MaxBreathHold from "./components/MaxBreathHold";
import BreathTrainingComponent from "./components/BreathTrainingComponent";
import PostTrainingDifficultySelector from "./components/PostTrainingDifficultySelector";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./authentication/firebaseAuth";
import { db } from "./database/dbFirestore";
import checkForUser from "./database/dbFunctions";
import Username from "./components/Username";

const App = () => {
  const [isGuest, setGuest] = useState(false);
  const [user, setUser] = useState(null);
  const [userUid, setUserUid] = useState(null);
  const [username, setUsername] = useState(null);

  // check if user logs in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setUserUid(user.uid);
    });

    return () => unsubscribe(); // unsubscribe will stop the useEffect "listener", this would happen if App would be dismounted (as far as i understood this)
  }, []);

  useEffect(() => {
    if (userUid) {
      checkForUser(userUid, setUsername);
    }
  }, [userUid]);

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
      {user && <h1>{username}</h1>}
      {!user && <h1>not logged in</h1>}
      {user && <LogOut />}
      {!username && user && !isGuest && (
        <Username setUsername={setUsername} userUid={userUid} />
      )}
      {!isGuest && !user && <AuthPage setGuest={setGuest} />}
      {isGuest && <h2>Welcome, Guest!</h2>}
      {(isGuest || user) && <MaxBreathHold />}
      {(isGuest || user) && (
        <BreathTrainingComponent currentTrainingTime={40} />
      )}
      <PostTrainingDifficultySelector />
    </div>
  );
};

export default App;
