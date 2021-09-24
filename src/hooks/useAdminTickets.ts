import { useEffect, useState } from "react";
import { status, ticket } from "../types";
import { Firestore } from "../utils/firebase";

type useAdminTicketConfig = {
  email: string | undefined;
  status: status[];
  limit: number;
};

type useAdminTicketHook = (config: useAdminTicketConfig) => [ticket[], boolean];

/**
 * Returns all of the tickets that match the asigned email and statuses
 * @param config
 * @returns [ticket[], boolean]
 */
const useAdminTickets: useAdminTicketHook = ({ email, limit, status }) => {
  const [tickets, setTickets] = useState<ticket[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsuscribe;
    if (email && limit && !!status.length) {
      unsuscribe = Firestore.collection("tickets")
        .where("asignedTo", "==", email) // all tickets that match asigned email
        .where("status", "in", status) // all tickets that match any of given status
        .limit(limit)
        .orderBy("createdAt", "desc")
        .onSnapshot(
          (res) => {
            setLoading(false);
            let newTickets: any[] = [];
            res.docs.forEach((doc) => {
              const docData = doc.data();
              // @ts-ignore
              newTickets.push(docData);
            });
            setTickets(newTickets);
          },
          (err) => {
            setLoading(false);
            console.error(err);
          }
        );
    }
    return unsuscribe;
  }, [limit, email, status]);

  return [tickets, loading];
};

export default useAdminTickets;
