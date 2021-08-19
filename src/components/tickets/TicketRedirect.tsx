import React, { useState } from "react";
import { Redirect } from "react-router-dom";

interface ticketRedirectProps {
  ticketId: string | undefined;
}

const TicketRedirect: React.FC<ticketRedirectProps> = ({ ticketId }) => {
  const [redirect, setRedirect] = useState("");

  return (
    <>
      {redirect && <Redirect to={redirect} />}
      {ticketId && (
        <button
          className="text-left w-full"
          onClick={() => setRedirect(`/app/admin/ticket/${ticketId}`)}
        >
          <p className="font-light">{ticketId}</p>
        </button>
      )}
    </>
  );
};

export default TicketRedirect;
