import * as actionType from "../types";

const initialState = {
  typeItems: null,
  errors: null,
  message: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case actionType.SEND_TYPE_ITEM_START:
      return {
        ...state,
        loading: true
      };
    case actionType.SEND_TYPE_ITEM_FAIL:
      return {
        ...state,
        errors: action.errors,
        loading: false
      };
    case actionType.FETCH_TYPE_ITEM_SUCCESS:
      return {
        ...state,
        typeItems: action.typeItems,
        errors: null,
        loading: false
      };
    case actionType.CREATE_TYPE_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.message
      };
    case actionType.DELETE_TYPE_ITEM_SUCCESS:
      return {
        ...state,
        message: action.message,
        loading: false,
        typeItems: {
          ...state.typeItems,
          elements: state.typeItems.elements.filter(
            typeItem => typeItem.id !== action.typeItemId
          )
        }
      };
    case actionType.UPDATE_TYPE_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.message
      };
    case actionType.CLEAR_MESSAGE_TYPE_ITEM:
      return {
        ...state,
        message: null
      };
    case actionType.CLEAR_ERRORS_TYPE_ITEM:
      return {
        ...state,
        errors: null
      };

    default:
      return state;
  }
}
