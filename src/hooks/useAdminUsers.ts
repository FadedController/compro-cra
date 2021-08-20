import { useEffect, useState } from "react";
import { permissions, user } from "../types";
import { Firestore } from "../utils/firebase";

type useAdminUsersConfig = {
  permissions: permissions[];
  limit: number;
};

type useAdminUsersHook = (config: useAdminUsersConfig) => [user[], boolean];

const useAdminUsers: useAdminUsersHook = ({ limit, permissions }) => {
  const [users, setUsers] = useState<user[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsuscribe = Firestore.collection("users")
      .where("permissions", "in", permissions)
      .limit(limit)
      .onSnapshot(
        (res) => {
          setLoading(false);
          let newUsers: any[] = [];
          res.docs.forEach((doc) => {
            const docData = doc.data();
            // @ts-ignore
            newUsers.push(docData);
          });
          setUsers(newUsers);
        },
        (err) => {
          setLoading(false);
          console.error(err);
        }
      );
    return unsuscribe;
  }, [limit, permissions]);

  return [users, loading];
};

export default useAdminUsers;
