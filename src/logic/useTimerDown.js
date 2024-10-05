import { useState, useEffect } from "react";

const useTimerDown = (startingTime = 60) => {
  const [seconds, setSeconds] = useState(startingTime);
  const [active, setActive] = useState(false);
  // same change as in MaxBreathHold.js

  const [startTime, setStartTime] = useState(null);
  const [finishTime, setFinishTime] = useState(null);

  useEffect(() => {
    let interval = null;

    if (active && seconds > 0) {
      if (!startTime) {
        setStartTime(Date.now());
        setFinishTime(Date.now() + seconds);
      }

      interval = setInterval(() => {
        setSeconds(finishTime - Date.now());
      }, 100);
    } else {
      clearInterval(interval);
      setStartTime(null);
      setFinishTime(null);
    }

    return () => clearInterval(interval);
  }, [active, seconds, startTime, finishTime]);

  const startTimer = () => setActive(true);
  const stopTimer = () => setActive(false);
  const setNewSeconds = (time) => setSeconds(time);

  return { seconds, active, startTimer, stopTimer, setNewSeconds };
};
export default useTimerDown;
