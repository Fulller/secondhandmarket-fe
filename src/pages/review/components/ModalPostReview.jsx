import { Button, message, Modal, Rate, Upload } from "antd";
import { useState } from "react";
import { TfiCommentsSmiley } from "react-icons/tfi";
import { Input } from "antd";
const { TextArea } = Input;
import { PlusOutlined } from "@ant-design/icons";
import uploadService from "@services/upload.service";
import ReviewService from "@services/review.service";
import Loading from "@components/Loading";
import { useSelector } from "react-redux";
import ModalFeedback from "./ModalFeedback";

const ModalPostReview = ({ review, setReviews }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const currentUserId = useSelector((state) => state.auth.user.id);
  const isReviewer = currentUserId === review?.reviewer?.id;
  const isPending = review?.status === "PENDING";

  let buttonLabel = null;
  let isDisabled = false;

  if (isReviewer) {
    if (isPending) {
      buttonLabel = "Review";
    } else {
      buttonLabel = "Rated";
      isDisabled = true;
    }
  } else  {
    if (isPending) {
      buttonLabel = "null";
      isDisabled = true;
    } else {
      buttonLabel = "Feedback";
    }
  }

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    setIsLoading(true);
    const data = {
      rating,
      comment,
    };
    if (!rating) {
      message.error("Vui lòng đánh giá sao");
      setIsLoading(false);
      return;
    }
    if (!comment) {
      message.error("Vui lòng nhập bình luận");
      setIsLoading(false);
      return;
    }
    if (file) {
      const [result, error] = await uploadService.image(file);
      if (error) {
        console.error("Upload hình ảnh thất bại");
        setIsLoading(false);
        return;
      }
      data.image = result?.data;
    }

    console.log({ review });
    const [res, err] = await ReviewService.postReview(review.id, data);
    setIsLoading(false);
    if (err) {
      message.error("Đăng bình luận thất bại");
      return;
    } else {
      message.success("Gửi đánh giá thành công");
      setIsModalOpen(false);
      setReviews((prevReviews) => {
        const updatedReviews = [
          ...prevReviews,
          { ...res.data, status: "PUBLIC" },
        ];

        console.log({
          updatedReviews: updatedReviews.filter(
            (review) => review.status !== "PUBLIC"
          ),
        });
      });
      resetForm();
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setRating(0);
    setComment("");
    setFile(null);
  };

  const handleChangeRating = (value) => {
    setRating(value);
  };

  const handleChangeComment = (e) => {
    setComment(e.target.value);
  };

  const handleUploadChange = ({ file }) => {
    setFile(file.originFileObj); // Lấy file gốc để gửi lên server
  };

  const beforeUpload = (file) => {
    const isImage = file.type.startsWith("image/");
    const isSizeValid = file.size / 1024 / 1024 < 2; // Giới hạn 2MB
    if (!isImage) {
      console.error("Chỉ chấp nhận file hình ảnh");
    }
    if (!isSizeValid) {
      console.error("Dung lượng file phải nhỏ hơn 2MB");
    }
    return isImage && isSizeValid; // Chỉ chấp nhận file hợp lệ
  };
  console.log({ review, currentUserId });

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Chọn hình ảnh</div>
    </div>
  );

  return (
    <Loading isLoading={isLoading}>
      {buttonLabel === "Feedback" ? (
        <ModalFeedback review={review} />
      ) : buttonLabel === "Review" ? (
        <Button type="primary" onClick={showModal} disabled={isDisabled}>
          <TfiCommentsSmiley /> Review
        </Button>
      ) : (
        <Button disabled={true}>{buttonLabel}</Button>
      )}

      <Modal
        title="Nhận xét sản phẩm"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        cancelButtonProps={{ disabled: isLoading }}
        okButtonProps={{ disabled: isLoading }}
      >
        <div className="mb-3">
          <p>Đánh giá</p>
          <Rate value={rating} onChange={handleChangeRating} />
        </div>
        <div className="mb-3">
          <p>Hình ảnh</p>
          <Upload
            listType="picture-card"
            beforeUpload={beforeUpload}
            onChange={handleUploadChange}
            maxCount={1} // Chỉ cho phép tải lên 1 file
          >
            {!file && uploadButton}
          </Upload>
        </div>
        <div className="mb-3">
          <p>Bình luận</p>
          <TextArea
            rows={4}
            value={comment}
            onChange={handleChangeComment}
            placeholder="Bình luận..."
            maxLength={255}
          />
        </div>
      </Modal>
    </Loading>
  );
};

export default ModalPostReview;
