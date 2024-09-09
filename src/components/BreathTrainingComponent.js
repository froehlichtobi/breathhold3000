import React from "react";
import useBreathTraining from "../logic/useBreathTraining";

const BreathTrainingComponent = ({ currentTrainingTime }) => {
  const {
    seconds,
    trainingStarted,
    finished,
    timerIndex,
    timerSeconds,
    startTraining,
  } = useBreathTraining(currentTrainingTime);

  return (
    <div>
      <h1>breath training</h1>
      {finished ? (
        <p>Training complete!</p>
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
                  <th>Times</th>
                </tr>
              </thead>
              <tbody>
                {timerSeconds.map((time, index) => (
                  <tr
                    key={index}
                    style={{
                      backgroundColor:
                        trainingStarted && index === timerIndex
                          ? "yellow"
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
            <div style={{ width: "50%", textAlign: "center" }}>
              {finished ? (
                <p>Training complete!</p>
              ) : (
                <div>
                  <h2
                    style={{
                      color: "red",
                      opacity: timerIndex % 2 === 0 && trainingStarted ? "100%" : "20%",
                    }}
                  >
                    Hold your Breath!
                  </h2>
                  <h2
                    style={{
                      color: "green",
                      opacity: timerIndex % 2 === 1 && trainingStarted ? "100%" : "25%",
                    }}
                  >
                    Breathe!
                  </h2>

                  <h2>Time left: {seconds}s</h2>
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

export default BreathTrainingComponent;
