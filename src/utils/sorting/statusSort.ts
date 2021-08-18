import { ticket } from "../../types";

export const statusSort = (a: ticket, b: ticket) => {
  const statusMap = {
    ongoing: 0,
    pending: 1,
    done: 2,
  };

  // @ts-ignore
  if (statusMap[a?.status] > statusMap[b?.status]) return 1;
  // @ts-ignore
  if (statusMap[a?.status] < statusMap[b?.status]) return -1;
  return 0;
};

export const invertedStatusSort = (a: ticket, b: ticket) => {
  const statusMap = {
    ongoing: 0,
    pending: 1,
    done: 2,
  };

  // @ts-ignore
  if (statusMap[a?.status] > statusMap[b?.status]) return -1;
  // @ts-ignore
  if (statusMap[a?.status] < statusMap[b?.status]) return 1;
  return 0;
};
