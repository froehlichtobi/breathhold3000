import React, { useState } from "react";

const Guest = ({ setGuest }) => {
  const handleGuestUser = () => {
    setGuest(true);
  };
  return (
    <div>
      <button onClick={handleGuestUser}>CONTINUE AS GUEST</button>
    </div>
  );
};
export default Guest;
