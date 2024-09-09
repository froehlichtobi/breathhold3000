import React, {useState} from "react";

const PostTrainingDifficultySelector = () => {

    const [difficulty, setDifficulty] = useState(0);
    return (
        <div>
         <button onClick={() => setDifficulty(1)}>DIFFICULTY 1</button>
        <button onClick={() => setDifficulty(2)}>DIFFICULTY 2</button>
        <button onClick={() => setDifficulty(3)}>DIFFICULTY 3</button>
        <button onClick={() => setDifficulty(4)}>DIFFICULTY 4</button>
        <h3>Current difficulty: {difficulty}</h3>
        </div>
    )
}
export default PostTrainingDifficultySelector;