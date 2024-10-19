import React, { useState } from "react";
import { signUpWithEmail } from "../authentication/auth";

const SignUp = ({ setIsLoadingUsername }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeated, setPasswordRepeated] = useState("");
  const [errorSignUp, setErrorSignUp] = useState("");

  // in this order:
  // check if username or email is already used!!
  // check if passwords match
  // if the inputs are valid call signUpWithEmail
  const handleSignUp = () => {
    signUpWithEmail(email, password, passwordRepeated, setErrorSignUp);
  };

  return (
    <div>
      <h2 style={{ marginBottom: "10px" }}>Sign Up</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email address"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <input
        type="password"
        value={passwordRepeated}
        onChange={(e) => setPasswordRepeated(e.target.value)}
        placeholder="Repeat Password"
      />
      <br />
      <button onClick={handleSignUp}>SIGN UP</button>
      <h4>{errorSignUp}</h4>
    </div>
  );
};

export default SignUp;
