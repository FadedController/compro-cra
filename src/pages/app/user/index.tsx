import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  FullscreenLoading,
  Navbar,
  PageWrapper,
} from "../../../components/tickets";
import { useRedirect, useUser } from "../../../hooks";
import { Auth } from "../../../utils/firebase";
import UserHome from "./home";
import UserHistory from "./history";
import UserNew from "./new";
import UserTicket from "./ticket";

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
      {!redirectLoading && !userLoading && (
        <>
          <div className="w-full h-screen overflow-auto">
            <Navbar logout={logout} />
            <PageWrapper userData={[user, userLoading, logout]}>
              <Switch>
                <Route path="/app/user/history" component={UserHistory} />
                <Route path="/app/user/new" component={UserNew} />
                <Route path="/app/user/ticket" component={UserTicket} />
                <Route exact path="/app/user/" component={UserHome} />
                <Route path="*">
                  <Redirect to="/app/user" />
                </Route>
              </Switch>
            </PageWrapper>
          </div>
        </>
      )}
    </div>
  );
};

export default UserPage;
