import { useEffect, useState } from "react";
import { user } from "../types";
import { signOut } from "../utils/auth";
import { Firestore } from "../utils/firebase";

export type userData = [user, boolean, () => void];

type useUserHook = (email: string | undefined | null) => userData;

const useUser: useUserHook = (email) => {
  const [user, setUser] = useState<user>(null);
  const [loading, setLoading] = useState(true);

  const logout = () => {
    setUser(null);
    setLoading(false);
    signOut();
  };

  useEffect(() => {
    const unsuscribe = Firestore.collection("users")
      .doc(email || "no-doc")
      .onSnapshot(
        (res) => {
          //@ts-ignore
          setUser(res.data());
          setLoading(false);
        },
        (err) => {
          setLoading(false);
          console.error(err);
        }
      );
    return unsuscribe;
  }, [email]);

  return [user, loading, logout];
};

export default useUser;
