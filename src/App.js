import React, { useState } from "react";
import SignUp from "./SignUp";
import Login from "./Login";
import "./App.css";

function App() {
  return (
    <div className="App">
      <h1>BreathHold3000</h1>
      <h2>
        Hello Everyone!<br></br>If you want to save your data and look at your
        stats and improvement go ahead and create an account, if not, you can
        just continue as a guest.
      </h2>
      <SignUp />
      <Login />
    </div>
  );
}

export default App;
