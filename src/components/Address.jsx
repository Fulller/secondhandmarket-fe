import dataAddress from "@assets/json/address.json";
import { Modal, Input } from "antd"; // Import Input từ antd
import { useState, useContext, useEffect } from "react";
import { FormContext } from "./Form";

const Address = ({ onChange: handleSumbit, address }) => {
  const { handleChange, errors } = useContext(FormContext);
  const data = dataAddress;
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");
  const [detailAddress, setDetailAddress] = useState(""); // Biến trạng thái lưu địa chỉ chi tiết
  const [isModalOpenAddress, setIsModalOpenAddress] = useState(false);
  const [showAddress, setShowAddress] = useState("");

  // Lấy danh sách huyện dựa vào tỉnh đã chọn
  const districts = selectedProvince
    ? data[selectedProvince]?.district || {}
    : {};

  // Lấy danh sách xã dựa vào huyện đã chọn
  const wards = selectedDistrict ? districts[selectedDistrict]?.ward || {} : {};

  useEffect(() => {
    if (address) {
      setSelectedProvince(address.province || "");
      setSelectedDistrict(address.district || "");
      setSelectedWard(address.ward || "");
      setDetailAddress(address.detail || "");
      setShowAddress(
        `${address.detail}, ${address.ward}, ${address.district}, ${address.province}`
      );
    }
  }, [address]);

  const handleSaveAddress = () => {
    const address =
      data[selectedProvince].name +
      ", " +
      data[selectedProvince].district[selectedDistrict].name +
      ", " +
      data[selectedProvince].district[selectedDistrict].ward[selectedWard]
        .name +
      ", " +
      detailAddress;
    handleAddressSelect(address);
    handleSumbit({
      province: data[selectedProvince].name,
      district: data[selectedProvince].district[selectedDistrict].name,
      ward: data[selectedProvince].district[selectedDistrict].ward[selectedWard]
        .name,
      detail: detailAddress,
    });
    handleCancelAddress();
  };
  const showModalAddress = () => {
    setIsModalOpenAddress(true);
  };
  const handleCancelAddress = () => {
    setIsModalOpenAddress(false);
  };
  const handleAddressSelect = (selectedAddress) => {
    setShowAddress(selectedAddress);
  };
  return (
    <>
      <span className="text-2xl font-bold">Thông tin người bán</span>

      <input
        readOnly
        className="mb-5 mt-3 block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        placeholder={
          showAddress && Object.keys(showAddress).length > 0
            ? showAddress // Hiển thị địa chỉ cụ thể
            : "Địa chỉ" // Placeholder mặc định nếu chưa có địa chỉ
        }
        onClick={showModalAddress}
      />
      {errors["province"] ? (
        <p className="text-red-500">{errors["province"]}</p>
      ) : errors["district"] ? (
        <p className="text-red-500">{errors["district"]}</p>
      ) : errors["ward"] ? (
        <p className="text-red-500">{errors["ward"]}</p>
      ) : errors["detail"] ? (
        <p className="text-red-500">{errors["detail"]}</p>
      ) : null}

      <Modal
        footer={null}
        open={isModalOpenAddress}
        onCancel={handleCancelAddress}
      >
        <div className="text-xl font-bold mb-5">ĐỊA CHỈ</div>
        <label className="mb-3">
          <select
            className="mb-3 block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            value={selectedProvince}
            onChange={(e) => {
              setSelectedProvince(e.target.value);
              setSelectedDistrict("");
              setSelectedWard("");
              handleChange("province", e.target.value);
            }}
          >
            <option value="">Chọn Tỉnh, thành phố</option>
            {Object.keys(data).map((provinceCode) => (
              <option key={provinceCode} value={provinceCode}>
                {data[provinceCode].name}
              </option>
            ))}
          </select>
        </label>
        {errors["province"] && (
          <p className="text-red-500">{errors["province"]}</p>
        )}
        <label className="mb-3">
          <select
            className="mb-3 block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            value={selectedDistrict}
            onChange={(e) => {
              setSelectedDistrict(e.target.value);
              setSelectedWard("");
              handleChange("district", e.target.value); // Reset xã/phường khi chọn huyện mới
            }}
            disabled={!selectedProvince}
          >
            <option value="">Chọn huyện/quận</option>
            {Object.keys(districts).map((districtCode) => (
              <option key={districtCode} value={districtCode}>
                {districts[districtCode].name}
              </option>
            ))}
          </select>
        </label>

        <label>
          <select
            className="mb-3 block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            value={selectedWard}
            onChange={(e) => {
              setSelectedWard(e.target.value),
                handleChange("ward", e.target.value);
            }}
            disabled={!selectedDistrict}
          >
            <option value="">Chọn xã/phường</option>
            {Object.keys(wards).map((wardCode) => (
              <option key={wardCode} value={wardCode}>
                {wards[wardCode].name}
              </option>
            ))}
          </select>
        </label>

        {/* Hiển thị ô nhập địa chỉ chi tiết sau khi chọn xã/phường */}
        {selectedWard && (
          <div className="mb-3">
            <label>
              <Input
                className="mb-5 block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Địa chỉ chi tiết"
                value={detailAddress}
                onChange={(e) => {
                  setDetailAddress(e.target.value),
                    handleChange("detail", e.target.value);
                }} // Cập nhật giá trị địa chỉ chi tiết
              />
              <input
                type="button"
                className=" block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                style={{ backgroundColor: "#FFB057", cursor: "pointer" }}
                value={"Xong"}
                onClick={handleSaveAddress} // Đóng modal khi nhấn nút "Xong"
              />
            </label>
          </div>
        )}
      </Modal>
    </>
  );
};

export default Address;
