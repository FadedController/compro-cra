import React from "react";
import { useContext } from "react";
import { Heading, TicketDashboard } from "../../../components/tickets";
import { UserDataContext } from "../../../components/tickets/PageWrapper";

const AdminHistory: React.FC = () => {
  const [user] = useContext(UserDataContext);
  return (
    <div className="flex flex-col space-y-6">
      <Heading>Historial</Heading>
      <TicketDashboard
        config={{
          limit: 25,
          status: ["done"],
          email: user?.email,
        }}
      />
    </div>
  );
};

export default AdminHistory;
