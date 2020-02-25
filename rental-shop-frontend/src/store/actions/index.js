import customerAction from "./customerAction";
import typeItemsAction from "./typeItemsAction";
import itemsAction from "./itemsAction";
import contractsAction from "./contractsAction";

export const actionCreators = Object.assign(
  {},
  customerAction,
  typeItemsAction,
  itemsAction,
  contractsAction
);
