import * as actionType from "../types";

const initialState = {
  customers: null,
  customersSelect: null,
  errors: null,
  message: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case actionType.SEND_CUSTOMER_START:
      return {
        ...state,
        loading: true
      };
    case actionType.SEND_CUSTOMER_FAIL:
      return {
        ...state,
        errors: action.errors,
        loading: false
      };
    case actionType.FETCH_CUSTOMER_SUCCESS:
      return {
        ...state,
        customers: action.customers,
        errors: null,
        loading: false
      };
    case actionType.FETCH_CUSTOMER_DTO_SUCCESS:
      return {
        ...state,
        customersSelect: action.customersSelect,
        errors: null,
        loading: false
      };
    case actionType.CREATE_CUSTOMER_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.message
      };
    case actionType.DELETE_CUSTOMER_SUCCESS:
      return {
        ...state,
        message: action.message,
        loading: false,
        customers: {
          ...state.customers,
          elements: state.customers.elements.filter(
            customer => customer.id !== action.customerId
          )
        }
      };
    case actionType.UPDATE_CUSTOMER_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.message
      };
    case actionType.CLEAR_MESSAGE_CUSTOMER:
      return {
        ...state,
        message: null
      };
    case actionType.CLEAR_ERRORS_CUSTOMER:
      return {
        ...state,
        errors: null
      };

    default:
      return state;
  }
}
