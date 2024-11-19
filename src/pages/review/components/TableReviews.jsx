import Loading from "@components/Loading";
import ReviewService from "@services/review.service";
import { Button, message, Table } from "antd";
import React, { useEffect, useState } from "react";
import ModalPostReview from "./ModalPostReview";
import ModalReportPost from "@pages/report/components/ModalReportPost";

const TableReviews = ({ reviews, isLoading, status, setReviews }) => {
  const [reviewLoading, setReviewLoading] = useState(false);

  async function handleChangeDelete(record) {
    setReviewLoading(true);
    const [res, err] = await ReviewService.deleteReview(record.id);
    setReviewLoading(false);
    if (err) {
      message.error("Ẩn bình luận thất bại");
      return;
    } else {
      message.success("Ẩn bình luận thành công");
      setReviews((prevReview) => {
        const updateReviews = prevReview.map((review) =>
          review.id === record.id ? { ...review, status: "HIDDEN" } : review
        );
        return updateReviews.filter((order) => order.status !== "HIDDEN");
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
      width: 100,
    },
    {
      title: "Hình ảnh",
      key: "",
      render: (record) =>
        record.image ? (
          <img
            src={record.image}
            alt={record.image}
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
      title: "Người đánh giá",
      dataIndex: "reviewer.name",
      key: "reviewer.name",
      render: (record) =>
        record?.reviewer?.name || "Không có thông tin người bán",
      width: 100,
    },
    {
      title: "Đánh giá",
      dataIndex: "seller",
      key: "seller",
      render: (seller) => seller?.name || "Không có thông tin người bán",
      width: 100,
    },
    {
      title: "Sao",
      dataIndex: "rating",
      key: "rating",
      render: (rating) => rating || "Không có thông tin người bán",
      width: 50,
    },
    {
      title: "Bình luận",
      dataIndex: "comment",
      key: "comment",
      render: (record) => {
        return record || "Không có bình luận";
      },
      width: 150,
    },
    {
      title: "Thao tác",
      dataIndex: "",
      key: "",
      render: (record) => {
        console.log({ record });
        return record.status === "PENDING" ? (
          <ModalPostReview review={record} setReviews={setReviews} />
        ) : record.status === "PUBLIC" ? (
          <>
            <Button type="primary" onClick={() => handleChangeDelete(record)}>
              Ẩn
            </Button>
            <ModalReportPost review={record} />
          </>
        ) : (
          <Button disabled>Đã ẩn</Button>
        );
      },
      width: 150,
    },
  ];
  return (
    <Loading isLoading={isLoading || reviewLoading}>
      <Table
        columns={columns}
        dataSource={reviews}
        rowKey="id"
        scroll={{
          y: 300,
          x: "max-content",
        }}
      />
    </Loading>
  );
};

export default TableReviews;
