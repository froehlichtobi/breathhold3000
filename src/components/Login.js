import React, { useState } from "react";
import { logInWithEmail, signInWithGoogle } from "../authentication/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorLogin, setErrorLogin] = useState ("");

  const handleLogin = () => {
    logInWithEmail(email, password, setErrorLogin);
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle();
    // on first login user needs to set a username!!
  };

  return (
    <div>
      <h2>Login</h2>
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
      <button onClick={handleLogin}>LOGIN</button>
      <button onClick={handleGoogleSignIn}>SIGN IN WITH GOOGLE</button>
      <h4>{errorLogin}</h4>
    </div>
  );
};

export default Login;
