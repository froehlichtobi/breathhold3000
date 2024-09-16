import { auth, googleProvider, signInWithPopup } from "./firebaseAuth";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

// sign up with email and password
export const signUpWithEmail = async (email, password, passwordRepeated, setErrorSignUp) => {
  if(password === passwordRepeated){
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User signed up:", userCredential.user);
      setErrorSignUp("User signed up successfully");
    } catch (error) {
      switch (error.code) {
        case "auth/email-already-in-use":
          setErrorSignUp("The email address is already in use.");
          break;
        case "auth/invalid-email":
          setErrorSignUp("The email address is not valid.");
          break;
        case "auth/weak-password":
          setErrorSignUp("The password is too weak. Must be at least 6 characters.");
          break;
        case "auth/operation-not-allowed":
          setErrorSignUp("Email/password sign-up is disabled.");
          break;
        case "auth/too-many-requests":
          setErrorSignUp("Too many requests. Please try again later.");
          break;
        case "auth/missing-password":
          setErrorSignUp("Please enter a password");
          break;
        default:
          setErrorSignUp("An error occurred: " + error.message);
    }
  }
}else {
    console.error("Passwords don't match!");
    setErrorSignUp("Passwords don't match!");
  }
  
};

// Log in with email and password
export const logInWithEmail = async (email, password, setErrorLogin) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log("User logged in:", userCredential.user);
  } catch (error) {
    switch (error.code) {
      case "auth/user-not-found":
        setErrorLogin("No user found with this email.");
        break;
      case "auth/wrong-password":
        setErrorLogin("Incorrect password. Please try again.");
        break;
      case "auth/invalid-email":
        setErrorLogin("The email address is not valid.");
        break;
      case "auth/user-disabled":
        setErrorLogin("This user account has been disabled.");
        break;
      case "auth/too-many-requests":
        setErrorLogin("Too many login attempts. Please try again later.");
        break;
      case "auth/network-request-failed":
        setErrorLogin("Network error. Please check your connection and try again.");
        break;
      case "auth/missing-password":
        setErrorLogin("Please enter the password.");
        break;
      default:
        setErrorLogin("An error occurred: " + error.message);
    }
  }
};

// Sign in with Google
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    console.log("User logged in with Google:", result.user);
  } catch (error) {
    console.error("Error logging in with Google:", error.message);
  }
};


