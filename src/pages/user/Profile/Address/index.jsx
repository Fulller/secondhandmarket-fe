import React, { useContext, useEffect, useState } from "react";
import { Select, Modal, Button, Input, message } from "antd";
import { FormContext } from "@components/Form";
import data from "@assets/json/address.json";
import ModalSelect from "@components/ModalSelect";
import AddressService from "@services/address.service";
import useAddress from "@hooks/useAddress";
import ".scss";
import _, { debounce } from "lodash";

const { Option } = Select;

const AddressSelector = ({ address: initAddress = {} }) => {
  const { errors, handleChange } = useContext(FormContext);
  const [address, setAddress] = useState(initAddress);
  const { id, province, district, ward, detail } = address;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const isOK = province && district && ward && detail;
  const addressGetter = useAddress();

  useEffect(() => {
    setAddress(
      _.pick(initAddress, ["id", "province", "district", "ward", "detail"])
    );
  }, [initAddress]);

  function dispatch({ field, value }) {
    setAddress((prev) => ({ ...prev, [field]: value }));
  }

  useEffect(() => {
    id && fetchExistedAddress();
  }, []);

  const fetchExistedAddress = async () => {
    const [res, err] = await AddressService.getAddressByid(id);
    if (err) {
      message.error(err.message);
      return;
    }
  };

  const handleChangeAddressField = (field, value) => {
    dispatch({ field, value });
  };

  const handleChangeAddressDetail = debounce((field, value) => {
    dispatch({ field, value });
  }, 300);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    handleChange("address", address);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div id="seller-product-address">
      <ModalSelect
        onClick={showModal}
        isShowValue={isOK}
        value={isOK ? addressGetter.full(address) : ""}
        placehoder={"Chọn địa chỉ"}
        label="Địa chỉ"
      >
        <Modal
          title="Chọn địa chỉ"
          open={isModalVisible}
          onCancel={handleCancel}
          footer={[
            <Button
              key="ok"
              type="primary"
              onClick={handleOk}
              style={{ width: "100%" }}
            >
              Xong
            </Button>,
          ]}
        >
          {/* Province Select */}
          <Select
            allowClear
            placeholder="Chọn tỉnh / thành phố"
            onChange={(value) => handleChangeAddressField("province", value)}
            value={province}
            style={{ width: "100%", marginBottom: 10 }}
            showSearch
            filterOption={(input, option) =>
              option.children.toLowerCase().includes(input.toLowerCase())
            }
          >
            {Object.keys(data).map((provinceCode) => (
              <Option key={provinceCode} value={provinceCode}>
                {data[provinceCode].name}
              </Option>
            ))}
          </Select>

          {/* District Select */}
          <Select
            allowClear
            placeholder="Chọn quận / huyện"
            onChange={(value) => handleChangeAddressField("district", value)}
            value={district}
            style={{ width: "100%", marginBottom: 10 }}
            showSearch
            disabled={!province}
            filterOption={(input, option) =>
              option.children.toLowerCase().includes(input.toLowerCase())
            }
          >
            {Object.keys(data[province]?.district || {}).map((districtCode) => (
              <Option key={districtCode} value={districtCode}>
                {data[province]?.district[districtCode].name}
              </Option>
            ))}
          </Select>

          {/* Ward Select */}
          <Select
            allowClear
            placeholder="Chọn xã / phường"
            onChange={(value) => handleChangeAddressField("ward", value)}
            value={ward}
            style={{ width: "100%", marginBottom: 10 }}
            showSearch
            disabled={!district}
            filterOption={(input, option) =>
              option.children.toLowerCase().includes(input.toLowerCase())
            }
          >
            {Object.keys(data[province]?.district[district]?.ward || {}).map(
              (wardCode) => (
                <Option key={wardCode} value={wardCode}>
                  {data[province]?.district[district]?.ward[wardCode].name}
                </Option>
              )
            )}
          </Select>

          {/* Detailed Address Input */}
          <Input
            placeholder="Nhập địa chỉ chi tiết (số nhà, tên đường)"
            defaultValue={detail}
            onChange={(e) =>
              handleChangeAddressDetail("detail", e.target.value)
            }
            style={{ width: "100%", marginTop: 10 }}
            disabled={!ward}
          />
        </Modal>
      </ModalSelect>
      {errors["address"] && (
        <p className="text-red-500 text-sm mt-1">{errors["address"]}</p>
      )}
    </div>
  );
};

export default AddressSelector;
