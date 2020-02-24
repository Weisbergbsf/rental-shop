import axios from "axios";
import * as actionType from "../types";

import { API_ROOT } from "../../config/api-config";
import moment from "moment";
const fetchStart = () => {
  return {
    type: actionType.SEND_CUSTOMER_START
  };
};

const getCustomerSuccess = customers => {
  return {
    type: actionType.FETCH_CUSTOMER_SUCCESS,
    customers: customers
  };
};

const createCustomerSuccess = message => {
  return {
    type: actionType.CREATE_CUSTOMER_SUCCESS,
    message: message
  };
};

const updateCustomerSuccess = message => {
  return {
    type: actionType.UPDATE_CUSTOMER_SUCCESS,
    message: message
  };
};

const deleteCustomerSuccess = (message, customerId) => {
  return {
    type: actionType.DELETE_CUSTOMER_SUCCESS,
    message: message,
    customerId: customerId
  };
};

const fetchFail = errors => {
  return {
    type: actionType.SEND_CUSTOMER_FAIL,
    errors: errors
  };
};

export const getCustomers = (page, size) => dispatch => {
  dispatch(fetchStart());
  axios
    .get(API_ROOT + `customers?page=${page}&size=${size}`)
    .then(res => {
      dispatch(getCustomerSuccess(res.data));
    })
    .catch(error => {
      dispatch(fetchFail(error));
    });
};

export const createCustomer = values => dispatch => {
  dispatch(fetchStart());
  const data = {
    name: values.name,
    email: values.email,
    birthDate: moment(values.birthDate,"YYYY-MM-DD"),
    phoneNumber: values.phoneNumber,
    address: {
      street: values.street,
      numberAddress: values.numberAddress,
      neighborhood: values.neighborhood,
      city: values.city,
      uf: values.uf,
      zipCode: values.zipCode
    }
  };
  axios
    .post(API_ROOT + "customers", data)
    .then(res => {
      dispatch(createCustomerSuccess(res.data.message));
    })
    .catch(error => {
      const resError = error.response.data;
      dispatch(fetchFail(resError.errors));
    });
};

export const updateCustomer = (customerId, values) => dispatch => {
  dispatch(fetchStart());
  const data = {
    id: customerId,
    name: values.name,
    email: values.email,
    birthDate: moment(values.birthDate,"YYYY-MM-DD"),
    phoneNumber: values.phoneNumber,
    address: {
      street: values.street,
      numberAddress: values.numberAddress,
      neighborhood: values.neighborhood,
      city: values.city,
      uf: values.uf,
      zipCode: values.zipCode
    }
  };
  axios
    .put(API_ROOT + `customers/${customerId}`, data)
    .then(res => {
      dispatch(updateCustomerSuccess(res.data.message));
    })
    .catch(error => {
      const resError = error.response.data;
      dispatch(fetchFail(resError.errors));
    });
};

export const deleteCustomer = customerId => dispatch => {
  dispatch(fetchStart());
  axios
    .delete(API_ROOT + `customers/${customerId}`)
    .then(res => {
      dispatch(deleteCustomerSuccess(res.data.message, customerId));
    })
    .catch(error => {
      dispatch(fetchFail(error));
    });
};

export const clearMessage = () => dispatch => {
  dispatch({ type: actionType.CLEAR_MESSAGE_CUSTOMER });
};

export const clearErrors = () => dispatch => {
  dispatch({ type: actionType.CLEAR_ERRORS_CUSTOMER });
};
