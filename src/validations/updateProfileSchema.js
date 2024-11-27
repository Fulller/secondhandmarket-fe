import Joi from "joi";

const updateProfileSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .messages({
      "string.empty": "Họ tên không được để trống",
      "string.min": "Họ tên phải ít nhất 3 ký tự",
    })
    .optional(),
  phone: Joi.string()
    .pattern(/^[0-9]{10,11}$/)
    .messages({
      "string.empty": "Số điện thoại không được để trống",
      "string.pattern.base": "Số điện thoại phải có 10-11 chữ số",
    })
    .optional(),
  address: Joi.object({
    id: Joi.optional(),
    province: Joi.string().required(),
    district: Joi.string().required(),
    ward: Joi.string().required(),
    detail: Joi.string().max(200).required().messages({
      "any.required": "Địa chỉ là bắt buộc",
      "string.empty": "Địa chỉ không được để trống",
      "string.base": "Địa chỉ không được để trống",
      "string.max": "Địa chỉ chi tiết quá giới hạn 200 ký tự",
    }),
  }),
});

export default updateProfileSchema;
