import React from "react";
import { Icon } from "antd";

import { styles } from "./styleBackdrop";

const Backdrop = props =>
  props.show ? (
    <div style={styles.container} onClick={props.clicked}>
      {props.loading ? (
        <div style={styles.loadingCenter}>
          <Icon type="sync" spin style={styles.spinner} />
        </div>
      ) : null}
    </div>
  ) : null;

export default Backdrop;
