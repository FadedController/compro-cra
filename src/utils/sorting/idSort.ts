import { ticket } from "../../types";

var reA = /[^a-zA-Z]/g;
var reN = /[^0-9]/g;

// https://stackoverflow.com/questions/4340227/sort-mixed-alpha-numeric-array

export const idSort = (a: ticket, b: ticket) => {
  // @ts-ignore
  var aA = a?.ticketId.replace(reA, "");
  // @ts-ignore
  var bA = b?.ticketId.replace(reA, "");
  if (aA === bA) {
    // @ts-ignore
    var aN = parseInt(a?.ticketId.replace(reN, ""), 10);
    // @ts-ignore
    var bN = parseInt(b?.ticketId.replace(reN, ""), 10);
    return aN === bN ? 0 : aN > bN ? 1 : -1;
  } else {
    // @ts-ignore
    return aA > bA ? 1 : -1;
  }
};

export const invertedIdSort = (a: ticket, b: ticket) => {
  // @ts-ignore
  var aA = a?.ticketId.replace(reA, "");
  // @ts-ignore
  var bA = b?.ticketId.replace(reA, "");
  if (aA === bA) {
    // @ts-ignore
    var aN = parseInt(a?.ticketId.replace(reN, ""), 10);
    // @ts-ignore
    var bN = parseInt(b?.ticketId.replace(reN, ""), 10);
    return aN === bN ? 0 : aN > bN ? -1 : 1;
  } else {
    // @ts-ignore
    return aA > bA ? -1 : 1;
  }
};
