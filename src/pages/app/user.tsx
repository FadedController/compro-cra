import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Redirect } from "react-router-dom";
import { FullscreenLoading } from "../../components/tickets";
import { useRedirect, useUser } from "../../hooks";
import { Auth } from "../../utils/firebase";

const UserPage: React.FC = () => {
  const [auth, authLoading] = useAuthState(Auth);
  const email = authLoading ? "" : auth?.email;
  const [user, userLoading, logout] = useUser(email);
  // eslint-disable-next-line
  const [redirectUrl, _, redirectLoading] = useRedirect(user, userLoading);

  return (
    <div>
      <FullscreenLoading shown={redirectLoading} />
      {redirectUrl && <Redirect to={redirectUrl} />}
      {!redirectLoading && (
        <button onClick={logout}>This is the user page</button>
      )}
    </div>
  );
};

export default UserPage;
