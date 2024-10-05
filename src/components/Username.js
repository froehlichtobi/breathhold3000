import React, { useState } from "react";
import { createUserName } from "../database/dbFunctions";

const Username = ({ setUsername, userUid }) => {
  const [usernameInput, setUsernameInput] = useState("");

  const handleSetUsername = () => {
    createUserName(userUid, usernameInput);
    // possible problem here: if createUserName fails, then we still
    // set the usernameInput to username (for displaying the name)
    setUsername(usernameInput);
  };

  return (
    <div>
      <h2>Choose an username:</h2>
      <input
        type="name"
        placeholder="choose username"
        value={usernameInput}
        onChange={(e) => setUsernameInput(e.target.value)}
      />
      <button onClick={handleSetUsername}>confirm</button>
    </div>
  );
};

export default Username;
