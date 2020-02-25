import * as actionType from "../types";

const initialState = {
  contracts: null,
  errors: null,
  message: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case actionType.SEND_CONTRACT_START:
      return {
        ...state,
        loading: true
      };
    case actionType.SEND_CONTRACT_FAIL:
      return {
        ...state,
        errors: action.errors,
        loading: false
      };
    case actionType.FETCH_CONTRACT_SUCCESS:
      return {
        ...state,
        contracts: action.contracts,
        errors: null,
        loading: false
      };
    case actionType.CREATE_CONTRACT_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.message
      };
    case actionType.UPDATE_CONTRACT_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.message
      };
    case actionType.CLEAR_MESSAGE_CONTRACT:
      return {
        ...state,
        message: null
      };
    case actionType.CLEAR_ERRORS_CONTRACT:
      return {
        ...state,
        errors: null
      };

    default:
      return state;
  }
}
