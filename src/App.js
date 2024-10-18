import React, { useState, useEffect } from "react";
import "./styles/App.css";
import {
  AuthPage,
  BreathTraining,
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
  const [selectedTraining, setSelectedTraining] = useState(null);

  // check if user logs in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setUserUid(user.uid);
    });
    return () => unsubscribe(); // unsubscribe will stop the useEffect "listener", this would happen if App would be dismounted (as far as i understood this)
  }, [user]);

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
  }, [user, username]);

  const renderSelector = () => {
    if (isGuest || user) {
      return (
        <>
          <button
            style={{ padding: "25px", marginBottom: "5px", width: "200px" }}
            onClick={() => setSelectedTraining(1)}
          >
            MAX HOLD TEST
          </button>
          <button
            style={{ padding: "25px", marginBottom: "5px", width: "200px" }}
            onClick={() => setSelectedTraining(2)}
          >
            BREATH TRAINING
          </button>
        </>
      );
    }
  };
  const renderMaxBreathHold = () => {
    if (selectedTraining === 1) {
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
    }
  };

  const renderBreathTraining = () => {
    if (selectedTraining === 2) {
      if (isGuest || user) {
        return (
          <>
            <BreathTraining currentTrainingTime={currentTrainingTime} />
            <PostTrainingDifficultySelector />
          </>
        );
      }
    }
  };

  const renderAuthPage = () => {
    if (!isGuest && !user) {
      return <AuthPage setGuest={setGuest} />;
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

      {renderAuthPage()}

      {isGuest && <h2>Welcome, Guest!</h2>}

      {renderSelector()}

      {renderMaxBreathHold()}

      {renderBreathTraining()}

      <Footer />
    </div>
  );
};

export default App;
