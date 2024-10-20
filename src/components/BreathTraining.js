import React, { useState } from "react";
import useBreathTraining from "../logic/useBreathTraining";
import PostTrainingDifficultySelector from "./PostTrainingDifficultySelector";
import { setNewTrainingTime } from "../database/dbFunctions";

const BreathTraining = ({ currentTrainingTime, userUid }) => {
  const {
    seconds,
    trainingStarted,
    finished,
    timerIndex,
    timerSeconds,
    startTraining,
  } = useBreathTraining(currentTrainingTime);

  const [difficulty, setDifficulty] = useState(0);

  // format seconds in order to display it correctly
  let displayseconds = (seconds / 1000).toFixed(1);

  let newTrainingTime = currentTrainingTime + difficulty - 1;

  return (
    <div>
      <h2>breathhold training</h2>
      {finished ? (
        <>
          <p>Training complete!</p>
          {userUid && (
            <PostTrainingDifficultySelector setDifficulty={setDifficulty} />
          )}
          {difficulty !== 0 && (
            <button
              onClick={() => setNewTrainingTime(userUid, newTrainingTime)}
            >
              Confirm new training time: &nbsp; {newTrainingTime}s
            </button>
          )}
        </>
      ) : (
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {/* Table on the left */}
            <table style={{ width: "50%" }}>
              <thead>
                <tr>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {timerSeconds.map((time, index) => (
                  <tr
                    key={index}
                    style={{
                      backgroundColor:
                        trainingStarted && index === timerIndex
                          ? "var(--dark-blue)"
                          : "transparent",
                      color:
                        trainingStarted && index === timerIndex
                          ? "black"
                          : "white",
                    }}
                  >
                    <td>{time} s</td>
                    {index % 2 === 1 ? <td>Breathe!</td> : <td>Hold!</td>}
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Breath training controls on the right */}
            <div
              style={{
                width: "50%",
                textAlign: "center",
              }}
            >
              {finished ? (
                <p>Training complete!</p>
              ) : (
                <div>
                  <h2
                    style={{
                      color: "red",
                      opacity:
                        timerIndex % 2 === 0 && trainingStarted
                          ? "100%"
                          : "20%",
                    }}
                  >
                    Hold your Breath!
                  </h2>
                  <h2
                    style={{
                      color: "green",
                      opacity:
                        timerIndex % 2 === 1 && trainingStarted
                          ? "100%"
                          : "25%",
                    }}
                  >
                    Breathe!
                  </h2>

                  <h2>Time left:</h2>
                  <h2 className="timer">{displayseconds} s</h2>
                  {!trainingStarted && (
                    <button onClick={startTraining}>Start Training</button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BreathTraining;
