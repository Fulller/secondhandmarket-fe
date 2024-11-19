import Joi from "joi";

// Joi schema cho thông tin cá nhân
const profileSettingSchema = Joi.object({
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
  address: Joi.object({
    detail: Joi.string().min(5).required().messages({
      "string.empty": "Địa chỉ chi tiết không được để trống",
      "string.min": "Địa chỉ chi tiết phải ít nhất 5 ký tự",
    }),
    province: Joi.string().optional(),
    district: Joi.string().optional(),
    ward: Joi.string().optional(),
  }).required().messages({
    "object.base": "Thông tin địa chỉ không được để trống"
  }).unknown(null)
}).unknown(null);

export default profileSettingSchema;
