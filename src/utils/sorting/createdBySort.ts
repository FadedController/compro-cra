import { ticket } from "../../types";

var reA = /[^a-zA-Z]/g;
var reN = /[^0-9]/g;

// https://stackoverflow.com/questions/4340227/sort-mixed-alpha-numeric-array

export const createdBySort = (a: ticket, b: ticket) => {
  // @ts-ignore
  var aA = a?.createdBy.replace(reA, "");
  // @ts-ignore
  var bA = b?.createdBy.replace(reA, "");
  if (aA === bA) {
    // @ts-ignore
    var aN = parseInt(a?.createdBy.replace(reN, ""), 10);
    // @ts-ignore
    var bN = parseInt(b?.createdBy.replace(reN, ""), 10);
    return aN === bN ? 0 : aN > bN ? 1 : -1;
  } else {
    // @ts-ignore
    return aA > bA ? 1 : -1;
  }
};

export const invertedCreatedBySort = (a: ticket, b: ticket) => {
  // @ts-ignore
  var aA = a?.createdBy.replace(reA, "");
  // @ts-ignore
  var bA = b?.createdBy.replace(reA, "");
  if (aA === bA) {
    // @ts-ignore
    var aN = parseInt(a?.createdBy.replace(reN, ""), 10);
    // @ts-ignore
    var bN = parseInt(b?.createdBy.replace(reN, ""), 10);
    return aN === bN ? 0 : aN > bN ? -1 : 1;
  } else {
    // @ts-ignore
    return aA > bA ? -1 : 1;
  }
};
