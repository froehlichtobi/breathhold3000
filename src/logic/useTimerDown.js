import React, { useState, useEffect } from "react";

const useTimerDown = (startingTime = 60) => {
    const[seconds, setSeconds] = useState(startingTime);
    const[active, setActive] = useState(false);

    useEffect(() => {
        let interval = null;
    
        if (active && seconds > 0) {
          interval = setInterval(() => {
            setSeconds((prevSeconds) => prevSeconds - 100);
          }, 100);
        } else {
          clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [active, seconds]);

    const startTimer = () => setActive(true);
    const stopTimer = () => setActive(false);
    
  return { seconds, active, startTimer, stopTimer };
  }
export default useTimerDown;