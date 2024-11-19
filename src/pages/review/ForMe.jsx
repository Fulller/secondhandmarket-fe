import ReviewService from "@services/review.service";
import { useEffect, useState } from "react";
import TableReviews from "./components/TableReviews";
import { Tabs } from "antd";

const reviewStatus = {
  PENDING: {
    title: "Chưa đánh giá",
    color: "success",
    actions: ["HIDDEN"],
  },
  PUBLIC: {
    title: "Đã đánh giá",
    color: "success",
    actions: ["HIDDEN"],
  },
  HIDDEN: {
    title: "Đã ẩn",
    color: "success",
    actions: ["HIDDEN"],
  },
};
function ForMe() {
  const [isLoading, setIsLoading] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [currentStatus, setCurrentStatus] = useState("PENDING"); // Trạng thái của tab hiện tại

  useEffect(() => {
    getSellerReview(currentStatus);
  }, [currentStatus]);

  async function getSellerReview(status) {
    setIsLoading(true);
    const [res, err] = await ReviewService.getSellerReview(status);
    setIsLoading(false);
    if (err) {
      console.log("Lấy review thất bại");
    } else {
      setReviews(res.data);
    }
  }
  const tabItems = Object.keys(reviewStatus).map((STATUS) => ({
    key: STATUS,
    label: reviewStatus[STATUS].title,
    children: <TableReviews isLoading={isLoading} reviews={reviews} />,
  }));
  const handleTabChange = (activeKey) => {
    setCurrentStatus(activeKey);
  };
  return (
    <div className="all-product-container">
      <div>Review cho bản thân</div>

      <Tabs
        defaultActiveKey="PENDING"
        items={tabItems}
        onChange={handleTabChange}
      />
    </div>
  );
}

export default ForMe;
