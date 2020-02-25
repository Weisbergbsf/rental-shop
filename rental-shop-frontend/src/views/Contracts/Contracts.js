import React, { useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getContracts, clearMessage } from "../../store/actions/contractsAction";

import Backdrop from "../../components/Backdrop/Backdrop";
import CustomTable from "../../components/Table/CustomTable";
import { Menu, Icon, Dropdown, Tooltip, notification } from "antd";

import { columnsTable } from "./columnsTable";
import { styles } from "../global/styles";

const Contracts = props => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(100);
  const history = useHistory();
  const dispatch = useDispatch();

  const loadContracts = useCallback(() => {
    dispatch(getContracts(page, pageSize));
  }, [dispatch, page, pageSize]);

  const { contracts, loading, message } = useSelector(state => state.contracts);
  useEffect(() => {
    if (message) {
      notification.success({
        message: message,
        placement: "topRight"
      });
      dispatch(clearMessage());
    }
    loadContracts();
  }, [dispatch, loadContracts, message, page, pageSize]);
  const columns = [
    ...columnsTable,
    {
      key: "action",
      render: (text, record) => (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item
                key="1"
                onClick={() => {
                  history.push({
                    pathname: `/edit-contract/${record.id}`,
                    state: {
                      id: record.id,
                      customerId: record.customer.id,
                      typeContractId: record.contractStatus,
                      items: record.items,
                      dateEnd: record.dateEnd
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


  const subTitle = (
    <Tooltip placement="bottom" title="Criar Contrato">
      <Icon
        type="plus-circle"
        style={styles.subTitle}
        onClick={() => {
          history.push("/contract");
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
      {contracts && (
        <CustomTable
          title="Contratos"
          subTitle={subTitle}
          columns={columns}
          dataSource={contracts.elements || []}
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

export default Contracts;
