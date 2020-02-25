import React from "react";
import PropTypes from "prop-types";
import { Select } from "antd";
const { Option } = Select;

const CustomSelect = props => {
  return (
    <Select
      {...props}
      size="large"
      showSearch
      placeholder="Selecione..."
      optionFilterProp="children"
      filterOption={(input, option) =>
        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
    >
      {props.data.map(obj => {
        return (
          <Option key={obj.id} value={obj.id}>
            {obj.name}
          </Option>
        );
      })}
    </Select>
  );
};

CustomSelect.propTypes = {
  data: PropTypes.array.isRequired
};

export default CustomSelect;
