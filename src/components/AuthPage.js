import React from "react";
import Login from "./Login";
import SignUp from "./SignUp";
import Guest from "./Guest";

const AuthPage = ({ setGuest }) => {
  return (
    <div>
      <h2>
        Welcome to Breathhold3000!
        <br />
        Improve your breathhold and enjoy longer dives!
      </h2>
      <h3>
        If you want to save your progress and personal records log in or create
        an account! Else you can continue as a guest and try it out first!
      </h3>
      <Login />
      <SignUp />
      <Guest setGuest={setGuest} />
    </div>
  );
};

export default AuthPage;
