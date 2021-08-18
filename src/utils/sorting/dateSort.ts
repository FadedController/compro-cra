import { ticket } from "../../types";

export const dateSort = (a: ticket, b: ticket) => {
  // @ts-ignore
  if (a?.createdAt > b?.createdAt) return -1;
  // @ts-ignore
  if (a?.createdAt < b?.createdAt) return 1;
  return 0;
};

export const invertedDateSort = (a: ticket, b: ticket) => {
  // @ts-ignore
  if (a?.createdAt > b?.createdAt) return 1;
  // @ts-ignore
  if (a?.createdAt < b?.createdAt) return -1;
  return 0;
};
