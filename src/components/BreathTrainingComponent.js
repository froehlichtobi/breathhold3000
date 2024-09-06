import React, { useState } from "react";
import useBreathTraining from "../logic/useBreathTraining";

const BreathTrainingComponent = ( {currentTrainingTime }) => {
    
    const { seconds, trainingStarted, finished, startTraining } = 
    useBreathTraining(currentTrainingTime);

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