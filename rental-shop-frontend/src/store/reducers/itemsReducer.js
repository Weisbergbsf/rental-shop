import * as actionType from "../types";

const initialState = {
  items: null,
  errors: null,
  message: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case actionType.SEND_ITEM_START:
      return {
        ...state,
        loading: true
      };
    case actionType.SEND_ITEM_FAIL:
      return {
        ...state,
        errors: action.errors,
        loading: false
      };
    case actionType.FETCH_ITEM_SUCCESS:
      return {
        ...state,
        items: action.items,
        errors: null,
        loading: false
      };
    case actionType.CREATE_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.message
      };
    case actionType.DELETE_ITEM_SUCCESS:
      return {
        ...state,
        message: action.message,
        loading: false,
        items: {
          ...state.items,
          elements: state.items.elements.filter(
            typeItem => typeItem.id !== action.typeItemId
          )
        }
      };
    case actionType.UPDATE_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.message
      };
    case actionType.CLEAR_MESSAGE_ITEM:
      return {
        ...state,
        message: null
      };
    case actionType.CLEAR_ERRORS_ITEM:
      return {
        ...state,
        errors: null
      };

    default:
      return state;
  }
}
