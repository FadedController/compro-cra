import React from "react";
import { Redirect, useLocation } from "react-router-dom";
import { Heading, TicketScreen } from "../../../components";

const TicketPage: React.FC = () => {
  const { pathname } = useLocation();
  const splitPath = pathname.split("/");
  const redirect =
    splitPath[splitPath.length - 1] === "ticket" ? "/app/admin" : "";
  const ticketId = splitPath[splitPath.length - 1];

  return (
    <div className="flex flex-col space-y-6">
      {redirect && <Redirect to={redirect} />}
      <Heading>Informacion de Ticket</Heading>
      <TicketScreen ticketId={ticketId} />
    </div>
  );
};

export default TicketPage;
