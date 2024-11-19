import { message, Tabs } from "antd";
import TableOrder from "./TableOrder";
import { useEffect, useState } from "react";
import AuthService from "@services/auth.service";
import OrderService from "@services/order.service";
import Loading from "@components/Loading";
import ReviewService from "@services/review.service";

const orderStatus = {
  ALL: {
    title: "Tất cả",
    color: "success",
    actions: ["HIDDEN"], // có thể chuyển sang trạng thái HIDDEN
  },
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
const TabOrderForSeller = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [reviews, setReview] = useState([]);
  const [currentStatus, setCurrentStatus] = useState("ACCEPTED");

  const [currentUser, setCurrentUser] = useState({
    id: "",
    email: "",
  });
  useEffect(() => {
    // getUserInfo();
    getOrderSeller(currentStatus);
  }, [currentStatus]);
  async function getUserInfo() {
    const [res, err] = await AuthService.getUserInfo();
    if (err) {
      message.error("Lấy thông tin user thất bại");
    } else {
      setCurrentUser({
        id: res.data.id || null,
        email: res.data.email || null,
      });
    }
  }
  async function getOrderSeller(statusOrder) {
    setIsLoading(true);
    const [[ordersRes, ordersErr], [reviewsRes, reviewsErr]] =
      await Promise.all([
        OrderService.getOrderSeller(statusOrder),
        ReviewService.getReviewerReview(),
      ]);
    console.log({ ordersErr, reviewsErr });
    if (ordersErr || reviewsErr) {
      message.error("Lấy order seller thất bại");
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
        currentUser={currentUser}
        role={"seller"}
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
      <div>Quản lý đơn bán</div>

      <Tabs
        defaultActiveKey="ALL"
        items={tabItems}
        onChange={handleTabChange}
      />
    </div>
  );
};

export default TabOrderForSeller;
