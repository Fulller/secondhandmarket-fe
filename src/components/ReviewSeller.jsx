import ReviewService from "@services/review.service";
import { Avatar, Card, Image, message, Rate, Tag, Typography } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "./Loading";
const { Text, Title } = Typography;
import { UserOutlined } from "@ant-design/icons";

const ReviewSeller = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [reviews, setReviews] = useState([]);
  const { id } = useParams();
  const renderStatusTag = (status) => {
    switch (status) {
      case "PENDING":
        return <Tag color="orange">Pending</Tag>;
      case "PUBLIC":
        return <Tag color="green">PUBLIC</Tag>;
      default:
        return <Tag color="default">HIDDEN</Tag>;
    }
  };
  useEffect(() => {
    handleGetReviewsSeller();
  }, []);

  async function handleGetReviewsSeller() {
    setIsLoading(true);
    const [res, err] = await ReviewService.getShopReview(id, "PUBLIC");
    setIsLoading(false);
    if (err) {
      message.error(err.message);
    } else {
      message.success("Lấy dữ liệu thành công");
      setReviews(res.data);
    }
  }
  return (
    <Loading isLoading={isLoading}>
      {reviews ? (
        reviews.map((review) => (
          <div key={review.id}>
            <Card
              title={
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Avatar
                    src={review.reviewer.avatar}
                    icon={<UserOutlined />}
                  />
                  <div style={{ marginLeft: 12 }}>
                    <Title level={5} style={{ margin: 0 }}>
                      {review.reviewer.name}
                    </Title>
                    <Text type="secondary">{review.reviewer.email}</Text>
                  </div>
                </div>
              }
              extra={renderStatusTag(review.status)}
              style={{ marginBottom: 16 }}
            >
              {/* Rating and Comment */}
              <div style={{ marginBottom: 16 }}>
                <Rate disabled defaultValue={review.rating} />
                <Text style={{ display: "block", marginTop: 8 }}>
                  {review.comment}
                </Text>
              </div>

              {/* Product Details */}
              {review.product && (
                <Card
                  type="inner"
                  title="Product Details"
                  style={{ marginBottom: 16 }}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Image
                      width={80}
                      src={review.product.thumbnail}
                      alt={review.product.name}
                      style={{ marginRight: 16 }}
                    />
                    <div>
                      <Title level={5}>{review.product.name}</Title>
                      <Text strong style={{ color: "#52c41a" }}>
                        ${review.product.price}
                      </Text>
                    </div>
                  </div>
                </Card>
              )}

              {/* Seller Details */}
              {review.seller && (
                <Card type="inner" title="Seller Details">
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Avatar
                      src={review.seller.avatar}
                      icon={<UserOutlined />}
                    />
                    <div style={{ marginLeft: 12 }}>
                      <Title level={5} style={{ margin: 0 }}>
                        {review.seller.name}
                      </Title>
                      <Text>{review.seller.phone}</Text>
                    </div>
                  </div>
                </Card>
              )}

              {/* Feedback */}
              {review.feedbackFromSeller && (
                <div style={{ marginTop: 16 }}>
                  <Title level={5}>Phản hồi từ người bán</Title>
                  <Text>{review.feedbackFromSeller}</Text>
                </div>
              )}

              {/* Review Info */}
              <div style={{ marginTop: 16 }}>
                <Text type="secondary">
                  {`Created at: ${new Date(
                    review.created_at
                  ).toLocaleString()}`}
                </Text>
                {review.isReport && (
                  <Tag color="red" style={{ marginLeft: 8 }}>
                    REPORTED
                  </Tag>
                )}
              </div>
            </Card>
          </div>
        ))
      ) : (
        <p>Phần đánh giá của người bán sẽ hiển thị ở đây.</p>
      )}
    </Loading>
  );
};

export default ReviewSeller;
