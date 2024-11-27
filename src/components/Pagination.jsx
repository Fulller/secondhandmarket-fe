import React, { useEffect } from "react";
import { Pagination as AntdPagination } from "antd";

function Pagination(props) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [props.current]);

  return (
    <div className="pagination-container">
      <AntdPagination {...props} />
    </div>
  );
}

export default Pagination;
