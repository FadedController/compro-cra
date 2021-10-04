import React, { useContext, useEffect, useState } from "react";
import { Redirect, useLocation } from "react-router";
import { FullscreenLoading } from "../../../components/tickets";
import { UserDataContext } from "../../../components/tickets/PageWrapper";
import { useTicketId } from "../../../hooks";

const UserTicket: React.FC = () => {
  const { pathname } = useLocation();
  const pathSplit = pathname.split("/");
  const ticketId = pathSplit[pathSplit.length - 1];
  const [ticket, ticketLoading] = useTicketId(ticketId);
  const [user, userLoading] = useContext(UserDataContext);
  const [redirectUrl, setRedirectUrl] = useState<string>("");

  useEffect(() => {
    if (!ticketLoading && !userLoading) {
      if (user && ticket) {
        if (user?.email !== ticket?.createdBy) setRedirectUrl("/app/user");
      }
    }
  }, [ticket, ticketLoading, user, userLoading]);

  return (
    <div>
      <FullscreenLoading shown={ticketLoading} />
      {redirectUrl && <Redirect to={redirectUrl} />}
      <h1>This is the ticket components</h1>
      <p>{ticketId}</p>
    </div>
  );
};

export default UserTicket;
