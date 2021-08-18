import { ticket } from "../../types";

export const prioritySort = (a: ticket, b: ticket) => {
  const priorityMap = {
    low: 0,
    medium: 1,
    high: 2,
    critic: 3,
  };

  // @ts-ignore
  if (priorityMap[a?.priority] > priorityMap[b?.priority]) return 1;
  // @ts-ignore
  if (priorityMap[a?.priority] < priorityMap[b?.priority]) return -1;
  return 0;
};

export const invertedPrioritySort = (a: ticket, b: ticket) => {
  const priorityMap = {
    low: 0,
    medium: 1,
    high: 2,
    critic: 3,
  };

  // @ts-ignore
  if (priorityMap[a?.priority] > priorityMap[b?.priority]) return -1;
  // @ts-ignore
  if (priorityMap[a?.priority] < priorityMap[b?.priority]) return 1;
  return 0;
};
