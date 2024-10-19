import React from "react";
import Login from "./Login";
import SignUp from "./SignUp";
import Guest from "./Guest";
import "../styles/AuthPage.css";

const AuthPage = ({ setGuest, setIsLoadingUsername }) => {
  return (
    <div className="authpage">
      <h2>
        Welcome to Breathhold3000!
        <br />
        Improve your breathhold!
      </h2>
      <h3 className="center-text">
        If you want to save your progress and personal records log in or create
        an account! Else you can continue as a guest and try it out first!
      </h3>
      <Login />
      <SignUp setIsLoadingUsername={setIsLoadingUsername} />
      <Guest setGuest={setGuest} />
    </div>
  );
};

export default AuthPage;
