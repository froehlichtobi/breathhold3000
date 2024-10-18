import React, { useState, useEffect } from "react";
import "./styles/App.css";
import {
  AuthPage,
  BreathTrainingComponent,
  Footer,
  LogOut,
  MaxBreathHold,
  PostTrainingDifficultySelector,
  Username,
} from "./components";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./authentication/firebaseAuth";
import { db } from "./database/dbFirestore";
import checkForUser, { getMaxBreathTime } from "./database/dbFunctions";
import { getCurrentTrainingTime } from "./database/dbFunctions";

const App = () => {
  const [isGuest, setGuest] = useState(false);
  const [user, setUser] = useState(null);
  const [userUid, setUserUid] = useState(null);
  const [username, setUsername] = useState(null);
  const [maxHoldTime, setMaxHoldTime] = useState(0);
  const [currentTrainingTime, setCurrentTrainingTime] = useState(40);

  // check if user logs in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setUserUid(user.uid);
    });
    return () => unsubscribe(); // unsubscribe will stop the useEffect "listener", this would happen if App would be dismounted (as far as i understood this)
  }, []);

  useEffect(() => {
    const fetchDataFromDb = async () => {
      let trainingTime = await getCurrentTrainingTime(userUid);
      setCurrentTrainingTime(trainingTime);
      let maxTime = await getMaxBreathTime(userUid);
      setMaxHoldTime(maxTime);
    };
    if (userUid) {
      checkForUser(userUid, setUsername);
      fetchDataFromDb();
    }
  }, [userUid]);

  const renderMaxBreathHold = () => {
    if (isGuest) {
      return <MaxBreathHold maxHoldTime={maxHoldTime} userUid={userUid} />;
    } else if (user) {
      return (
        <>
          <MaxBreathHold maxHoldTime={maxHoldTime} userUid={userUid} />
          <h2>personal best: {maxHoldTime} s</h2>
        </>
      );
    }
  };

  return (
    <div className="App">
      <h1 className="header">
        <a href="#" onClick={() => window.location.reload()}>
          BreathHold3000
        </a>
      </h1>
      {user && <h1>{username}</h1>}

      {user && <LogOut />}

      {!username && user && !isGuest && (
        <Username setUsername={setUsername} userUid={userUid} />
      )}

      {!isGuest && !user && <AuthPage setGuest={setGuest} />}

      {isGuest && <h2>Welcome, Guest!</h2>}

      {renderMaxBreathHold()}

      {(isGuest || user) && (
        <BreathTrainingComponent currentTrainingTime={currentTrainingTime} />
      )}

      <PostTrainingDifficultySelector />
      <Footer />
    </div>
  );
};

export default App;
