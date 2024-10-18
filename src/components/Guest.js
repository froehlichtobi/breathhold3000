import React, { useState } from "react";

const Guest = ({ setGuest }) => {
  const handleGuestUser = () => {
    setGuest(true);
  };
  return (
    <div>
      <button style={{ marginBottom: "10px" }} onClick={handleGuestUser}>
        CONTINUE AS GUEST
      </button>
    </div>
  );
};
export default Guest;
