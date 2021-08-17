import { useEffect, useState } from "react";
import { user } from "../types";
import { signOut } from "../utils/auth";
import { Firestore } from "../utils/firebase";

type useUserHook = (
  email: string | undefined | null
) => [user, boolean, () => void];

const useUser: useUserHook = (email) => {
  const [user, setUser] = useState<user>(null);
  const [loading, setLoading] = useState(true);

  const logout = () => {
    setUser(null);
    setLoading(false);
    signOut();
  };

  useEffect(() => {
    if (email) {
      Firestore.collection("users")
        .doc(email)
        .onSnapshot(
          (res) => {
            //@ts-ignore
            // I know this is fine since database and
            // Client have synced types
            setUser(res.data());
            setLoading(false);
          },
          // Detaches listener
          () => {}
        );
    }
  }, [email]);

  return [user, loading, logout];
};

export default useUser;
