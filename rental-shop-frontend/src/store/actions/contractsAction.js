import axios from "axios";
import * as actionType from "../types";

import { API_ROOT } from "../../config/api-config";
const headers = {
  "Content-Type": "application/json"
};

const fetchStart = () => {
  return {
    type: actionType.SEND_CONTRACT_START
  };
};

const getContractSuccess = contracts => {
  return {
    type: actionType.FETCH_CONTRACT_SUCCESS,
    contracts: contracts
  };
};

const createContractSuccess = message => {
  return {
    type: actionType.CREATE_CONTRACT_SUCCESS,
    message: message
  };
};

const updateContractSuccess = message => {
  return {
    type: actionType.UPDATE_CONTRACT_SUCCESS,
    message: message
  };
};

const fetchFail = errors => {
  return {
    type: actionType.SEND_CONTRACT_FAIL,
    errors: errors
  };
};

export const getContracts = (page, size) => dispatch => {
  dispatch(fetchStart());
  axios
    .get(API_ROOT + `contracts?page=${page}&size=${size}`)
    .then(res => {
      dispatch(getContractSuccess(res.data));
    })
    .catch(error => {
      dispatch(fetchFail(error));
    });
};

export const createContract = values => dispatch => {
  dispatch(fetchStart());
  let items = [];
  values.items.map(obj => {
    return items.push({ quantity: 1, item: { id: obj } });
  });
  const data = {
    customer: { id: values.customerId },
    contractStatus: values.typeContractId,
    items: items,
    dateEnd: values.dateEnd
  };
  axios
    .post(API_ROOT + "contracts", data, headers)
    .then(res => {
      dispatch(createContractSuccess(res.data.message));
    })
    .catch(error => {
      const resError = error.response.data;
      dispatch(fetchFail(resError.errors));
    });
};

export const updateContract = (contractId, values) => dispatch => {
  dispatch(fetchStart());
  const data = {
    statusContract: values.typeContractId
  };
  axios({
    method: "PUT",
    url: API_ROOT + `contracts/${contractId}/${values.typeContractId}`,
    data: data
  })
    .then(res => {
      dispatch(updateContractSuccess(res.data.message));
    })
    .catch(error => {
      const resError = error.response.data;
      dispatch(fetchFail(resError.errors));
    });
};

export const clearMessage = () => dispatch => {
  dispatch({ type: actionType.CLEAR_MESSAGE_ITEM });
};

export const clearErrors = () => dispatch => {
  dispatch({ type: actionType.CLEAR_ERRORS_ITEM });
};
