import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useTicketId } from "../hooks";
import { ticket } from "../types";
import { Firestore } from "../utils/firebase";
import Button from "./Button";
import { priorityMap } from "./Priority";
import Subheading from "./Subheading";
import Text from "./Text";
import UserRedirect from "./UserRedirect";

interface ticketScreenProps {
  ticketId: string;
}

const TicketScreen: React.FC<ticketScreenProps> = ({ ticketId }) => {
  const [dbTicket, dbTicketLoading] = useTicketId(ticketId);
  const [ticket, setTicket] = useState<ticket>(dbTicket);
  const [hasUpdated, setHasUpdated] = useState(false);
  const [updatedLoading, setUpdatedLoading] = useState(false);

  useEffect(() => {
    setTicket(dbTicket);
  }, [dbTicket]);

  const updateTickets = () => {
    setUpdatedLoading(true);
    Firestore.collection("tickets")
      .doc(ticketId)
      .update(ticket || {})
      .then(() => {
        setHasUpdated(false);
        setUpdatedLoading(false);
      });
  };

  const discardChanges = () => {
    setTicket(dbTicket);
    setHasUpdated(false);
  };

  return (
    <div>
      {dbTicketLoading ? (
        <div className="spinner-1"></div>
      ) : (
        <>
          {ticket ? (
            <div className="max-w-2xl flex flex-col space-y-3">
              <div className="grid grid-cols-2 gap-y-2">
                <div>
                  <Subheading>Creado Por</Subheading>
                  <UserRedirect
                    name
                    className="font-poppins text-xl hover:bg-gray-100 rounded-xl"
                    email={ticket.createdBy}
                  />
                </div>
                <div>
                  <Subheading>Asignado a</Subheading>
                  <UserRedirect
                    name
                    className="font-poppins text-xl hover:bg-gray-100 rounded-xl"
                    email={ticket.asignedTo}
                  />
                </div>
                <div>
                  <Subheading>Estado</Subheading>
                  <select
                    className="font-poppins text-darkBlue text-xl rounded-xl hover:bg-gray-100"
                    value={ticket.status}
                    onChange={({ target }) => {
                      setHasUpdated(true);
                      // @ts-ignore
                      setTicket({ ...ticket, status: target.value });
                    }}
                  >
                    <option value="pending">Pendiente</option>
                    <option value="ongoing">En progreso</option>
                    <option value="done">Resuelto</option>
                  </select>
                </div>
                <div>
                  <Subheading>Prioridad</Subheading>
                  <div className="flex items-center space-x-2">
                    <div
                      className={`${
                        priorityMap[ticket.priority][1]
                      } rounded-full h-2 w-2`}
                    ></div>
                    <select
                      className="font-poppins text-darkBlue text-xl rounded-xl hover:bg-gray-100"
                      value={ticket.priority}
                      onChange={({ target }) => {
                        setHasUpdated(true);
                        // @ts-ignore
                        setTicket({ ...ticket, priority: target.value });
                      }}
                    >
                      <option value="low">Baja</option>
                      <option value="medium">Media</option>
                      <option value="high">Alta</option>
                      <option value="critic">Critica</option>
                    </select>
                  </div>
                </div>
                <div className="flex flex-col space-y-1">
                  <Subheading>Departamento</Subheading>
                  <Text>{ticket.department}</Text>
                </div>
                <div className="flex flex-col space-y-1">
                  <Subheading>Fecha de creacion</Subheading>
                  <Text>{new Date(ticket.createdAt).toLocaleDateString()}</Text>
                </div>
                <div className="flex flex-col space-y-1">
                  <Subheading>Asunto</Subheading>
                  <Text>{ticket.category}</Text>
                </div>
                <div className="flex flex-col space-y-1">
                  <Subheading>Ticket ID</Subheading>
                  <Text>{ticket.ticketId}</Text>
                </div>
              </div>
              <div>
                <Subheading>Descripcion</Subheading>
                <Text>{ticket.description}</Text>
              </div>
              <div className="flex space-x-4 mt-8">
                <Button dark normalWidth onClick={updateTickets}>
                  {updatedLoading ? (
                    <div className="small-spinner"></div>
                  ) : (
                    "Guardar Cambios"
                  )}
                </Button>
                {hasUpdated && (
                  <Button normalWidth onClick={discardChanges}>
                    Descartar Cambios
                  </Button>
                )}
              </div>
            </div>
          ) : (
            <div>There was an error</div>
          )}
        </>
      )}
    </div>
  );
};

export default TicketScreen;
