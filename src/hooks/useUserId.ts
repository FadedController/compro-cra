import { useEffect, useState } from "react";
import { user } from "../types";
import { Firestore } from "../utils/firebase";

type useUserIdHook = (uid: string) => [user, boolean];

const useUserId: useUserIdHook = (uid) => {
  const [user, setUser] = useState<user>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsuscribe = Firestore.collection("users")
      .where("uid", "==", uid)
      .onSnapshot(
        (res) => {
          setLoading(false);
          res.forEach((doc) => {
            //@ts-ignore
            // I know this is fine since database and
            // Client have synced types
            setUser(doc.data());
          });
        },
        (err) => {
          setLoading(false);
          console.error(err);
        }
      );
    return unsuscribe;
  }, [uid]);

  return [user, loading];
};

export default useUserId;
