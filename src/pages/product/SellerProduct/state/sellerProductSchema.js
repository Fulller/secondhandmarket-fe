import Joi from "joi";

function createSchema(attributes) {
  return Joi.object({
    id: Joi.optional(),
    name: Joi.string().min(20).max(1000).required().messages({
      "string.empty": "Mô tả không được để trống",
      "any.required": "Mô tả là bắt buộc",
      "string.min": "Tên sản phẩm phải từ 20 ký tự.",
      "string.max": "Tên sản phẩm quá giới hạn 1000 ký tự",
    }),
    description: Joi.string().min(100).max(100000).required().messages({
      "string.empty": "Mô tả không được để trống",
      "any.required": "Mô tả là bắt buộc",
      "string.min": "Mô tả phải từ 100 ký tự.",
      "string.max": "Mô tả quá giới hạn 100000 ký tự",
    }),
    price: Joi.number().min(100000).max(1000000000).required().messages({
      "number.base": "Giá phải là một số",
      "number.min": "Giá không thể nhỏ hơn 100 nghìn đồng.",
      "number.max": "Giá không thể lớn hơn 1 tỷ đồng",
      "any.required": "Giá là bắt buộc",
    }),
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
    thumbnail: Joi.string().messages({
      "string.empty": "Ảnh đại diện không hợp lệ",
    }),
    video: Joi.optional(),
    images: Joi.array().items(Joi.any()).min(1).max(6).messages({
      "array.base": "Danh sách hình ảnh không hợp lệ.",
      "string.base": "Đường dẫn hình ảnh phải là một chuỗi.",
      "array.min": "Ít nhất phải có 1 ảnh cho sản phẩm.",
    }),
    categoryId: Joi.string().required().messages({
      "string.empty": "Danh mục không được để trống",
      "any.required": "Danh mục là bắt buộc",
    }),
    productAttributes: Joi.array()
      .items(
        Joi.object({
          id: Joi.optional(),
          attribute: Joi.object({
            id: Joi.string().required().messages({
              "any.required": "ID thuộc tính là bắt buộc.",
              "string.guid": "ID thuộc tính không hợp lệ.",
            }),
          }).required(),
          value: Joi.alternatives().conditional(Joi.ref("attribute.id"), {
            is: Joi.any().valid(
              ...attributes
                .filter((attr) => attr.isRequired)
                .map((attr) => attr.id)
            ),
            then: Joi.string().required().messages({
              "any.required": "Giá trị cho thuộc tính này là bắt buộc.",
              "string.empty": "Giá trị thuộc tính không được để trống.",
            }),
            otherwise: Joi.string().allow("", null).messages({
              "string.empty": "Giá trị thuộc tính không được để trống.",
            }),
          }),
        })
      )
      .required()
      .min(1)
      .messages({
        "array.min": "Phải có ít nhất một thuộc tính sản phẩm.",
        "any.required": "Thuộc tính sản phẩm là bắt buộc.",
      }),
  });
}

export default createSchema;
