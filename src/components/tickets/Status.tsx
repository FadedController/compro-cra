import React from "react";
import { status } from "../../types";

interface statusProps {
  status: status | undefined;
}

const Status: React.FC<statusProps> = ({ status }) => {
  const statusMap = {
    pending: "Pendiente",
    ongoing: "En progreso",
    done: "Resuelto",
  };
  if (status) {
    return <p>{statusMap[status]}</p>;
  }
  return <p></p>;
};

export default Status;
