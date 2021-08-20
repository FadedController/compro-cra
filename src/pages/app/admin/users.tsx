import React from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import {
  Heading,
  UserScreen,
  UsersDashboard,
} from "../../../components/tickets";

const AdminUsers: React.FC = () => {
  const { pathname } = useLocation();
  const pathSplit = pathname.split("/");
  const uid = pathSplit[pathSplit.length - 1];

  return (
    <Switch>
      <Route exact path="/app/admin/users/">
        <div className="flex flex-col space-y-6">
          <Heading>Usuarios</Heading>
          <UsersDashboard permissions={["admin", "user"]} />
        </div>
      </Route>
      <Route path="/app/admin/users/">
        <UserScreen uid={uid} />
      </Route>
    </Switch>
  );
};

export default AdminUsers;
