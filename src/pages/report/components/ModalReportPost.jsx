import Loading from "@components/Loading";
import ReportService from "@services/report.service";
import { Button, Input, InputNumber, message, Modal } from "antd";
import { useState } from "react";
const { TextArea } = Input;
const ModalReportPost = ({ review }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  async function handleOk() {
    if (phone === "") {
      message.error("Vui lòng nhập số điện thoại cá nhân");
      return;
    }
    const phoneRegex = /^(?:\+84|0)(?:\d{9,10})$/;
    if (!phoneRegex.test(phone)) {
      message.error("Số điện thoại không hợp lệ");
      return;
    }
    if (reason === "") {
      message.error("Vui lòng nhập lý do tố cáo");
      return;
    }
    if (reason.length <= 10) {
      message.error("Lý do tố cáo ít nhất 10 ký tự");
      return;
    }
    const data = {
      reason: reason,
      phone: phone,
      defendant_id: review.seller.id,
      reviewId: review.id,
    };
    setIsLoading(true);

    const [res, err] = await ReportService.postReport(data);
    setIsLoading(false);

    if (err) {
      message.error("Tố cáo thất bại");
      handleCancel();
    } else {
      message.success("Tố cáo thành công");
      handleCancel();
    }
  }
  const handleCancel = () => {
    setIsModalOpen(false);
    resetData();
  };
  const resetData = () => {
    setPhone("");
    setReason("");
  };
  const onChangePhoneNumber = (e) => {
    setPhone(e.target.value);
  };
  const handleChangeReason = (e) => {
    setReason(e.target.value);
  };
  const reportButton = (
    <Button
      type="primary"
      danger
      disabled={review.isReport}
      onClick={showModal}
    >
      Báo cáo
    </Button>
  );
  return (
    <>
      {reportButton}
      <Modal
        title="Báo cáo"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {" "}
        <Loading isLoading={isLoading}>
          <div className="mb-3 flex justify-between">
            <p>Báo cáo tài khoản</p>
            <h2>{review.seller.email}</h2>
          </div>
          <div className="mb-3">
            <p>Số điện thoại</p>
            <Input
              type="number"
              value={phone}
              style={{
                width: "100%",
              }}
              onChange={(e) => onChangePhoneNumber(e)}
            />
          </div>
          <div className="mb-3">
            <p>Lý do</p>
            <TextArea
              rows={4}
              value={reason}
              onChange={handleChangeReason}
              placeholder="Lý do..."
              maxLength={255}
            />
          </div>{" "}
        </Loading>
      </Modal>
    </>
  );
};

export default ModalReportPost;
