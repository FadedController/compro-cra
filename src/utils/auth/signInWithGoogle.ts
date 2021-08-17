import { Auth, Firebase } from "../firebase";

export const signInWithGoogle = () => {
  const provider = new Firebase.auth.GoogleAuthProvider();
  return Auth.signInWithPopup(provider);
};
