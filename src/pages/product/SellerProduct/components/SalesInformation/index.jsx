import React, { useCallback } from "react";
import useProduct from "../../state/useProduct";
import { debounce } from "lodash";
import InputField from "./InputField";
import ".scss";

function SalesInformation() {
  const {
    data: { name, description, price },
    dispatch,
  } = useProduct();

  const debouncedDispatch = useCallback(
    debounce((field, value) => {
      dispatch({ type: "FIELD/UPDATE", payload: { field, value } });
    }, 300),
    [dispatch]
  );

  const handleChangeValue = (field) => (value) => {
    debouncedDispatch(field, value);
  };

  const fields = [
    {
      field: "name",
      label: "Tên sản phẩm",
      defaultValue: name,
      required: true,
      min: 20,
      max: 1000,
    },
    {
      field: "description",
      label: "Mô tả sản phẩm",
      defaultValue: description,
      required: true,
      textArea: true,
      min: 100,
      max: 10000,
    },
    {
      field: "price",
      label: "Giá sản phẩm",
      defaultValue: price,
      required: true,
      type: "number",
      min: 100000,
      max: 1000000000,
    },
  ];

  return (
    <div id="seller-product-sales-information">
      <h3 className="seller-product-cpn-title">Thông tin Bán hàng</h3>
      {fields.map(({ field, ...props }) => (
        <InputField
          key={field}
          field={field}
          onChange={handleChangeValue(field)}
          {...props}
        />
      ))}
    </div>
  );
}

export default SalesInformation;
