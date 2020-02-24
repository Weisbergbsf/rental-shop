import { combineReducers } from "redux";

import customerReducer from "./customerReducer";
import typeItemsReducer from "./typeItemsReducer";
import itemsReducer from "./itemsReducer";

export default combineReducers({
  customers: customerReducer,
  typeItems: typeItemsReducer,
  items: itemsReducer
});
