import React, { useState, useEffect } from "react";

const MaxBreathHold = () => {

    const [seconds, setSeconds] = useState(0);
    const [active, setActive] = useState(false);

    useEffect(() => {
        let interval = null;
    
        if (active) {
          interval = setInterval(() => {
            setSeconds((seconds) => seconds + 100);
          }, 100);
        } else if (!active && seconds !== 0) {
          clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [active, seconds]);

    const startTimer = () => {
        setActive(true);
      };
    
      const stopTimer = () => {
        setActive(false);
        console.log(seconds);
      };
    
      const resetTimer = () => {
        setSeconds(0);
        setActive(false);
      };

      return (
        <div>
            <h1>Test your max. breathhold time!: {seconds}s</h1>
            <button onClick={startTimer}>Start</button>
            <button onClick={stopTimer}>Stop</button>
            <button onClick={resetTimer}>Reset</button>
        </div>
    )
}

export default MaxBreathHold;