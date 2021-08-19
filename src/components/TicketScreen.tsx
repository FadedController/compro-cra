import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useTicketId } from "../hooks";
import { ticket } from "../types";
import { Firestore } from "../utils/firebase";
import Button from "./Button";
import NotificationOverlay from "./NotificationOverlay";
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
  const [notification, setNotification] = useState("");
  const [notificationState, setNotificationState] = useState(false);

  useEffect(() => {
    setTicket(dbTicket);
  }, [dbTicket]);

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(`https://comprov.com/app/admin/ticket/${ticketId}`)
      .then(() => {
        setNotificationState(true);
        setNotification("Link copiado al portapapeles");
      });
  };

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
              <NotificationOverlay
                closeFx={() => setNotificationState(false)}
                notificationText={notification}
                notificationState={notificationState}
              />
              <div className="grid grid-cols-2 gap-y-2">
                <div>
                  <Subheading>Creado Por</Subheading>
                  <UserRedirect
                    name
                    className="font-poppins bg-transparent text-xl hover:bg-gray-100 rounded-xl"
                    email={ticket.createdBy}
                  />
                </div>
                <div>
                  <Subheading>Asignado a</Subheading>
                  <UserRedirect
                    name
                    className="font-poppins bg-transparent text-xl hover:bg-gray-100 rounded-xl"
                    email={ticket.asignedTo}
                  />
                </div>
                <div>
                  <Subheading>Estado</Subheading>
                  <select
                    className="font-poppins text-darkBlue text-xl rounded-xl bg-white hover:bg-gray-100"
                    value={ticket.status}
                    onChange={({ target }) => {
                      setHasUpdated(true);
                      // @ts-ignore
                      setTicket({ ...ticket, status: target.value });
                    }}
                  >
                    <option className="bg-white" value="pending">
                      Pendiente
                    </option>
                    <option className="bg-white" value="ongoing">
                      En progreso
                    </option>
                    <option className="bg-white" value="done">
                      Resuelto
                    </option>
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
                      className="font-poppins text-darkBlue text-xl rounded-xl bg-white hover:bg-gray-100"
                      value={ticket.priority}
                      onChange={({ target }) => {
                        setHasUpdated(true);
                        // @ts-ignore
                        setTicket({ ...ticket, priority: target.value });
                      }}
                    >
                      <option className="bg-white" value="low">
                        Baja
                      </option>
                      <option className="bg-white" value="medium">
                        Media
                      </option>
                      <option className="bg-white" value="high">
                        Alta
                      </option>
                      <option className="bg-white" value="critic">
                        Critica
                      </option>
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
                <div
                  className="flex flex-col space-y-1 hover:bg-gray-100 rounded-xl cursor-pointer transition-colors"
                  onClick={copyToClipboard}
                >
                  <div className="flex space-x-2 items-center">
                    <Subheading>Ticket ID</Subheading>
                    <span className="material-icons text-lightBlue text-sm">
                      content_paste
                    </span>
                  </div>
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
