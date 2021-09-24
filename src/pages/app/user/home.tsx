import React, { useContext } from "react";
import { Heading, NewTicket, Text } from "../../../components/tickets";
import { UserDataContext } from "../../../components/tickets/PageWrapper";
import TicketList from "../../../components/tickets/TicketList";

const UserHome: React.FC = () => {
  const [user] = useContext(UserDataContext);

  return (
    <div className="flex flex-col space-y-3" id="test">
      <Heading>Hola, {user?.displayName?.split(" ")[0]}</Heading>
      <Text>Aqui encontrarás los tickets que has creado</Text>
      <TicketList
        config={{
          email: user?.email || "",
          limit: 15,
          status: ["ongoing", "pending"],
        }}
      />
      <NewTicket />
    </div>
  );
};

export default UserHome;
