import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  createCustomer,
  updateCustomer,
  clearMessage
} from "../../store/actions/customerAction";
import {
  Card,
  Form,
  Input,
  DatePicker,
  Row,
  Col,
  Button,
  notification
} from "antd";
import Backdrop from "../../components/Backdrop/Backdrop";
import { Formik, ErrorMessage } from "formik";
import moment from "moment";
import { validationSchema } from "./validationFields";
const dateFormat = "DD/MM/YYYY";

const FormCustomer = props => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { state } = history.location;
  const [showBackdrop, setShowBackdrop] = useState(false);

  const customer = useSelector(state => state.customers);
  const { message, errors, loading } = customer;
  let customerUpdate = null;
  if (state) {
    customerUpdate = state;
  }

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

  return (
    <Row justify="center" type="flex">
      <Backdrop show={showBackdrop} loading={true} />
      <Col xs={24} sm={18} xl={16} xxl={10}>
        <Card
          title={
            <i className={state ? "fas fa-user" : "fas fa-user-plus"}>
              {" "}
              {state ? "Atualizar Cliente" : "Adicionar Cliente"}
            </i>
          }
        >
          <Form>
            <Formik
              initialValues={{
                name: customerUpdate ? customerUpdate.name : "",
                birthDate: customerUpdate ? customerUpdate.birthDate : "",
                email: customerUpdate ? customerUpdate.email : "",
                phoneNumber: customerUpdate ? customerUpdate.phoneNumber : "",
                zipCode: customerUpdate ? customerUpdate.zipCode : "",
                street: customerUpdate ? customerUpdate.street : "",
                numberAddress: customerUpdate
                  ? customerUpdate.numberAddress
                  : "",
                neighborhood: customerUpdate ? customerUpdate.neighborhood : "",
                city: customerUpdate ? customerUpdate.city : "",
                uf: customerUpdate ? customerUpdate.uf : ""
              }}
              validationSchema={validationSchema}
              onSubmit={(values, { setSubmitting, resetForm }) => {
                if (state) {
                  dispatch(updateCustomer(customerUpdate.id, values));
                } else {
                  dispatch(createCustomer(values));
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
                    <Col span={12}>
                      <Form.Item label="Nome">
                        <Input
                          maxLength={100}
                          size="large"
                          type="text"
                          value={values.name}
                          name="name"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={
                            touched.name && errors.name ? "error" : null
                          }
                        />
                        <ErrorMessage
                          name="name"
                          component="div"
                          style={{ color: "red" }}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="Data nasc.">
                        <DatePicker
                          onChange={(obj, date) => {
                            values.birthDate = date;
                          }}
                          size="large"
                          defaultValue={moment(new Date(), dateFormat)}
                          format={dateFormat}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={12}>
                      <Form.Item label="Email">
                        <Input
                          maxLength={100}
                          size="large"
                          type="email"
                          value={values.email}
                          name="email"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={
                            touched.email && errors.email ? "error" : null
                          }
                        />
                        <ErrorMessage
                          name="email"
                          component="div"
                          style={{ color: "red" }}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="Telefone">
                        <Input
                          maxLength={18}
                          size="large"
                          type="text"
                          value={values.phoneNumber}
                          name="phoneNumber"
                          onChange={handleChange}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={8}>
                      <Form.Item label="CEP">
                        <Input
                          maxLength={9}
                          size="large"
                          type="text"
                          value={values.zipCode}
                          name="zipCode"
                          onChange={handleChange}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={14}>
                      <Form.Item label="Rua">
                        <Input
                          maxLength={100}
                          size="large"
                          type="text"
                          value={values.street}
                          name="street"
                          onChange={handleChange}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={2}>
                      <Form.Item label="Nº">
                        <Input
                          maxLength={10}
                          size="large"
                          type="text"
                          value={values.numberAddress}
                          name="numberAddress"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row>
                    <Col span={12}>
                      <Form.Item label="Bairro">
                        <Input
                          maxLength={100}
                          size="large"
                          type="text"
                          value={values.neighborhood}
                          name="neighborhood"
                          onChange={handleChange}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={10}>
                      <Form.Item label="Cidade">
                        <Input
                          maxLength={100}
                          size="large"
                          type="text"
                          value={values.city}
                          name="city"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={2}>
                      <Form.Item label="UF">
                        <Input
                          maxLength={2}
                          size="large"
                          type="text"
                          value={values.uf}
                          name="uf"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row>
                    <Col span={24} style={{ textAlign: "right" }}>
                      <Button
                        type="primary"
                        ghost
                        style={{ marginLeft: 8 }}
                        onClick={() => handleSubmit()}
                      >
                        SALVAR
                      </Button>
                      <Button
                        type="danger"
                        ghost
                        style={{ marginLeft: 8 }}
                        onClick={() => history.push("/customers")}
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

export default FormCustomer;
