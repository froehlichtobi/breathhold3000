import React from "react";
import useBreathTraining from "../logic/useBreathTraining";

const BreathTrainingComponent = ({ currentTrainingTime }) => {
  const { seconds, trainingStarted, finished, timerIndex, startTraining } =
    useBreathTraining(currentTrainingTime);

  return (
    <div>
      <h1>breath training</h1>
      {finished ? (
        <p>Training complete!</p>
      ) : (
        <div>
          {timerIndex % 2 == 1 ? <h2>Hold your Breath!</h2> : <h2>Breathe!</h2>}
          <h2>Time left: {seconds}s</h2>
          {!trainingStarted && (
            <button onClick={startTraining}>Start Training</button>
          )}
        </div>
      )}
    </div>
  );
};

export default BreathTrainingComponent;
