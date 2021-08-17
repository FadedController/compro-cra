import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Redirect, Route, Switch } from "react-router-dom";
import { FullscreenLoading, Sidebar } from "../../components";
import { useRedirect, useUser } from "../../hooks";
import { Auth } from "../../utils/firebase";

const AdminPage: React.FC = () => {
  const [auth, authLoading] = useAuthState(Auth);
  const email = authLoading ? "" : auth?.email;
  const [user, userLoading, logout] = useUser(email);
  // eslint-disable-next-line
  const [redirectUrl, _, redirectLoading] = useRedirect(user, userLoading);

  return (
    <div className="flex">
      <FullscreenLoading shown={redirectLoading} />
      {redirectUrl && <Redirect to={redirectUrl} />}
      {!redirectLoading && (
        <>
          <Sidebar admin logout={logout} />
          <div className="w-full h-screen overflow-auto">
            <Switch>
              <Route path="/app/admin/pending">Pending</Route>
              <Route path="/app/admin/history">History</Route>
              <Route path="/app/admin/account">Account</Route>
              <Route path="/app/admin/users">Users</Route>
              <Route path="/app/admin/appearence">Appearence</Route>
              <Route exact path="/app/admin/">
                Home
              </Route>
              <Route path="*">
                <Redirect to="/app/admin/" />
              </Route>
            </Switch>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminPage;
