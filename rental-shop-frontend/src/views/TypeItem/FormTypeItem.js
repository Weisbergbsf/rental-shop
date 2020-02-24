import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  createTypeItem,
  updateTypeItem,
  clearMessage
} from "../../store/actions/typeItemsAction";

import { Card, Form, Input, Row, Col, Button, notification } from "antd";
import Backdrop from "../../components/Backdrop/Backdrop";
import { Formik, ErrorMessage } from "formik";

import * as Yup from "yup";
const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required("O nome do obrigatório.")
    .min(3, "O nome deve ter pelo menos 3 caracteres.")
});

const FormTypeItem = props => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { state } = history.location;
  const [showBackdrop, setShowBackdrop] = useState(false);

  const typeItem = useSelector(state => state.typeItems);
  const { message, errors, loading } = typeItem;
  let typeItemUpdate = null;
  if (state) {
    typeItemUpdate = state;
  }
  console.log("typeItemUpdate: ",typeItemUpdate)
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
              {state ? "Atualizar Tipo de Item" : "Adicionar Tipo de Item"}
            </i>
          }
        >
          <Form>
            <Formik
              initialValues={{
                name: typeItemUpdate ? typeItemUpdate.name : ""
              }}
              validationSchema={validationSchema}
              onSubmit={(values, { setSubmitting, resetForm }) => {
                console.log("values: ",values)
                if (state) {
                  dispatch(updateTypeItem(typeItemUpdate.id, values));
                } else {
                  dispatch(createTypeItem(values));
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
                    <Form.Item label="Nome">
                      <Input
                        maxLength={100}
                        size="large"
                        type="text"
                        value={values.name}
                        name="name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={touched.name && errors.name ? "error" : null}
                      />
                      <ErrorMessage
                        name="name"
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
                        onClick={() => {
                          console.log("...............")
                          handleSubmit()
                        }}
                      >
                        SALVAR
                      </Button>
                      <Button
                        type="danger"
                        ghost
                        style={{ marginLeft: 8 }}
                        onClick={() => history.push("/type-items")}
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

export default FormTypeItem;
