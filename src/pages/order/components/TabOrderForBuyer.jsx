import { message, Tabs } from "antd";
import TableOrder from "./TableOrder";
import { useEffect, useState } from "react";
import AuthService from "@services/auth.service";
import OrderService from "@services/order.service";
import ReviewService from "@services/review.service";

const orderStatus = {
  ACCEPTED: {
    title: "Chấp nhận",
    color: "success",
    actions: ["HIDDEN"],
  },
  COMPLETED: {
    title: "Hoàn thành",
    color: "success",
    actions: ["HIDDEN"],
  },
  CANCELED: {
    title: "Đã hủy",
    color: "success",
    actions: ["HIDDEN"],
  },
};
const TabOrderForBuyer = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [reviews, setReview] = useState([]);
  const [currentStatus, setCurrentStatus] = useState("ACCEPTED");

  useEffect(() => {
    getOrderBuyer(currentStatus);
  }, [currentStatus]);

  async function getOrderBuyer(statusOrder) {
    setIsLoading(true);
    const [[ordersRes, ordersErr], [reviewsRes, reviewsErr]] =
      await Promise.all([
        OrderService.getOrderBuyer(statusOrder),
        ReviewService.getReviewerReview(),
      ]);
    if (ordersErr || reviewsErr) {
      message.error("Lấy order buyer thất bại");
      setIsLoading(false);
    } else {
      setOrders(ordersRes.data);
      setReview(reviewsRes.data);
      setIsLoading(false);
    }
  }
  const tabItems = Object.keys(orderStatus).map((STATUS) => ({
    key: STATUS,
    label: orderStatus[STATUS].title,
    children: (
      <TableOrder
        orders={orders}
        reviews={reviews}
        role={"buyer"}
        loading={isLoading}
        setOrders={setOrders}
      />
    ),
  }));
  const handleTabChange = (activeKey) => {
    setCurrentStatus(activeKey);
  };
  return (
    <div className="all-product-container">
      <div>Quản lý đơn mua</div>
      <Tabs
        defaultActiveKey="ALL"
        items={tabItems}
        onChange={handleTabChange}
      />
    </div>
  );
};

export default TabOrderForBuyer;
