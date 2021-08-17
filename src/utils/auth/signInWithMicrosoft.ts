import { Auth, Firebase } from "../firebase";

export const signInWithMicrosoft = () => {
  const provider = new Firebase.auth.OAuthProvider("microsoft.com");
  return Auth.signInWithPopup(provider);
};
