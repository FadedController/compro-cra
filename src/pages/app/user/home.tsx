import React, { useContext } from "react";
import { Heading } from "../../../components/tickets";
import NewTicket from "../../../components/tickets/newTicket";
import { UserDataContext } from "../../../components/tickets/PageWrapper";

const UserHome: React.FC = () => {
  const [user] = useContext(UserDataContext);

  return (
    <div className="flex flex-col space-y-6" id="test">
      <Heading>Hola, {user?.displayName?.split(" ")[0]}</Heading>
      <NewTicket />
    </div>
  );
};

export default UserHome;
