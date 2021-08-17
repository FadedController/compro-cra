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
        const newPath = `/app/${user.permissions}`;
        if (pathname.includes(newPath)) {
          setLoading(false);
        } else {
          setLoading(false);
          setRedirect(newPath);
        }
      } else {
        setLoading(false);
        setRedirect("/app/login");
      }
    } else {
      if (pathname === "/app/login") {
        setLoading(false);
      }
    }
  }, [pathname, user, userLoading]);

  return [redirect, setRedirect, loading];
};

export default useRedirect;
