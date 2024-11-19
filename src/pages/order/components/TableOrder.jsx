import Loading from "@components/Loading";
import ModalPostReview from "@pages/review/components/ModalPostReview";
import OrderService from "@services/order.service";
import { Button, message, Table } from "antd";
import { useEffect, useState } from "react";
import { TfiCommentsSmiley } from "react-icons/tfi";

const formattedDate = (dateString) => {
  const options = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return new Date(dateString).toLocaleString("vi-VN", options);
};

const TableOrder = ({
  orders,
  reviews = [],
  currentUser,
  role,
  loading,
  setOrders,
}) => {
  const [orderLoading, setOrderLoading] = useState(false);

  const [reviewsMap, setReviewMap] = useState({});

  useEffect(() => {
    // Kiểm tra nếu reviews đã thay đổi so với reviewsMap hiện tại
    const newReviewsMap = reviews.reduce((acc, review) => {
      acc[review.product.id] = review;
      return acc;
    }, {});

    // Chỉ cập nhật reviewsMap nếu nó thực sự khác với hiện tại
    if (JSON.stringify(newReviewsMap) !== JSON.stringify(reviewsMap)) {
      setReviewMap(newReviewsMap);
    }
  }, [reviews, reviewsMap]); // Thêm reviewsMap vào dependency array

  async function handleCancel(record) {
    setOrderLoading(true);
    const [result, error] = await OrderService.putCancelOrderProduct(record.id);
    setOrderLoading(false);
    if (error) {
      message.error("Hủy đơn hàng thất bại");
    } else {
      message.success("Hủy đơn hàng thành công");
      setOrders((prevOrders) => {
        const updatedOrders = prevOrders.map((order) =>
          order.id === record.id ? { ...order, status: "CANCELED" } : order
        );
        return updatedOrders.filter((order) => order.status !== "CANCELED");
      });
    }
  }
  async function handleComplete(record) {
    setOrderLoading(true);

    const [result, error] = await OrderService.putCompleteOrder(record.id);
    setOrderLoading(false);

    if (error) {
      message.error("Hoàn thành đơn hàng thất bại");
    } else {
      message.success("Hoàn thành đơn hàng thành công");
      setOrders((prevOrders) => {
        const updatedOrders = prevOrders.map((order) =>
          order.id === record.id ? { ...order, status: "COMPLETED" } : order
        );
        return updatedOrders.filter((order) => order.status !== "COMPLETED");
      });
    }
  }
  const columns = [
    {
      title: "#",
      dataIndex: "index",
      key: "index",
      render: (text, record, index) => index + 1,
      width: 50,
    },
    {
      title: "Tên sản phẩm",
      key: "product.name",
      render: (record) => record.product?.name || "Không có tên sản phẩm",
      width: 200,
    },
    {
      title: "Hình ảnh",
      key: "product.thumbnail",
      render: (record) =>
        record.product?.thumbnail ? (
          <img
            src={record.product.thumbnail}
            alt={record.product.name}
            style={{
              width: 100,
              height: 100,
              objectFit: "cover",
              borderRadius: "5px",
            }}
          />
        ) : (
          "Không có hình ảnh"
        ),
      width: 120,
    },
    {
      title: "Người bán",
      key: "seller.name",
      render: (record) => record.seller?.name || "Không có thông tin người bán",
      width: 100,
    },
    {
      title: "Người mua",
      key: "buyer.name",
      render: (record) => record.buyer?.name || "Chưa cập nhật",
      width: 100,
    },
    {
      title: "Yêu cầu",
      key: "buyer.name",
      render: (record) => record.purchaseRequest?.message || "Chưa cập nhật",
      width: 200,
    },
    {
      title: "Trạng thái",
      key: "seller.name",
      render: (record) => record.status || "Không có thông tin người bán",
      width: 120,
    },
    {
      title: "Ngày mua",
      key: "seller.name",
      render: (record) =>
        formattedDate(record.created_at) || "Không có thông tin người bán",
      width: 120,
    },
    {
      title: "Hành động",
      key: "actions",
      render: (text, record) => {
        if (record.status === "COMPLETED") {
          return <ModalPostReview review={reviewsMap[record.product.id]} />;
        } else if (record.status === "CANCELED") {
          return (
            <Button type="danger" danger>
              {record.status}
            </Button>
          );
        } else {
          return (
            <>
              {role === "seller" && (
                <Button
                  type="primary"
                  danger
                  onClick={() => handleCancel(record)}
                  style={{ marginRight: 8 }}
                >
                  Hủy
                </Button>
              )}
              {role === "buyer" && (
                <>
                  <Button
                    type="primary"
                    danger
                    onClick={() => handleCancel(record)}
                    style={{ marginRight: 8 }}
                  >
                    Hủy
                  </Button>
                  <Button type="primary" onClick={() => handleComplete(record)}>
                    Hoàn thành
                  </Button>
                </>
              )}
            </>
          );
        }
      },
    },
  ];
  return (
    <Loading isLoading={loading || orderLoading}>
      <Table
        columns={columns}
        dataSource={orders}
        rowKey="id"
        scroll={{
          y: 300,
          x: "max-content",
        }}
      />
    </Loading>
  );
};

export default TableOrder;
