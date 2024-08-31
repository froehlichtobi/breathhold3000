import React, { useState } from "react";
import SignUp from "./SignUp";
import Login from "./Login";
import "./App.css";

function App() {
  return (
    <div className="App">
      <h1>BreathHold3000</h1>
      <h2>
        Hello Everyone! I created this webapp because I wanted to improve my
        breathhold and I found out about an exercise you can do to improve it,
        but I found it annoying to do on my phone with the stopwatch.<br></br>If
        you want to save your data and look at your stats and improvement go
        ahead and create an account, if not, you can just continue as a guest.
        :)
      </h2>
      <SignUp />
      <Login />
    </div>
  );
}

export default App;
