import React from "react";

const PostTrainingDifficultySelector = ({ setDifficulty }) => {
  return (
    <div className="difficultySelector">
      <button onClick={() => setDifficulty(-4)}>
        VERY HARD
        <br />- 5 s
      </button>
      <button onClick={() => setDifficulty(1)}>
        HARD <br />+ 0 s
      </button>
      <button onClick={() => setDifficulty(6)}>
        OKAY
        <br />+ 5 s
      </button>
      <button onClick={() => setDifficulty(11)}>
        EASY
        <br />+ 10 s
      </button>
    </div>
  );
};
export default PostTrainingDifficultySelector;
