import React, { useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  createItem,
  updateItem,
  clearMessage
} from "../../store/actions/itemsAction";
import { getTypeItems } from "../../store/actions/typeItemsAction";

import {
  Card,
  Form,
  Input,
  Transfer,
  Row,
  Col,
  Button,
  notification
} from "antd";
import Backdrop from "../../components/Backdrop/Backdrop";
import { Formik, ErrorMessage } from "formik";

import * as Yup from "yup";
const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required("O nome do obrigatório.")
    .min(3, "O nome deve ter pelo menos 3 caracteres.")
});
const FormItem = props => {
  const [targetKeys, setTargetKeys] = useState([]);
  const history = useHistory();
  const dispatch = useDispatch();
  const { state } = history.location;
  const [showBackdrop, setShowBackdrop] = useState(false);

  const loadTypeItems = useCallback(() => {
    dispatch(getTypeItems());
  }, [dispatch]);

  useEffect(() => {
    loadTypeItems();
  }, [dispatch, loadTypeItems]);

  const typeItem = useSelector(state => state.typeItems);
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

  let itemUpdate = null;
  if (state) {
    itemUpdate = state;
  }
  useEffect(() => {
    if (state) {
      let ids = [];
      state.typeItems.map(obj => {
        return ids.push(obj.id);
      });
      setTargetKeys(ids);
    }
  }, [state]);

  const handleChangeAddType = targetKeys => {
    setTargetKeys(targetKeys);
  };

  return (
    <Row justify="center" type="flex">
      <Backdrop show={showBackdrop} loading={true} />
      <Col xs={24} sm={18} xl={16} xxl={10}>
        <Card
          title={
            <i className={state ? "fas fa-user" : "fas fa-user-plus"}>
              {" "}
              {state ? "Atualizar Item" : "Adicionar Item"}
            </i>
          }
        >
          <Form>
            <Formik
              initialValues={{
                name: itemUpdate ? itemUpdate.name : "",
                price: itemUpdate ? Number.parseFloat(itemUpdate.price) : 0.0,
                description: itemUpdate ? itemUpdate.description : "",
                quantityStock: itemUpdate
                  ? parseInt(itemUpdate.quantityStock)
                  : 0,
                typeItems: itemUpdate ? itemUpdate.typeItems : ""
              }}
              validationSchema={validationSchema}
              onSubmit={(values, { setSubmitting, resetForm }) => {
                values.typeItems = targetKeys;
                if (state) {
                  dispatch(updateItem(itemUpdate.id, values));
                } else {
                  dispatch(createItem(values));
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
                    <Col span={18}>
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
                    <Col span={6}>
                      <Form.Item label="Preço">
                        <Input
                          maxLength={100}
                          size="large"
                          type="number"
                          value={values.price}
                          name="price"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row>
                    <Col span={18}>
                      <Form.Item label="Dercição">
                        <Input
                          maxLength={100}
                          size="large"
                          type="text"
                          value={values.description}
                          name="description"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={6}>
                      <Form.Item label="Quantidade">
                        <Input
                          min={1}
                          max={1000}
                          type="number"
                          defaultValue={1}
                          size="large"
                          value={values.quantityStock}
                          name="quantityStock"
                          onChange={handleChange}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Form.Item label="Tipo de Item">
                      {typeItem.typeItems && (
                        <Transfer
                          lazy={false}
                          dataSource={typeItem.typeItems.elements}
                          targetKeys={targetKeys}
                          onChange={handleChangeAddType}
                          render={item => item.name}
                        />
                      )}
                    </Form.Item>
                  </Row>

                  <Row>
                    <Col span={24} style={{ textAlign: "right" }}>
                      <Button
                        type="primary"
                        ghost
                        style={{ marginLeft: 8 }}
                        onClick={() => {
                          handleSubmit();
                        }}
                      >
                        SALVAR
                      </Button>
                      <Button
                        type="danger"
                        ghost
                        style={{ marginLeft: 8 }}
                        onClick={() => history.push("/items")}
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

export default FormItem;
