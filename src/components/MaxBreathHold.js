import React, { useState, useEffect } from "react";

const MaxBreathHold = () => {
  const [seconds, setSeconds] = useState(0);
  const [active, setActive] = useState(false);
  // first I tried to create the timer simply by adding 100 milliseconds every 100 milliseconds using the setInterval() function
  // but then I noticed that that is not accurate at all, losing more than 5 seconds in 60 seconds, and drifting away even further
  // the longer the timer runs. --> so now I'm changing that to using the Date.now() and calculating the time difference
  // Date.now() returns the milliseconds that have passed since January 1, 1970, UTC at midnight

  const [startingTime, setStartingTime] = useState(null);

  useEffect(() => {
    let interval = null;

    if (active) {
      if (!startingTime) {
        setStartingTime(Date.now());
      }
      // update seconds every 100 milliseconds, get elapsed time by comparing Date.now() to startingTime
      interval = setInterval(() => {
        setSeconds(Date.now() - startingTime);
      }, 100);
    } else if (!active && seconds !== 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [active, seconds, startingTime]);
  // before adding startingTime into the dependencies there was a split second
  // in which the timer showed the actual value of Date.now (1728131359333) before counting correctly -> interesting

  const startTimer = () => {
    setActive(true);
  };

  const stopTimer = () => {
    setActive(false);
    console.log(seconds);
  };

  const resetTimer = () => {
    setSeconds(0);
    setStartingTime(null);
    setActive(false);
  };

  // format seconds in order to display it correctly
  let displayseconds = (seconds / 1000).toFixed(1);

  // display-logic
  let showReset = seconds !== 0 && !active;

  return (
    <div>
      <h2>Test your max. breathhold time!</h2>
      <h1 className="timer">{displayseconds} s</h1>
      {!showReset && <button onClick={startTimer}>Start</button>}
      {!showReset && <button onClick={stopTimer}>Stop</button>}
      {showReset && <button onClick={resetTimer}>Reset</button>}
    </div>
  );
};

export default MaxBreathHold;
