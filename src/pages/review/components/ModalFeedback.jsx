import { Button, message, Modal } from "antd";
import { useState } from "react";
import { Input } from "antd";
import ReviewService from "@services/review.service";
import Loading from "@components/Loading";
const { TextArea } = Input;

const ModalFeedback = ({ review }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const isDisabledFeedback = review?.feedback != null;

  const showModal = () => {
    setIsModalOpen(true);
  };
  async function handleOk() {
    if (feedback === "") {
      message.error("Vui lòng nhập feedback");
    }
    if (feedback.length < 10) {
      message.error("Feedback lớn hơn 10 ký tự");
    }
    const dataJson = {
      feedback: feedback,
    };
    setIsLoading(true);
    const [res, err] = await ReviewService.postFeedback(review.id, dataJson);
    setIsLoading(false);
    if (err) {
      message.error("Gửi phản hồi thất bại");
      handleCancel();
    } else {
      message.success("Gửi phản hồi thành công");
      handleCancel();
    }
  }
  const handleCancel = () => {
    setIsModalOpen(false);
    setFeedback("");
  };
  const handleChangeFeedback = (e) => {
    setFeedback(e.target.value);
  };
  return (
    <>
      <Button type="primary" onClick={showModal} disabled={isDisabledFeedback}>
        Feedback
      </Button>
      <Modal
        title="Gửi phản hồi cho người mua"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        cancelButtonProps={{ disabled: isLoading }}
        okButtonProps={{ disabled: isLoading }}
      >
        <Loading isLoading={isLoading}>
          <div className="mb-3">
            <p>Nhập phản hồi</p>
            <TextArea
              rows={4}
              value={feedback}
              onChange={handleChangeFeedback}
              placeholder="Phản hồi..."
              maxLength={255}
            />
          </div>
        </Loading>
      </Modal>
    </>
  );
};

export default ModalFeedback;
