import React from "react";
import { useContext } from "react";
import { Heading, TicketDashboard } from "../../../components";
import { UserDataContext } from "../../../components/PageWrapper";

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
      ></TicketDashboard>
    </div>
  );
};

export default AdminHome;
