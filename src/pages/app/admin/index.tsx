import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Redirect, Route, Switch } from "react-router-dom";
import { FullscreenLoading, PageWrapper, Sidebar } from "../../../components";
import { useRedirect, useUser } from "../../../hooks";
import { Auth } from "../../../utils/firebase";
import AdminAccount from "./account";
import AdminHistory from "./history";
import AdminHome from "./home";
import AdminPending from "./pending";
import AdminUsers from "./users";

const AdminPage: React.FC = () => {
  const [auth, authLoading] = useAuthState(Auth);
  const email = authLoading ? "" : auth?.email;
  const [user, userLoading, logout] = useUser(email);
  // eslint-disable-next-line
  const [redirectUrl, _, redirectLoading] = useRedirect(user, userLoading);

  return (
    <div className="flex">
      <FullscreenLoading shown={redirectLoading || userLoading} />
      {redirectUrl && <Redirect to={redirectUrl} />}
      {!redirectLoading && !userLoading && (
        <>
          <Sidebar admin logout={logout} />
          <div className="w-full h-screen overflow-auto">
            <PageWrapper userData={[user, userLoading, logout]}>
              <Switch>
                <Route path="/app/admin/pending" component={AdminPending} />
                <Route path="/app/admin/history" component={AdminHistory} />
                <Route path="/app/admin/account" component={AdminAccount} />
                <Route path="/app/admin/users" component={AdminUsers} />
                <Route path="/app/admin/appearence">Appearence</Route>
                <Route exact path="/app/admin/" component={AdminHome} />
                <Route path="*">
                  <Redirect to="/app/admin" />
                </Route>
              </Switch>
            </PageWrapper>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminPage;
