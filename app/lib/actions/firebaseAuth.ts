import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "@/firebase";

const provider = new GoogleAuthProvider();

export async function signInWithGoogle() {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    console.log(user);
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
