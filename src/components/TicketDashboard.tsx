import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useAdminTickets } from "../hooks";
import { status, ticket } from "../types";
import { prioritySort, invertedPrioritySort } from "../utils/sorting";
import Priority from "./Priority";
import Status from "./Status";
import UserOverlay from "./UserOverlay";

interface ticketDashboardProps {
  config: {
    limit: number;
    status: status[];
    email: string | undefined;
  };
}

type sortingFxs = "prioritySort";

// Sorting fx's
const sortingFxMap = {
  prioritySort: [invertedPrioritySort, prioritySort],
};

const TicketDashboard: React.FC<ticketDashboardProps> = ({ config }) => {
  const [limit, setLimit] = useState(config.limit);
  const [sortingFx, setSortingFx] = useState<sortingFxs>("prioritySort");
  const [sortFxNumber, setSortFxNumber] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [dbTickets, ticketsLoading] = useAdminTickets({
    email: config.email,
    limit,
    status: config.status,
  });
  const [tickets, setTickets] = useState<ticket[]>(
    dbTickets.sort(sortingFxMap[sortingFx][sortFxNumber])
  );

  const handleSortingToggle = (selection: sortingFxs) => {
    if (sortingFx === selection) {
      setSortFxNumber(sortFxNumber ? 0 : 1);
    } else {
      setSortingFx(selection);
      setSortFxNumber(0);
    }
  };

  // update local onChange
  useEffect(() => {
    if (!ticketsLoading && !!dbTickets.length) {
      setTickets(dbTickets.sort(sortingFxMap[sortingFx][sortFxNumber]));
    }
  }, [dbTickets, ticketsLoading, sortingFx, sortFxNumber]);

  return (
    <div className="w-full bg-darkBlue rounded-xl shadow-xl pt-4 overflow-hidden">
      <div className="flex px-6">
        <div className="border flex flex-1 items-center border-white rounded-full px-4 py-2 opacity-60">
          <span className="material-icons text-white">search</span>
          <input
            className="bg-transparent h-full w-full px-2 text-white"
            value={searchQuery}
            onChange={({ target }) => setSearchQuery(target.value)}
            placeholder="Escribe una búsqueda"
          />
        </div>
      </div>
      <div className="bg-white mt-2 overflow-x-auto min-h-96">
        <table className="w-full font-poppins rounded-xl bg-white">
          <thead>
            <tr className="bg-darkBlue">
              <th className="text-left text-sm font-light text-white opacity-60 2xl:px-8 px-4 pb-2">
                <button
                  onClick={() => {
                    handleSortingToggle("prioritySort");
                  }}
                  className="flex items-center"
                >
                  <p>Prioridad</p>
                  <span
                    className={`material-icons transition-transform transform ${
                      sortingFx === "prioritySort" &&
                      sortFxNumber === 1 &&
                      "rotate-180"
                    }`}
                  >
                    expand_more
                  </span>
                </button>
              </th>
              <th className="text-left text-sm font-light text-white opacity-60 2xl:px-8 px-4 pb-2">
                <div className="flex items-center">
                  <p>ID</p>
                  <span className="material-icons">expand_more</span>
                </div>
              </th>
              <th className="text-left text-sm font-light text-white opacity-60 2xl:px-8 px-4 pb-2">
                <div className="flex items-center">
                  <p>Usuario</p>
                  <span className="material-icons">expand_more</span>
                </div>
              </th>
              <th className="text-center text-sm font-light text-white opacity-60 2xl:px-8 px-4 pb-2">
                <div className="flex items-center justify-center">
                  <p>Estado</p>
                  <span className="material-icons">expand_more</span>
                </div>
              </th>
              <th className="text-center text-sm font-light text-white opacity-60 2xl:px-8 px-4 pb-2">
                <div className="flex items-center justify-center">
                  <p>Fecha</p>
                  <span className="material-icons">expand_more</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {!ticketsLoading &&
              tickets &&
              tickets.map((ticket, idx) => {
                const isTop = idx === 0 ? true : false;
                const isBottom = tickets.length - 1 === idx ? true : false;
                return (
                  <tr
                    className={`bg-white cursor-default mt-2 rounded-xl ${
                      isTop && "rounded-t-xl"
                    } ${isBottom && "rounded-b-xl"}`}
                    key={idx}
                  >
                    <td className="2xl:px-8 px-4 py-2 border text-base font-light text-darkBlue border-b-lightBlue border-r-white">
                      <Priority priority={ticket?.priority} />
                    </td>
                    <td className="2xl:px-8 px-4 py-2 border text-base font-light text-darkBlue border-b-lightBlue border-r-white">
                      {ticket?.ticketId}
                    </td>
                    <td className="2xl:px-8 px-4 border text-base font-light text-darkBlue border-b-lightBlue border-r-white rounded-xl hover:bg-gray-200 transition-colors">
                      <UserOverlay email={ticket?.createdBy} />
                    </td>
                    <td className="2xl:px-8 px-4 py-2 text-center border text-base font-light text-darkBlue border-b-lightBlue border-r-white">
                      <Status status={ticket?.status} />
                    </td>
                    <td className="2xl:px-8 px-4 py-2 text-center border text-base font-light text-darkBlue border-b-lightBlue border-r-white">
                      {ticket?.createdAt &&
                        new Date(ticket.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      <div className="w-full bg-darkBlue py-3 px-12 flex space-x-16 justify-end">
        <div className="flex items-center space-x-4">
          <p className="text-left text-sm font-light text-white opacity-60">
            Elementos por página:
          </p>
          <select
            value={limit}
            onChange={({ target }) => setLimit(parseInt(target.value))}
            className="px-2 flex items-center justify-center py-1 rounded-full text-sm bg-lightBlue text-white"
          >
            <option value={"10"}>10</option>
            <option value={"25"}>25</option>
            <option value={"50"}>50</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default TicketDashboard;
