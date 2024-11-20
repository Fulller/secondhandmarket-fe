import { message, Modal } from "antd";
import { useState } from "react";
import { Input } from "antd";
import { useSelector } from "react-redux";
import PurchaseRequestService from "@services/purchaseRequest.service";
import Loading from "@components/Loading";
import { useNavigate } from "react-router-dom";
import useMessage from "@hooks/useMessage";
import useNavAndSaveRedirect from "@hooks/useNavAndSaveRedirect";

const ModalRequestPurchase = ({ product }) => {
  const { TextArea } = Input;
  const isLoging = useSelector((state) => state.auth.isLoging);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messageRequest, setMessageRequest] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messageApi = useMessage({
    "product-e-03": "Đã tạo yêu cầu mua hàng rồi",
    "user-e-01": "Không tìm thấy tài khoản người mua",
    "product-e-01": "Không tìm thấy sản phẩm",
    "product-e-02": "Sản phẩm không tồn tại",
    "purchaseRequest-e-04": "Không thể tạo yêu cầu mua vì bạn là chủ sản phẩm",
  });
  const nav = useNavAndSaveRedirect();
  const showModal = () => {
    if (isLoging) {
      setIsModalOpen(true);
    } else {
      message.error("Vui lòng đăng nhập để thực hiện yêu cầu mua");
      nav("/login");
    }
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setMessageRequest("");
  };
  const handleChangeMessage = (e) => {
    setMessageRequest(e.target.value);
  };
  async function handleRequestPurchase() {
    if (messageRequest === "") {
      message.error("Vui lòng nhập lời nhắn");
      return;
    }
    setIsLoading(true);
    const [res, err] = await PurchaseRequestService.postPurchaseRequest(
      product.id,
      messageRequest
    );
    setIsLoading(false);
    if (err) {
      messageApi.error(err.code);
      handleCancel();
    } else {
      message.success("Yêu cầu mua thành công");
      handleCancel();
      nav("/purchase-request/my");
    }
  }
  return (
    <>
      <button
        onClick={showModal}
        className="bg-blue-500 text-white py-2 px-8 rounded-lg text-lg font-semibold shadow-md hover:bg-blue-600 transition duration-300"
      >
        Yêu cầu mua
      </button>
      <Modal
        title="Yêu cầu mua hàng"
        open={isModalOpen}
        onOk={handleRequestPurchase}
        onCancel={handleCancel}
        cancelButtonProps={{ disabled: isLoading }}
        okButtonProps={{ disabled: isLoading }}
      >
        <Loading isLoading={isLoading}>
          <div className="mb-3">
            <p>Lời nhắn cho người bán</p>
            <TextArea
              rows={4}
              value={messageRequest}
              onChange={(e) => handleChangeMessage(e)}
              placeholder="Lời nhắn..."
              maxLength={255}
            />
          </div>
        </Loading>
      </Modal>
    </>
  );
};

export default ModalRequestPurchase;
