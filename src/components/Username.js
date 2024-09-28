import React, { useState } from "react";
import { createUserName } from "../database/dbFunctions";

const Username = ({ setUsernameNeeded, userUid }) => {
  const [username, setUsername] = useState("");

  const handleSetUsername = () => {
    createUserName(userUid, username);
    setUsernameNeeded(false);
    window.location.reload();
  };
  return (
    <div>
      <input
        type="name"
        placeholder="choose username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={handleSetUsername}>confirm</button>
      <h2>response: </h2>
    </div>
  );
};

export default Username;
