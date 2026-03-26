import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth, db } from "@/firebase";
import { doc, setDoc } from "firebase/firestore";

const provider = new GoogleAuthProvider();

export async function signInWithGoogle() {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    await setDoc(
      doc(db, "users", user.uid),
      {
        name: user.displayName,
        email: user.email,
      },
      { merge: true },
    );
  } catch (error) {
    console.log(error);
  }
}

export async function signout() {
  try {
    await signOut(auth);
  } catch (error) {
    console.log(error);
  }
}
