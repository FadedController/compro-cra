import React from "react";
import { useContext } from "react";
import { Heading, TicketDashboard } from "../../../components/tickets";
import { UserDataContext } from "../../../components/tickets/PageWrapper";

const AdminHome: React.FC = () => {
  const [user] = useContext(UserDataContext);

  return (
    <div className="flex flex-col space-y-6">
      <Heading>Bienvenido, {user?.displayName?.split(" ")[0]}</Heading>
      <TicketDashboard
        config={{
          limit: 25,
          status: ["ongoing", "pending"],
          email: user?.email,
        }}
      />
    </div>
  );
};

export default AdminHome;
