import React from "react";
import { auth } from "../authentication/firebaseAuth";

const LogOut = () => {
  const handleLogOut = () => {
    auth
      .signOut()
      .then(() => {
        console.log("User signed out");
        window.location.reload();
        // setUser(null); // Reset user state after sign-out
      })
      .catch((error) => {
        console.error("Error signing out: ", error.message);
      });
  };

  return (
    <div>
      <button onClick={handleLogOut}>Logout</button>
    </div>
  );
};

export default LogOut;
