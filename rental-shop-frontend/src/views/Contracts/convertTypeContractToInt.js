export const convertToInt = status => {
  let value = 2;
  if (status === "RETURNED") {
    value = 3;
  }
  if (status === "RESERVED") {
    value = 1;
  }
  if (status === "CANCELED") {
    value = 4;
  }
  return value;
};