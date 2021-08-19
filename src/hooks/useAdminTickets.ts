import { useEffect, useState } from "react";
import { status, ticket } from "../types";
import { Firestore } from "../utils/firebase";

type useAdminTicketConfig = {
  email: string | undefined;
  status: status[];
  limit: number;
};
type useAdminTicketHook = (config: useAdminTicketConfig) => [ticket[], boolean];

const useAdminTickets: useAdminTicketHook = (config) => {
  const [tickets, setTickets] = useState<ticket[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsuscribe = Firestore.collection("tickets")
      .where("asignedTo", "==", config.email) // all tickets that match asigned email
      .where("status", "in", config.status) // all tickets that match any of given status
      .limit(config.limit)
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
    return unsuscribe;
    // eslint-disable-next-line
  }, [config.limit]);

  return [tickets, loading];
};

export default useAdminTickets;
