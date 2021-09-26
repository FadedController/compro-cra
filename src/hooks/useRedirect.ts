import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { user } from "../types";

type useRedirectHook = (
  user: user,
  userLoading: boolean
) => [string, React.Dispatch<React.SetStateAction<string>>, boolean];

const useRedirect: useRedirectHook = (user, userLoading) => {
  const { pathname } = useLocation();
  const [redirect, setRedirect] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userLoading) {
      if (user) {
        if (pathname.includes(user.permissions || "")) {
          // /app/admin/users => edge case that contains both user.permissions
          if (
            pathname.includes("admin") &&
            pathname.includes("user") &&
            user.permissions === "user"
          ) {
            setLoading(false);
            setRedirect("/app/user");
          } else {
            setLoading(false);
          }
        } else {
          if (user.permissions) {
            setLoading(false);
            setRedirect(`/app/${user.permissions}`);
          } else {
            setLoading(false);
            setRedirect("/app/login");
          }
        }
      } else {
        setLoading(false);
        setRedirect("/app/login");
      }
    } else if (pathname.includes("login")) setLoading(false);
  }, [pathname, userLoading, user]);

  return [redirect, setRedirect, loading];
};

export default useRedirect;
