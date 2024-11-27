import { Tabs } from "antd";
import { useEffect, useState } from "react";
import TableReviews from "./components/TableReviews";
import ReviewService from "@services/review.service";

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
function FromMe() {
  const [isLoading, setIsLoading] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [currentStatus, setCurrentStatus] = useState("PENDING"); // Trạng thái của tab hiện tại

  useEffect(() => {
    getReviewerReview(currentStatus);
  }, [currentStatus]);

  async function getReviewerReview(status) {
    setIsLoading(true);
    const [res, err] = await ReviewService.getReviewerReview(status);
    setIsLoading(false);
    if (err) {
    } else {
      setReviews(res.data);
    }
  }
  const tabItems = Object.keys(reviewStatus).map((STATUS) => ({
    key: STATUS,
    label: reviewStatus[STATUS].title,
    children: (
      <TableReviews
        isLoading={isLoading}
        reviews={reviews}
        status={currentStatus}
        setReviews={setReviews}
      />
    ),
  }));
  const handleTabChange = (activeKey) => {
    setCurrentStatus(activeKey);
  };
  return (
    <div className="all-product-container">
      <div>Review của bản thân</div>

      <Tabs
        defaultActiveKey="PENDING"
        items={tabItems}
        onChange={handleTabChange}
      />
    </div>
  );
}

export default FromMe;
