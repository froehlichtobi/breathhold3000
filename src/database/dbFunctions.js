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

const checkForUser = async (userUid) => {
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
  } catch (error) {
    console.error("Error checking user in Firestore:", error);
  }
};

export default checkForUser;
/*
const docRef = doc(db, "userData", "user0");
const docSnap = await getDoc(docRef);

const saveAccountInDatabase = (userUid) => {
  console.log("test" + userUid);
};

export default saveAccountInDatabase;

/* const fetchData = async () => {
    const docRef = doc(db, "userData", "user0");
    const docSnap = await getDoc(docRef);
  };

  console.log(
    "HALLO DAS HIER IST DAS: " +
      docSnap.data().currentTrainingTime +
      "s UND HIER HÖRTS AUF"
  ); */
