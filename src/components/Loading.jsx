import { Spin } from "antd";
import React from "react";

const Loading = ({ isLoading, children, spinnerProps }) => {
  return (
    <div className="is-loading-container">
      {isLoading ? (
        <div className="spinner-wrapper flex items-center justify-center">
          <Spin size="large" {...spinnerProps} />
        </div>
      ) : (
        children
      )}
    </div>
  );
};

export default Loading;
