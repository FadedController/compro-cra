import { useEffect, useState } from "react";
import { status, ticket } from "../types";
import { Firestore } from "../utils/firebase";

type useUserTicketConfig = {
  email: string | undefined;
  status: status[];
  limit: number;
};

type useUserTicketHook = (config: useUserTicketConfig) => [ticket[], boolean];

/**
 * Returns all of the tickets that match the createdBy email and statuses
 * @param config
 * @returns [ticket[], boolean]
 */
const useUserTickets: useUserTicketHook = ({ email, limit, status }) => {
  const [tickets, setTickets] = useState<ticket[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (email && limit && !!status.length) {
      Firestore.collection("tickets")
        .where("createdBy", "==", email)
        .where("status", "in", status)
        .limit(limit)
        .orderBy("createdAt", "desc")
        .get()
        .then((res) => {
          const documents = res.docs;
          let newTickets: any[] = [];
          documents.forEach((doc) => {
            const documentData = doc.data();
            newTickets.push(documentData);
          });
          setTickets(newTickets);
        })
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    }
  }, [limit, email, status]);

  return [tickets, loading];
};

export default useUserTickets;
