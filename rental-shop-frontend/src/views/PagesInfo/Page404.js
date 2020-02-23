import React from "react";
import { withRouter } from "react-router-dom";
import { Result, Button } from "antd";

const Page404 = props => {
  const backToHome = () => {
    props.history.push("/");
  };

  return (
    <div>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button type="primary" onClick={backToHome}>
            Back Home
          </Button>
        }
      />
    </div>
  );
};

export default withRouter(Page404);
