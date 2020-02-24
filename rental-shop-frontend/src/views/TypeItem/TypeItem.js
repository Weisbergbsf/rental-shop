import React, { useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getTypeItems,
  deleteTypeItem,
  clearMessage
} from "../../store/actions/typeItemsAction";

import Backdrop from "../../components/Backdrop/Backdrop";
import CustomTable from "../../components/Table/CustomTable";
import { Menu, Icon, Dropdown, Tooltip, Modal, notification } from "antd";

import { columnsTable } from "./columnsTable";
import { styles } from "./styles";
const { confirm } = Modal;

const TypeItem = props => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const history = useHistory();
  const dispatch = useDispatch();

  const loadTypeItems = useCallback(() => {
    dispatch(getTypeItems(page, pageSize));
  }, [dispatch, page, pageSize]);

  const { typeItems, loading, message } = useSelector(state => state.typeItems);
  useEffect(() => {
    if (message) {
      notification.success({
        message: message,
        placement: "topRight"
      });
      dispatch(clearMessage());
    }
    loadTypeItems();
  }, [dispatch, loadTypeItems, message, page, pageSize]);
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
                    pathname: `/edit-type-item/${record.id}`,
                    state: {
                      id: record.id,
                      name: record.name
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

  const showDeleteConfirm = (id, nameUser) => {
    confirm({
      title: "Deletar este Type de Item?",
      content: <strong>{nameUser}</strong>,
      okText: "Sim",
      okType: "danger",
      cancelText: "Não",
      onOk() {
        dispatch(deleteTypeItem(id));
        setPage(page === 1 ? page : page - 1);
      }
    });
  };

  const subTitle = (
    <Tooltip placement="bottom" title="Adicionar usuário">
      <Icon
        type="plus-circle"
        style={styles.subTitle}
        onClick={() => {
          history.push("/type-item");
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
      {typeItems && (
        <CustomTable
          title="Typo de Items"
          subTitle={subTitle}
          columns={columns}
          dataSource={typeItems.elements || []}
          rowKey="id"
          total={typeItems.totalElements}
          pageSize={pageSize}
          defaultCurrent={page}
          onChange={handlePaginationChange}
          onShowSizeChange={onShowSizeChange}
        />
      )}
    </div>
  );
};

export default TypeItem;
