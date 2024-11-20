import React, { useState, useEffect } from "react";
import { Table, Button, Tag, message, Tabs } from "antd";
import { Link } from "react-router-dom";
import ProductService from "@services/product.service";
import ".scss";

const statusMap = {
  ALL: {
    title: "Tất cả",
    color: "success",
    actions: ["HIDDEN"], // có thể chuyển sang trạng thái HIDDEN
  },
  PENDING: {
    title: "Đang chờ duyệt",
    color: "warning",
    actions: ["HIDDEN"], // có thể chuyển sang trạng thái HIDDEN
    canEdit: true,
  },
  AVAILABLE: {
    title: "Đang bán",
    color: "success",
    actions: ["HIDDEN"], // có thể chuyển sang trạng thái HIDDEN
    canEdit: true,
  },
  SOLD: {
    title: "Đã bán",
    color: "default",
    actions: [], // không thể chuyển trạng thái
  },
  HIDDEN: {
    title: "Ẩn",
    color: "secondary",
    actions: ["PENDING"], // có thể chuyển sang trạng thái PENDING
    canEdit: true,
  },
  REJECTED: {
    title: "Bị từ chối",
    color: "error",
    actions: ["PENDING", "HIDDEN"], // có thể chuyển sang PENDING hoặc HIDDEN
    canEdit: true,
  },
  EXPIRED: {
    title: "Hết hạn",
    color: "error",
    actions: ["PENDING", "HIDDEN"], // có thể chuyển sang PENDING hoặc HIDDEN
    canEdit: true,
  },
};

const AllProduct = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    const [res, err] = await ProductService.sellerGetAllProduct();
    console.log({ res, err });
    if (err) {
      message.error("Lấy sản phẩm thất bại");
    } else {
      setProducts(res.data);
    }
  }

  const handleActionClick = async (productId, action) => {
    console.log({ productId, action });
    const [res, err] = await ProductService.changeStatus(productId, action);
    if (err) {
      message.error("Đổi trạng thái thât bại");
      console.log({ err });
      return;
    }
    message.info("Đổi trạng thái thành công");
    console.log({ res });
  };

  const ActionButtons = ({ status, productId }) => {
    return (
      <div>
        {statusMap[status]?.actions?.map((action) => (
          <Button
            key={action}
            type="primary"
            style={{ marginRight: 10 }}
            onClick={async () => await handleActionClick(productId, action)}
          >
            {`Chuyển thành ${statusMap[action]?.title}`}
          </Button>
        ))}
        {statusMap[status]?.canEdit && (
          <Link to={`/product/edit/${productId}`}>
            <Button type="default">Cập nhật</Button>
          </Link>
        )}
      </div>
    );
  };

  const TableWrapper = ({ status, filteredProducts }) => {
    const columns = [
      {
        title: "Tên sản phẩm",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Trạng thái",
        dataIndex: "status",
        key: "status",
        render: (status) => (
          <Tag color={statusMap[status]?.color || "default"}>
            {statusMap[status]?.title || "Không xác định"}
          </Tag>
        ),
      },
      {
        title: "Giá",
        dataIndex: "price",
        key: "price",
        render: (price) =>
          price.toLocaleString("vi-VN", { style: "currency", currency: "VND" }),
      },
      {
        title: "Hành động",
        key: "action",
        render: (text, record) => (
          <ActionButtons status={record.status} productId={record.id} />
        ),
      },
    ];

    return (
      <Table columns={columns} dataSource={filteredProducts} rowKey="id" />
    );
  };

  const getFilteredProducts = (status) => {
    if (status === "ALL") {
      return products;
    }
    return products?.filter((product) => product.status === status);
  };

  const tabItems = Object.keys(statusMap).map((STATUS) => ({
    key: STATUS,
    label: statusMap[STATUS].title,
    children: (
      <TableWrapper
        status={STATUS}
        filteredProducts={getFilteredProducts(STATUS)}
      />
    ),
  }));

  return (
    <div className="all-product-container">
      <Tabs defaultActiveKey="ALL" items={tabItems} />
    </div>
  );
};

export default AllProduct;
