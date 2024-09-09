import { useState, useEffect } from "react";
import useTimerDown from "./useTimerDown";

const useBreathTraining = (currentTrainingTime = 60) => {
  //check if it is 0 before calling, or inside here?

  const [trainingStarted, setTrainingStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [timerIndex, setTimerIndex] = useState(0);

  const timerSeconds = [
    currentTrainingTime,
    120,
    currentTrainingTime,
    90,
    currentTrainingTime,
    60,
    currentTrainingTime,
    30,
    currentTrainingTime,
    15,
    currentTrainingTime,
  ];

  const timeFactor = 20;
  const timerTime = timerSeconds[timerIndex] * timeFactor;

  const { seconds, active, startTimer, stopTimer, setNewSeconds } =
    useTimerDown(timerTime);

  const startTraining = () => {
    setTrainingStarted(true);
    startTimer();
    console.log("first timer started!, timerindex: " + timerIndex + " timertime: " + timerTime);
  };

  useEffect(() => {
    if (trainingStarted) {
      if (active && seconds <= 0) {
        stopTimer();

        if (timerIndex <= 9) {
          // there is still at least one more time
          setTimerIndex((prevIndex) => prevIndex + 1);
        } else {
          setFinished(true);
          console.log("Training finished");
        }
      }
    }
  }, [
    seconds,
    active,
    timerIndex,
    trainingStarted,
    timerTime,
    startTimer,
    stopTimer,
    setNewSeconds
  ]);


  // second useEffect is to update the timerTime correctly 
  // because otherwise with only the first one it would have been updated one render too late
  // did not 100% understand it, but i guess it's because useEffect only effects things once they have been rendered again?
useEffect(() => {
  if(trainingStarted && !active && !finished) {
    const nextTimerTime = timerSeconds[timerIndex] * timeFactor;
    setNewSeconds(nextTimerTime);
    startTimer();
  }
}, [timerIndex, trainingStarted, setNewSeconds, startTimer, timerSeconds, active, finished]);

  return {
    seconds,
    trainingStarted,
    finished,
    timerIndex,
    timerSeconds,
    startTraining,
  };
};

export default useBreathTraining;
