import React, { useState, useEffect } from "react";

const TimerDown = ( {startingTime} ) => {
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
    
   // return { seconds, startTimer, stopTimer };
   return (
    <div>
      <h1>Time left: {seconds}s</h1>
      <button onClick={startTimer}>Start</button>
      <button onClick={stopTimer}>Stop</button>
    </div>
  );
};


export default TimerDown;