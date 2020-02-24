import customerAction from "./customerAction";
import typeItemsAction from "./typeItemsAction";
import itemsAction from "./itemsAction";

export const actionCreators = Object.assign(
  {},
  customerAction,
  typeItemsAction,
  itemsAction
);
