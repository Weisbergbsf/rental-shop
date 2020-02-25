import React, { useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getItems,
  deleteItem,
  clearMessage
} from "../../store/actions/itemsAction";

import Backdrop from "../../components/Backdrop/Backdrop";
import CustomTable from "../../components/Table/CustomTable";
import { Menu, Icon, Dropdown, Tooltip, Modal, notification } from "antd";

import { columnsTable } from "./columnsTable";
import { styles } from "../global/styles";
const { confirm } = Modal;

const Item = props => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const history = useHistory();
  const dispatch = useDispatch();

  const loadItems = useCallback(() => {
    dispatch(getItems(page, pageSize));
  }, [dispatch, page, pageSize]);

  const { items, loading, message } = useSelector(state => state.items);
  useEffect(() => {
    if (message) {
      notification.success({
        message: message,
        placement: "topRight"
      });
      dispatch(clearMessage());
    }
    loadItems();
  }, [dispatch, loadItems, message, page, pageSize]);
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
                    pathname: `/edit-item/${record.id}`,
                    state: {
                      id: record.id,
                      name: record.name,
                      price: record.price,
                      description: record.description,
                      quantityStock: record.quantityStock,
                      typeItems: record.typeItems
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

  const showDeleteConfirm = (id, name) => {
    confirm({
      title: "Deletar este Item?",
      content: <strong>{name}</strong>,
      okText: "Sim",
      okType: "danger",
      cancelText: "Não",
      onOk() {
        dispatch(deleteItem(id));
        setPage(page === 1 ? page : page - 1);
      }
    });
  };

  const subTitle = (
    <Tooltip placement="bottom" title="Adicionar Item">
      <Icon
        type="plus-circle"
        style={styles.subTitle}
        onClick={() => {
          history.push("/item");
        }}
      />
    </Tooltip>
  );

  const handlePaginationChange = (page, pageSize) => {
    setPage(page);
  };

  const onShowSizeChange = (current, pageSize) => {
    setPageSize(pageSize);
    setPage(1);
  };

  return (
    <div>
      <Backdrop show={loading} loading={true} />
      {items && (
        <CustomTable
          title="Items"
          subTitle={subTitle}
          columns={columns}
          dataSource={items.elements || []}
          rowKey="id"
          total={10}
          pageSize={pageSize}
          defaultCurrent={page}
          onChange={handlePaginationChange}
          onShowSizeChange={onShowSizeChange}
        />
      )}
    </div>
  );
};

export default Item;
