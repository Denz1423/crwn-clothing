import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAux6RRUgg8IHJcNiEvd8WUoegs3I0VN8A",
  authDomain: "crwn-clothing-db-ae74e.firebaseapp.com",
  projectId: "crwn-clothing-db-ae74e",
  storageBucket: "crwn-clothing-db-ae74e.appspot.com",
  messagingSenderId: "687647004179",
  appId: "1:687647004179:web:f11b0ed5db4a0d76a991e6",
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider).catch((error) =>{
    console.log(error);
});

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.id);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, { displayName, email, createdAt });
    } catch (error) {
      console.log("Error creating the user!", error.message);
    }
  }

  return userDocRef;
};
