import { useState, useEffect } from "react";
import useTimerDown from "./useTimerDown";

const useBreathTraining = (currentTrainingTime = 60) => { //check if it is 0 before calling, or inside here?

    const[trainingStarted, setTrainingStarted] = useState(false);
    const[finished, setFinished] = useState(false);
    const[timerIndex, setTimerIndex] = useState(0);

    const timerSeconds = [currentTrainingTime, 120, currentTrainingTime, 90, currentTrainingTime, 60, currentTrainingTime, 30, currentTrainingTime, 15, currentTrainingTime];

    const timerTime = timerSeconds[timerIndex] * 1000;
    
    const { seconds, active, startTimer, stopTimer } = useTimerDown(timerTime);

    const startTraining = () => {
        
        setTrainingStarted(true);
        startTimer();
        console.log("first timer started!");
    }

    useEffect(() => {
        if(trainingStarted){
            if (active && seconds <=0){
                stopTimer();
            
            if(timerIndex <= 9){ // there is still at least one more time
                    setTimerIndex((prevIndex) => prevIndex + 1);
                    startTimer();
                    console.log("Next timer started!");
            }
            else {
                setFinished(true);
                console.log("Training finished");
            }
        }
        }
       
    
},[seconds, active, timerIndex, trainingStarted, startTimer, stopTimer]);

return { seconds, trainingStarted, finished, startTraining };

};


export default useBreathTraining;