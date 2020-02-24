import axios from "axios";
import * as actionType from "../types";

import { API_ROOT } from "../../config/api-config";

const fetchStart = () => {
  return {
    type: actionType.SEND_ITEM_START
  };
};

const getItemsSuccess = items => {
  return {
    type: actionType.FETCH_ITEM_SUCCESS,
    items: items
  };
};

const createItemSuccess = message => {
  return {
    type: actionType.CREATE_ITEM_SUCCESS,
    message: message
  };
};

const updateItemSuccess = message => {
  return {
    type: actionType.UPDATE_ITEM_SUCCESS,
    message: message
  };
};

const deleteItemSuccess = (message, itemId) => {
  return {
    type: actionType.DELETE_ITEM_SUCCESS,
    message: message,
    itemId: itemId
  };
};

const fetchFail = errors => {
  return {
    type: actionType.SEND_ITEM_FAIL,
    errors: errors
  };
};

export const getItems = (page, size) => dispatch => {
  dispatch(fetchStart());
  axios
    .get(API_ROOT + `items?page=${page}&size=${size}`)
    .then(res => {
      dispatch(getItemsSuccess(res.data));
    })
    .catch(error => {
      dispatch(fetchFail(error));
    });
};

export const createItem = values => dispatch => {
  dispatch(fetchStart());
  let types = [];
  values.typeItems.map(obj => {
    return types.push({ id: obj });
  });
  const data = {
    name: values.name,
    price: values.price,
    description: values.description,
    quantityStock: values.quantityStock,
    typeItems: types
  };
  axios
    .post(API_ROOT + "items", data)
    .then(res => {
      dispatch(createItemSuccess(res.data.message));
    })
    .catch(error => {
      const resError = error.response.data;
      dispatch(fetchFail(resError.errors));
    });
};

export const updateItem = (itemId, values) => dispatch => {
  dispatch(fetchStart());
  let types = [];
  values.typeItems.map(obj => {
    return types.push({ id: obj });
  });
  const data = {
    id: itemId,
    name: values.name,
    price: values.price,
    description: values.description,
    quantityStock: values.quantityStock,
    typeItems: types
  };

  axios
    .put(API_ROOT + `items/${itemId}`, data)
    .then(res => {
      dispatch(updateItemSuccess(res.data.message));
    })
    .catch(error => {
      const resError = error.response.data;
      dispatch(fetchFail(resError.errors));
    });
};

export const deleteItem = itemId => dispatch => {
  dispatch(fetchStart());
  axios
    .delete(API_ROOT + `items/${itemId}`)
    .then(res => {
      dispatch(deleteItemSuccess(res.data.message, itemId));
    })
    .catch(error => {
      dispatch(fetchFail(error));
    });
};

export const clearMessage = () => dispatch => {
  dispatch({ type: actionType.CLEAR_MESSAGE_ITEM });
};

export const clearErrors = () => dispatch => {
  dispatch({ type: actionType.CLEAR_ERRORS_ITEM });
};
