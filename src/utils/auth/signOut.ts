import { Auth } from "../firebase";

export const signOut = () => {
  Auth.signOut();
};
