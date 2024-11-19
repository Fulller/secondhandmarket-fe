import { useState, useEffect } from "react";
import useProduct from "../../state/useProduct";
import { Select, Input, Form, message } from "antd";
import CategoryService from "@services/category.service";
import ErrorMessage from "../ErrorMessage";
import ".scss";

function DetailedInformation() {
  const {
    data: { categoryId, productAttributes },
    dispatch,
  } = useProduct();

  const [attributes, setAttributes] = useState([]);

  useEffect(() => {
    if (categoryId) fetchAttribute();
  }, [categoryId]);

  useEffect(() => {
    dispatch({
      type: "PRODUCT-ATTRIBUTES/SET",
      payload: attributes,
    });
  }, [attributes]);

  async function fetchAttribute() {
    const [res, err] = await CategoryService.getAttributesById(categoryId);
    if (err) {
      message.error("Cannot fetchAttribute");
      return;
    }
    setAttributes(res.data || []);
  }

  const handleChange = (attributeId, value) => {
    dispatch({
      type: "PRODUCT-ATTRIBUTES/UPDATE",
      payload: { attributeId, value },
    });
  };

  return (
    <div id="seller-product-detail-information">
      <h3 className="seller-product-cpn-title">Thông tin chi tiết</h3>
      <div className="attributes">
        {attributes.map((attribute, attributeIndex) => (
          <Form.Item
            key={attribute.id}
            required={attribute.isRequired}
            className="attribute-item"
          >
            {attribute.options.length > 0 ? (
              <Select
                onChange={(value) => handleChange(attribute.id, value)}
                placeholder={`${attribute.name} ${
                  attribute.isRequired ? "*" : ""
                }`}
                dropdownRender={(menu) => (
                  <>
                    {menu}
                    {attribute.isEnter && (
                      <Input
                        style={{ marginTop: 8 }}
                        placeholder={`Nhập ${attribute.name}`}
                        onPressEnter={(e) => {
                          const newOption = e.target.value.trim();
                          if (
                            newOption &&
                            !attribute.options.some(
                              (opt) => opt.name === newOption
                            )
                          ) {
                            setAttributes((prev) =>
                              prev.map((attr) =>
                                attr.id === attribute.id
                                  ? {
                                      ...attr,
                                      options: [
                                        ...attr.options,
                                        { id: Date.now(), name: newOption },
                                      ],
                                    }
                                  : attr
                              )
                            );
                            e.target.value = "";
                          } else {
                            message.warning("Dữ liệu đã tồn tại!");
                          }
                        }}
                      />
                    )}
                  </>
                )}
                allowClear
                value={productAttributes?.[attributeIndex]?.value || null}
              >
                {attribute.options.map((option) => (
                  <Select.Option key={option.id} value={option.name}>
                    {option.name}
                  </Select.Option>
                ))}
              </Select>
            ) : (
              <Input
                placeholder={`Nhập ${attribute.name}`}
                onChange={(e) => handleChange(attribute.id, e.target.value)}
                style={{ width: "100px" }}
              />
            )}
            <ErrorMessage field={`productAttributes.${attributeIndex}.value`} />
          </Form.Item>
        ))}
      </div>
    </div>
  );
}

export default DetailedInformation;
