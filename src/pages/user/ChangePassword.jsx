import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import AuthService from "@services/auth.service";
import changePasswordSchema from "@validations/changePasswordSchema";
import HeaderForm from "../auth/components/HeaderForm";
import { Form, Field, SubmitButton, ErrorMessage } from "@components/Form";

const ChangePassword = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (data) => {
    const { currentPassword, newPassword, confirmNewPassword } = data;

    if (newPassword !== confirmNewPassword) {
      setErrorMessage("Mật khẩu xác nhận không khớp.");
      toast.error("Mật khẩu xác nhận không khớp.");
      return;
    }

    const [result, errorResponse] = await AuthService.changePassword({
      currentPassword,
      newPassword,
    });

    if (errorResponse) {
      if (errorResponse.code === "auth-e-01") {
        setErrorMessage("Mật khẩu hiện tại không chính xác.");
        toast.error("Mật khẩu hiện tại không chính xác.");
      } else {
        setErrorMessage("Mật khẩu hiện tại không chính xác!");
        toast.error("Mật khẩu hiện tại không chính xác!");
      }
      return;
    }

    toast.success("Đổi mật khẩu thành công!");
    setErrorMessage("");
    navigate("/setting");
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <HeaderForm>Đổi mật khẩu</HeaderForm>
        <Form onSubmit={handleSubmit} schema={changePasswordSchema}>
          <Field
            name="currentPassword"
            label="Mật khẩu hiện tại"
            type="password"
            placeholder="Nhập mật khẩu hiện tại"
          />
          <Field
            name="newPassword"
            label="Mật khẩu mới"
            type="password"
            placeholder="Nhập mật khẩu mới"
          />
          <Field
            name="confirmNewPassword"
            label="Xác nhận mật khẩu mới"
            type="password"
            placeholder="Nhập lại mật khẩu mới"
          />
          <ErrorMessage message={errorMessage} />
          <SubmitButton loadingText="Đang xử lý yêu cầu...">
            Đổi mật khẩu
          </SubmitButton>
        </Form>
      </div>
    </div>
  );
};

export default ChangePassword;
