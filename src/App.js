import React, { useState, useEffect } from "react";
import "./styles/App.css";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  Header,
  AuthPage,
  BreathTraining,
  Footer,
  LogOut,
  MaxBreathHold,
  Username,
} from "./components";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./authentication/firebaseAuth";
import checkForUser, { getMaxBreathTime } from "./database/dbFunctions";
import { getCurrentTrainingTime } from "./database/dbFunctions";

const App = () => {
  const [isGuest, setGuest] = useState(false); // for rendering logic - don't show stuff that calls db functions when the user is only guest
  const [userUid, setUserUid] = useState(null); // userUid "connects" my Firebase Authentication to my Firestore DB (userUid is created in Authentication)
  const [username, setUsername] = useState(null);
  const [maxHoldTime, setMaxHoldTime] = useState(0);
  const [currentTrainingTime, setCurrentTrainingTime] = useState(40);
  const [selectedTraining, setSelectedTraining] = useState(null);
  const [user, loading] = useAuthState(auth); // specific State for Firebase Authentication, implemented this very late, because I didn't know about it earlier
  const [isLoadingUsername, setIsLoadingUsername] = useState(true); // needed to solve rendering bug where it showed the <Username /> even though user had one already

  // check if user logs in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUserUid(user.uid);
      const fetchDataFromDb = async () => {
        let trainingTime = await getCurrentTrainingTime(userUid);
        setCurrentTrainingTime(trainingTime);
        let maxTime = await getMaxBreathTime(userUid);
        setMaxHoldTime(maxTime);
      };
      if (userUid) {
        checkForUser(userUid, setUsername, setIsLoadingUsername);
        fetchDataFromDb();
      }
    });
    return () => unsubscribe(); // unsubscribe will stop the useEffect "listener", this would happen if App would be dismounted (as far as i understood this)
  }, [user, username, userUid]);

  const renderHelloMessage = () => {
    if (!isLoadingUsername && username) {
      return <h2>Hello, {username}</h2>;
    }
  };

  const renderLogOut = () => {
    if (user) return <LogOut />;
  };

  const renderUsername = () => {
    if (!isLoadingUsername && !username && user && !isGuest) {
      return <Username setUsername={setUsername} userUid={userUid} />;
    }
  };

  const renderAuthPage = () => {
    if (!isGuest && !user) {
      return (
        <AuthPage
          setGuest={setGuest}
          setIsLoadingUsername={setIsLoadingUsername}
        />
      );
    }
  };

  const renderGuestMessage = () => {
    if (isGuest) {
      return <h2>Welcome, Guest!</h2>;
    }
  };
  const renderSelector = () => {
    if (isGuest || user) {
      return (
        <>
          <button
            className="modeSelectorButton"
            onClick={() => setSelectedTraining(1)}
          >
            MAX HOLD TEST
          </button>
          <button
            className="modeSelectorButton"
            onClick={() => setSelectedTraining(2)}
          >
            BREATHHOLD TRAINING
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
            <h2>personal best: &nbsp;{maxHoldTime} s</h2>
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
            <BreathTraining
              currentTrainingTime={currentTrainingTime}
              userUid={userUid}
            />
          </>
        );
      }
    }
  };

  return loading ? (
    <div />
  ) : (
    <div className="App">
      <Header />

      {renderHelloMessage()}

      {renderLogOut()}

      {renderUsername()}

      {renderAuthPage()}

      {renderGuestMessage()}

      {renderSelector()}

      {renderMaxBreathHold()}

      {renderBreathTraining()}

      <Footer />
    </div>
  );
};

export default App;
