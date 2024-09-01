import React, { useState } from "react";

const Guest = ({ setGuest }) => {
  const handleGuestUser = () => {
    setGuest(true);
  };
  return (
    <div>
      <button onClick={handleGuestUser}>Continue as Guest</button>
    </div>
  );
};
export default Guest;
