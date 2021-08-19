import React, { useContext } from "react";
import { Heading, TicketDashboard } from "../../../components/tickets";
import { UserDataContext } from "../../../components/tickets/PageWrapper";

const AdminPending: React.FC = () => {
  const [user] = useContext(UserDataContext);
  return (
    <div className="flex flex-col space-y-6">
      <Heading>Pendientes</Heading>
      <TicketDashboard
        config={{
          limit: 25,
          status: ["pending"],
          email: user?.email,
        }}
      ></TicketDashboard>
    </div>
  );
};

export default AdminPending;
