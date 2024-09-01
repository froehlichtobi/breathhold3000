import React, { useState } from "react";
import { signUpWithEmail } from "../authentication/auth";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeated, setPasswordRepeated] = useState("");

  // in this order:
  // check if username or email is already used!!
  // check if passwords match
  // if the inputs are valid call signUpWithEmail
  const handleSignUp = () => {
    signUpWithEmail(email, password);
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
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
      <button onClick={handleSignUp}>Sign Up</button>
    </div>
  );
};

export default SignUp;
