import { useEffect, useState } from "react";
import { ticket } from "../types";
import { Firebase, Firestore } from "../utils/firebase";

type useTicketIdHook = (
  ticketId: string
) => [ticket, boolean, Firebase.firestore.FirestoreError | null];

const useTicketId: useTicketIdHook = (ticketId) => {
  const [ticket, setTicket] = useState<ticket>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Firebase.firestore.FirestoreError | null>(
    null
  );

  useEffect(() => {
    const unsubscribe = Firestore.collection("tickets")
      .doc(ticketId)
      .onSnapshot(
        (res) => {
          setLoading(false);
          // @ts-ignore
          setTicket(res.data());
        },
        (err) => {
          setLoading(false);
          setError(err);
        }
      );
    return unsubscribe;
  }, [ticketId]);

  return [ticket, loading, error];
};

export default useTicketId;
