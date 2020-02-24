import axios from "axios";
import * as actionType from "../types";

import { API_ROOT } from "../../config/api-config";

const fetchStart = () => {
  return {
    type: actionType.SEND_TYPE_ITEM_START
  };
};

const getTypeItemsSuccess = typeItems => {
  return {
    type: actionType.FETCH_TYPE_ITEM_SUCCESS,
    typeItems: typeItems
  };
};

const createTypeItemsSuccess = message => {
  return {
    type: actionType.CREATE_TYPE_ITEM_SUCCESS,
    message: message
  };
};

const updateTypeItemSuccess = message => {
  return {
    type: actionType.UPDATE_TYPE_ITEM_SUCCESS,
    message: message
  };
};

const deleteTypeItemSuccess = (message, typeItemId) => {
  return {
    type: actionType.DELETE_TYPE_ITEM_SUCCESS,
    message: message,
    typeItemId: typeItemId
  };
};

const fetchFail = errors => {
  return {
    type: actionType.SEND_TYPE_ITEM_FAIL,
    errors: errors
  };
};

export const getTypeItems = (page, size) => dispatch => {
  let response = {
    offset: 0,
    limit: 0,
    totalElements: 0,
    elements: []
  };
  dispatch(fetchStart());
  axios
    .get(API_ROOT + `type-itens?page=${page}&size=${size}`)
    .then(res => {
      response.offset = res.data.offset;
      response.limit = res.data.limit;
      response.totalElements = res.data.totalElements;
      response.elements = res.data.elements.map(obj => {
        obj["key"] = obj.id;
        return obj;
      });
      dispatch(getTypeItemsSuccess(res.data));
    })
    .catch(error => {
      dispatch(fetchFail(error));
    });
};

export const createTypeItem = values => dispatch => {
  dispatch(fetchStart());
  const data = {
    name: values.name
  };
  axios
    .post(API_ROOT + "type-itens", data)
    .then(res => {
      dispatch(createTypeItemsSuccess(res.data.message));
    })
    .catch(error => {
      const resError = error.response.data;
      dispatch(fetchFail(resError.errors));
    });
};

export const updateTypeItem = (typeItemId, values) => dispatch => {
  dispatch(fetchStart());
  const data = {
    id: typeItemId,
    name: values.name
  };
  axios
    .put(API_ROOT + `type-itens/${typeItemId}`, data)
    .then(res => {
      dispatch(updateTypeItemSuccess(res.data.message));
    })
    .catch(error => {
      const resError = error.response.data;
      dispatch(fetchFail(resError.errors));
    });
};

export const deleteTypeItem = typeItemId => dispatch => {
  dispatch(fetchStart());
  axios
    .delete(API_ROOT + `type-itens/${typeItemId}`)
    .then(res => {
      dispatch(deleteTypeItemSuccess(res.data.message, typeItemId));
    })
    .catch(error => {
      dispatch(fetchFail(error));
    });
};

export const clearMessage = () => dispatch => {
  dispatch({ type: actionType.CLEAR_MESSAGE_TYPE_ITEM });
};

export const clearErrors = () => dispatch => {
  dispatch({ type: actionType.CLEAR_ERRORS_TYPE_ITEM });
};
