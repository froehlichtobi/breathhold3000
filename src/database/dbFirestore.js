import { getFirestore } from "firebase/firestore";
import { app } from "../authentication/firebaseAuth";

const db = getFirestore(app);

export { db };
