import Joi from "joi";

const changePasswordSchema = Joi.object({
  currentPassword: Joi.string()
    .required()
    .messages({
      "any.required": "Mật khẩu hiện tại là bắt buộc",
      "string.empty": "Mật khẩu hiện tại là bắt buộc",
    }),
  newPassword: Joi.string()
    .min(6)
    .required()
    .messages({
      "any.required": "Mật khẩu mới là bắt buộc",
      "string.empty": "Mật khẩu mới là bắt buộc",
      "string.min": "Mật khẩu mới phải có ít nhất 6 ký tự",
    }),
  confirmNewPassword: Joi.string()
    .valid(Joi.ref("newPassword"))
    .required()
    .messages({
      "any.only": "Mật khẩu xác nhận không khớp",
      "any.required": "Xác nhận mật khẩu mới là bắt buộc",
    }),
});

export default changePasswordSchema;
