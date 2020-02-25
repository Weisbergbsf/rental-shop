import { combineReducers } from "redux";

import customerReducer from "./customerReducer";
import typeItemsReducer from "./typeItemsReducer";
import itemsReducer from "./itemsReducer";
import contractsReducer from "./contractsReducer";

export default combineReducers({
  customers: customerReducer,
  typeItems: typeItemsReducer,
  items: itemsReducer,
  contracts: contractsReducer
});
