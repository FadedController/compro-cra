import React from "react";
import { priority } from "../types";

interface priorityProps {
  priority: priority | undefined;
}

export const priorityMap = {
  low: ["Baja", "bg-green-400"],
  medium: ["Media", "bg-yellow-400"],
  high: ["Alta", "bg-orange-500"],
  critic: ["Critica", "bg-red-500"],
};

const Priority: React.FC<priorityProps> = ({ priority }) => {
  return (
    <div className="flex items-center space-x-2">
      {priority && (
        <div
          className={`${priorityMap[priority][1]} rounded-full h-2 w-2`}
        ></div>
      )}
      {priority && <p>{priorityMap[priority][0]}</p>}
    </div>
  );
};

export default Priority;
