import React, { useState, useEffect, useCallback } from "react";

import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getCustomers,
  deleteCustomer,
  clearMessage
} from "../../store/actions/customerAction";

import Backdrop from "../../components/Backdrop/Backdrop";
import CustomTable from "../../components/Table/CustomTable";
import { Menu, Icon, Dropdown, Tooltip, Modal, notification } from "antd";

import { columnsTable } from "./columnsTable";
import { styles } from "./styleCustomer";
const { confirm } = Modal;

const Customers = props => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const history = useHistory();
  const dispatch = useDispatch();
  const loadUsers = useCallback(() => {
    dispatch(getCustomers(page, pageSize));
  }, [dispatch, page, pageSize]);

  const { customers, loading, message } = useSelector(state => state.customers);
  useEffect(() => {
    if (message) {
      notification.success({
        message: message,
        placement: "topRight"
      });
      dispatch(clearMessage());
    }
    loadUsers();
  }, [dispatch, loadUsers, message, page, pageSize]);
  const onShowSizeChange = (current, pageSize) => {
    setPageSize(pageSize);
    setPage(1);
  };
  const showDeleteConfirm = (id, nameUser) => {
    confirm({
      title: "Tem certeza de que deletar este Cliente?",
      content: <strong>{nameUser}</strong>,
      okText: "Sim",
      okType: "danger",
      cancelText: "Não",
      onOk() {
        dispatch(deleteCustomer(id));
        setPage(page === 1 ? page : page - 1);
      }
    });
  };
  const handlePaginationChange = (page, pageSize) => {
    setPage(page);
  };

  const subTitle = (
    <Tooltip placement="bottom" title="Adicionar usuário">
      <i
        style={styles.subTitle}
        className="fas fa-user-plus"
        onClick={() => {
          history.push("/customer");
        }}
      />
    </Tooltip>
  );

  const columns = [
    ...columnsTable,
    {
      key: "action",
      render: (text, record) => (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item
                key="0"
                onClick={() => showDeleteConfirm(record.id, record.name)}
              >
                <Icon type="delete" style={{ color: "red" }} />
                Deletar
              </Menu.Item>
              <Menu.Item
                key="1"
                onClick={() => {
                  history.push({
                    pathname: `/edit-customer/${record.id}`,
                    state: {
                      id: record.id,
                      name: record.name,
                      birthDate: record.birthDate,
                      email: record.email,
                      phoneNumber: record.address.phoneNumber,
                      street: record.address.street,
                      numberAddress: record.address.numberAddress,
                      neighborhood: record.address.neighborhood,
                      city: record.address.city,
                      uf: record.address.uf,
                      zipCode: record.address.zipCode
                    }
                  });
                }}
              >
                <Icon type="edit" style={{ color: "gray" }} />
                <span>Editar</span>
              </Menu.Item>
            </Menu>
          }
          trigger={["click"]}
          placement="bottomRight"
        >
          <i className="fas fa-cog" style={{ fontSize: 18 }} />
        </Dropdown>
      )
    }
  ];

  return (
    <div>
      <Backdrop show={loading} loading={true} />
      {customers && (
        <CustomTable
          title="Clientes"
          subTitle={subTitle}
          columns={columns}
          dataSource={customers.elements || []}
          rowKey="id"
          total={customers.totalElements}
          pageSize={pageSize}
          defaultCurrent={page}
          onChange={handlePaginationChange}
          onShowSizeChange={onShowSizeChange}
        />
      )}
    </div>
  );
};

export default Customers;
