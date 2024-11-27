import Joi from "joi";
// Định nghĩa schema để validate
const schema = Joi.object({
  // images: Joi.string().min(10).required().messages({
  //   "string.base": `"Địa chỉ" phải là một chuỗi`,
  //   "string.empty": `"Địa chỉ" không được để trống`,
  //   "string.min": `"Địa chỉ" phải có ít nhất 10 ký tự`,
  //   "any.required": `"Địa chỉ" là trường bắt buộc`,
  // }),

  province: Joi.string().required().messages({
    "string.base": `"Tỉnh/Thành phố" phải là một chuỗi`,
    "string.empty": `"Tỉnh/Thành phố" không được để trống`,
    "any.required": `"Tỉnh/Thành phố" là trường bắt buộc`,
  }),
  district: Joi.string().required().messages({
    "string.base": `"Quận/Huyện" phải là một chuỗi`,
    "string.empty": `"Quận/Huyện" không được để trống`,
    "any.required": `"Quận/Huyện" là trường bắt buộc`,
  }),
  ward: Joi.string().required().messages({
    "string.base": `"xã/phường" phải là một chuỗi`,
    "string.empty": `"xã/phường" không được để trống`,
    "any.required": `"xã/phường" là trường bắt buộc`,
  }),
  detail: Joi.string().required().messages({
    "string.base": `"Địa chỉ chi tiết" phải là một chuỗi`,
    "string.empty": `"Địa chỉ chi tiết" không được để trống`,
    "any.required": `"Địa chỉ chi tiết" là trường bắt buộc`,
  }),

  name: Joi.string().min(10).required().messages({
    "string.base": `"name" phải là một chuỗi`,
    "string.empty": `"name" không được để trống`,
    "string.min": `"name" phải có ít nhất 10 ký tự`,
    "any.required": `"name" là trường bắt buộc`,
  }),

  description: Joi.string().min(100).required().messages({
    "string.base": `"description" phải là một chuỗi`,
    "string.empty": `"description" không được để trống`,
    "string.min": `"description" phải có ít nhất 100 ký tự`,
    "any.required": `"description" là trường bắt buộc`,
  }),

  price: Joi.number().min(100000).required().messages({
    "number.base": `"price" phải là một số`,
    "number.min": `"price" phải lớn hơn hoặc bằng 100.000`,
    "any.required": `"price" là trường bắt buộc`,
  }),
}).unknown(true);

// Hàm để tạo schema động
const createDynamicSchema = (attributes) => {
  const dynamicFields = {};

  // Thêm các trường động vào schema
  attributes.forEach((attr) => {
    dynamicFields[`attribute@${attr.id}`] = Joi.string()
      .required()
      .messages({
        "string.base": `"${attr.name}" phải là một chuỗi`,
        "string.empty": `"${attr.name}" không được để trống`,
        "any.required": `"${attr.name}" là trường bắt buộc`,
      });
  });

  return schema.append(dynamicFields);
};

export default createDynamicSchema;
