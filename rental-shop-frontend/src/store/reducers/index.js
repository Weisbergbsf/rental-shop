import { combineReducers } from "redux";

import customerReducer from "./customerReducer";
import typeItemsReducer from "./typeItemsReducer";

export default combineReducers({
  customers: customerReducer,
  typeItems: typeItemsReducer
});
