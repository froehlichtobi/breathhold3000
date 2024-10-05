import {
  collection,
  addDoc,
  getDoc,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "./dbFirestore";

const checkForUser = async (userUid, setUsername) => {
  const docRef = doc(db, "userData", userUid);

  try {
    // Fetch the document
    const docSnap = await getDoc(docRef);

    // Check if the document exists
    if (docSnap.exists()) {
      console.log("User already exists in the database:", docSnap.data());
    } else {
      console.log("User does not exist, creating a new user in the database.");
      // Create a new document with default values
      await setDoc(docRef, {
        UID: userUid,
        username: "", // Set a default username or use a parameter to pass the username
        currentTrainingTime: 60, // Default value
        trainingTimes: [], // Default array
        maxTime: 0, // Default value
        maxTimes: [], // Default array
      });
      console.log("User created in the database with default values.");
    }

    //at this point there is a document in the db of the user, now check if user has a username
    let username = docSnap.data().username;
    if (username === "") {
      setUsername(null);
    }
    setUsername(username);
  } catch (error) {
    console.error("Error checking user in Firestore:", error);
  }
};

export default checkForUser;

export const createUserName = async (userUid, username) => {
  // should not need to check if this file exists, because that already happened in prev function
  const docRef = doc(db, "userData", userUid);
  const docSnap = await getDoc(docRef);
  await updateDoc(docRef, { username: username });
};
