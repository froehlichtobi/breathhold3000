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

  const timerTime = timerSeconds[timerIndex] * 100;

  const { seconds, active, startTimer, stopTimer, setNewSeconds } =
    useTimerDown(timerTime);

  const startTraining = () => {
    setTrainingStarted(true);
    startTimer();
    console.log("first timer started!");
  };

  useEffect(() => {
    if (trainingStarted) {
      if (active && seconds <= 0) {
        stopTimer();

        if (timerIndex <= 9) {
          // there is still at least one more time
          setTimerIndex((prevIndex) => prevIndex + 1);
          console.log("timertime " + timerTime);
          console.log("index dazu " + timerIndex);
          setNewSeconds(timerTime);
          startTimer();
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
    setNewSeconds,
  ]);

  return { seconds, trainingStarted, finished, timerIndex, startTraining };
};

export default useBreathTraining;
