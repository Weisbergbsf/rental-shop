import React from "react";
import PropTypes from "prop-types";
import { Table, Pagination } from "antd";

import { styles } from "./styleTable";

const CustomTable = props => {
  return (
    <Table
      style={styles.table}
      title={() => (
        <div style={styles.titleContainer}>
          <h1 style={styles.title}>{props.title}</h1>
          {props.subTitle}
        </div>
      )}
      rowSelection={props.rowSelection}
      columns={props.columns}
      dataSource={props.dataSource}
      rowKey={props.rowKey}
      pagination={false}
      footer={() => (
        <div style={styles.paginationContainer}>
          <Pagination
            total={parseInt(props.total)}
            showTotal={(total, range) =>
              `${range[0]}-${range[1]} de ${total} registros  ${"    "}`
            }
            pageSize={props.pageSize}
            defaultCurrent={props.page}
            showSizeChanger
            onShowSizeChange={props.onShowSizeChange}
            onChange={props.onChange}
            pageSizeOptions={["5", "10", "15", "20", "25", "50", "100"]}
          />
        </div>
      )}
    />
  );
};

CustomTable.propTypes = {
  columns: PropTypes.array.isRequired,
  dataSource: PropTypes.array.isRequired
};

export default CustomTable;
