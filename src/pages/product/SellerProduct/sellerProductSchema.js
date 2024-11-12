import Joi from "joi";

const schema = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "Tên sản phẩm không được để trống",
    "any.required": "Tên sản phẩm là bắt buộc",
  }),
  description: Joi.string().required().messages({
    "string.empty": "Mô tả không được để trống",
    "any.required": "Mô tả là bắt buộc",
  }),
  price: Joi.number().min(0).required().messages({
    "number.base": "Giá phải là một số",
    "number.min": "Giá không thể nhỏ hơn 0",
    "any.required": "Giá là bắt buộc",
  }),
  addressId: Joi.string().messages({
    "string.empty": "Địa chỉ không hợp lệ",
    "any.required": "Địa chỉ là bắt buộc",
  }),
  thumbnail: Joi.string().messages({
    "string.empty": "Ảnh đại diện không hợp lệ",
  }),
  video: Joi.string().messages({
    "string.empty": "Video không hợp lệ",
  }),
  images: Joi.array().items(Joi.string()).messages({
    "array.base": "Danh sách hình ảnh không hợp lệ",
    "string.base": "Đường dẫn hình ảnh phải là một chuỗi",
  }),
  categoryId: Joi.string().required().messages({
    "string.empty": "Danh mục không được để trống",
    "any.required": "Danh mục là bắt buộc",
  }),
  productAttributes: Joi.array()
    .items(
      Joi.object({
        attributeId: Joi.string().required().messages({
          "string.empty": "Mã thuộc tính không được để trống",
          "any.required": "Mã thuộc tính là bắt buộc",
        }),
        value: Joi.string().required().messages({
          "string.empty": "Giá trị thuộc tính không được để trống",
          "any.required": "Giá trị thuộc tính là bắt buộc",
        }),
      })
    )
    .messages({
      "array.base": "Danh sách thuộc tính sản phẩm không hợp lệ",
    }),
});

export default schema;
