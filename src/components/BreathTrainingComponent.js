import React, { useState } from "react";
import breathTraining from "../logic/breathTraining";

const BreathTrainingComponent = ( {currentTrainingTime }) => {
    const { seconds, trainingStarted, finished, startTraining } = breathTraining(currentTrainingTime);

    return(
        <div>
            <h1>breath training</h1>
            {finished ? (
                <p>Training complete!</p>
            ) : (
                <div>
                    <h2>Time left: {seconds}s</h2>
                    {!trainingStarted && <button onClick={startTraining}>Start Training</button>}
                </div>
            )}
        </div>
    );

};


export default BreathTrainingComponent;