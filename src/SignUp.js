import React, { useState } from "react";
import { signUpWithEmail } from "./auth";

const SignUp = () => {
  const [email, setEmail] = useState("Enter valid email");
  const [password, setPassword] = useState("Enter password");

  const handleSignUp = () => {
    signUpWithEmail(email, password);
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={handleSignUp}>Sign Up</button>
    </div>
  );
};

export default SignUp;
