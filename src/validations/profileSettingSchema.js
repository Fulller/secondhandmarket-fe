import Joi from "joi";

// Joi schema cho thông tin cá nhân
export const userSchema = Joi.object({
  name: Joi.string().min(3).required().messages({
    "string.empty": "Họ tên không được để trống",
    "string.min": "Họ tên phải ít nhất 3 ký tự",
  }),
  phone: Joi.string()
    .pattern(/^[0-9]{10,11}$/)
    .required()
    .messages({
      "string.empty": "Số điện thoại không được để trống",
      "string.pattern.base": "Số điện thoại phải có 10-11 chữ số",
    }),
});
