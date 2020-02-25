import React, { useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  createContract,
  updateContract,
  clearMessage
} from "../../store/actions/contractsAction";
import { getCustomersSelect } from "../../store/actions/customerAction";
import { getItemsSelect } from "../../store/actions/itemsAction";

import {
  Card,
  Form,
  Transfer,
  Row,
  Icon,
  Col,
  Button,
  DatePicker,
  notification
} from "antd";
import Backdrop from "../../components/Backdrop/Backdrop";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import CustomSelect from "../../components/Select/CustomSelect";
import { data } from "./dataStatusContracts";
import { convertToInt } from "./convertTypeContractToInt";
import moment from "moment";
const validationSchema = Yup.object().shape({
  customerId: Yup.string().required("Informe o cliente"),
  typeContractId: Yup.string().required("Informe o Tipo de Contrato"),
  dateEnd: Yup.string().required("Informe a Data")
});
const dateFormat = "YYYY-MM-DD HH:mm:ss";
const FormContract = props => {
  const [itemId, setItemId] = useState([]);
  const history = useHistory();
  const dispatch = useDispatch();
  const { state } = history.location;
  const [showBackdrop, setShowBackdrop] = useState(false);

  const loadTypeItems = useCallback(() => {
    dispatch(getCustomersSelect());
    dispatch(getItemsSelect());
  }, [dispatch]);

  useEffect(() => {
    loadTypeItems();
  }, [dispatch, loadTypeItems]);
  const { customersSelect } = useSelector(state => state.customers);
  const { itemsSelect } = useSelector(state => state.items);
  const item = useSelector(state => state.items);
  const { message, errors, loading } = item;
  useEffect(() => {
    if (message) {
      notification.success({
        message: message,
        placement: "topRight"
      });
      dispatch(clearMessage());
    }
    setShowBackdrop(loading);
  }, [message, errors, loading, dispatch]);

  let contractUpdate = null;
  if (state) {
    contractUpdate = state;
  }
  useEffect(() => {
    if (state) {
      let ids = [];
      state.items.map(obj => {
        return ids.push(obj.item.id);
      });
      setItemId(ids);
    }
  }, [state]);

  const handleChangeAddType = itemId => {
    setItemId(itemId);
  };
  const onSelectTypeContract = value => {
    console.log(value);
  };
  const onSelectCustomer = value => {
    console.log(value);
  };

  return (
    <Row justify="center" type="flex">
      <Backdrop show={showBackdrop} loading={true} />
      <Col xs={24} sm={18} xl={16} xxl={10}>
        <Card
          title={
            <span>
              <Icon type="snippets" style={{ fontSize: 20 }} />
              {state ? " Atualizar Contrato" : " Criar Contrato"}
            </span>
          }
        >
          <Form>
            <Formik
              initialValues={{
                customerId: contractUpdate ? contractUpdate.customerId : "",
                typeContractId: contractUpdate
                  ? convertToInt(contractUpdate.typeContractId)
                  : "",
                items: contractUpdate ? contractUpdate.items : "",
                dateEnd: contractUpdate ? contractUpdate.dateEnd : ""
              }}
              validationSchema={validationSchema}
              onSubmit={(values, { setSubmitting, resetForm }) => {
                if (state) {
                  dispatch(updateContract(contractUpdate.id, values));
                } else {
                  dispatch(createContract(values));
                  if (!loading) {
                    resetForm();
                  }
                }
                setSubmitting(true);
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit
              }) => (
                <div>
                  <Row>
                    <Col span={24}>
                      <Form.Item label="Cliente">
                        {customersSelect && (
                          <CustomSelect
                            disabled={state ? true : false}
                            name="customerId"
                            allowClear
                            defaultValue={values.customerId}
                            data={customersSelect}
                            onChange={obj => {
                              values.customerId = obj;
                              onSelectCustomer(obj);
                            }}
                          />
                        )}
                        <ErrorMessage
                          name="customerId"
                          component="div"
                          style={{ color: "red" }}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={10}>
                      <Form.Item label="Data término">
                        <DatePicker
                          disabled={state ? true : false}
                          onChange={(obj, date) => {
                            values.dateEnd = date;
                          }}
                          defaultValue={state ? moment(values.dateEnd) : null}
                          size="large"
                          format={dateFormat}
                        />
                        <ErrorMessage
                          name="dateEnd"
                          component="div"
                          style={{ color: "red" }}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={14}>
                      <Form.Item label="Tipo de Contrato">
                        <CustomSelect
                          name="typeContractId"
                          allowClear
                          defaultValue={values.typeContractId}
                          data={data}
                          onChange={obj => {
                            values.typeContractId = obj;
                            onSelectTypeContract(obj);
                          }}
                        />
                        <ErrorMessage
                          name="typeContractId"
                          component="div"
                          style={{ color: "red" }}
                        />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row>
                    <Form.Item label="Items">
                      {itemsSelect && (
                        <Transfer
                          disabled={state ? true : false}
                          name="itemId"
                          lazy={false}
                          dataSource={itemsSelect}
                          targetKeys={itemId}
                          onChange={obj => {
                            values.items = obj;
                            handleChangeAddType(obj);
                          }}
                          render={item => item.name}
                        />
                      )}
                      <ErrorMessage
                        name="itemId"
                        component="div"
                        style={{ color: "red" }}
                      />
                    </Form.Item>
                  </Row>

                  <Row>
                    <Col span={24} style={{ textAlign: "right" }}>
                      <Button
                        type="primary"
                        ghost
                        style={{ marginLeft: 8 }}
                        disabled={itemId.length === 0}
                        onClick={() => {
                          if (itemId) {
                            handleSubmit();
                          }
                        }}
                      >
                        SALVAR
                      </Button>
                      <Button
                        type="danger"
                        ghost
                        style={{ marginLeft: 8 }}
                        onClick={() => history.push("/contracts")}
                      >
                        CANCELAR
                      </Button>
                    </Col>
                  </Row>
                </div>
              )}
            </Formik>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default FormContract;
