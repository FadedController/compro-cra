import React, { useState } from "react";
import { Subheading, Text, Button } from ".";
import { useUserTickets } from "../../hooks";
import { status } from "../../types";
import User from "./User";

interface ticketListProps {
  config: {
    email: string;
    status: status[];
    limit: number;
  };
}

const TicketList: React.FC<ticketListProps> = ({ config }) => {
  const [limit, setLimit] = useState(config.limit);
  const [ticketList, ticketLoading] = useUserTickets({
    email: config.email,
    limit,
    status: config.status,
  });

  return (
    <div>
      {!ticketLoading && !!ticketList.length && (
        <div className="grid gap-y-3">
          {ticketList.map((ticket, i) => {
            const statusTest =
              ticket?.status === "pending" ? "Pendiente" : "En proceso";

            return (
              <div
                key={i}
                className="flex flex-col space-y-2 border border-darkBlue rounded-lg p-3"
              >
                <div className="flex space-x-2">
                  <div className="flex-1">
                    <Subheading>Asunto</Subheading>
                    <Text>{ticket?.category}</Text>
                  </div>
                  <div className="flex-1">
                    <Subheading>Status</Subheading>
                    <Text>{statusTest}</Text>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <div className="flex-1">
                    <Subheading>Responsable</Subheading>
                    <User email={ticket?.asignedTo} />
                  </div>
                  <div className="flex-1">
                    <Button>Más info</Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TicketList;
