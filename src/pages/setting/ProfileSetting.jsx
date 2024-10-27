import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import AuthService from "@services/auth.service";
import defaultAvatar from '../../assets/images/default-avatar.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import provincesData from '../../assets/json/local.json';

const ProfileSetting = () => {
  const [userData, setUserData] = useState({
    name: "",
    phone: "",
    avatar: "",
    address: {
      id: "",
      province: "",
      district: "",
      ward: "",
      detail: "",
    },
  });
  const [isEditingInfo, setIsEditingInfo] = useState(false); 
  const [isEditingAddress, setIsEditingAddress] = useState(false); 
  useEffect(() => {
    const fetchUserData = async () => {
      const [result, errorResponse] = await AuthService.getUserInfo();
      if (errorResponse) {
        toast.error("Không thể lấy thông tin người dùng.");
        return;
      }
      const data = result.data || {};
      setUserData({
        name: data.name || undefined,
        phone: data.phone || "",
        avatar: data.avatar || "",
        address: {
          id: data.address?.id || "",
          province: data.address?.province || "",
          district: data.address?.district || "",
          ward: data.address?.ward || "",
          detail: data.address?.detail || "",
        },
      });
    };
    fetchUserData();
  }, []);

  const handleAvatarChange = async (event) => {
    const file = event.target.files[0];
  
    if (file) {
      const formData = new FormData();
      formData.append("file", file); 
  
      try {
        const response = await AuthService.uploadImage(formData); 
        console.log("Response from upload:", response); 
  
       
        const imageUrl = response.data.data; 
        console.log("Image URL:", imageUrl); 
  
        setUserData((prev) => ({
          ...prev,
          avatar: imageUrl, 
        }));
      } catch (error) {
        console.error("Upload failed", error);
        toast.error("Có lỗi xảy ra khi upload ảnh.");
      }
    }
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("address.")) {
      setUserData((prevData) => ({
        ...prevData,
        address: {
          ...prevData.address,
          [name.split('.')[1]]: value
        }
      }));
    } else {
      setUserData((prevData) => ({
        ...prevData,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const updatedUserData = { ...userData }; 
  
    
    const dataToUpdate = {};
    if (updatedUserData.name !== "") dataToUpdate.name = updatedUserData.name;
    if (updatedUserData.phone !== "") dataToUpdate.phone = updatedUserData.phone;
    if (updatedUserData.avatar) dataToUpdate.avatar = updatedUserData.avatar;
  
    
    const addressId = updatedUserData.address.id;
  
    
    if (updatedUserData.address.province || updatedUserData.address.district || updatedUserData.address.ward || updatedUserData.address.detail) {
      if (addressId) {
        
        const addressToUpdate = {};
        if (updatedUserData.address.province) addressToUpdate.province = updatedUserData.address.province;
        if (updatedUserData.address.district) addressToUpdate.district = updatedUserData.address.district;
        if (updatedUserData.address.ward) addressToUpdate.ward = updatedUserData.address.ward;
        if (updatedUserData.address.detail) addressToUpdate.detail = updatedUserData.address.detail;
  
        
        if (Object.keys(addressToUpdate).length > 0) {
          const [addressResult, addressError] = await AuthService.updateAddress(addressId, addressToUpdate);
          if (addressError) {
            toast.error("Cập nhật địa chỉ thất bại!");
            return;
          }
        }
      } else {
        
        const [addressResult, addressError] = await AuthService.createAddress(updatedUserData.address);
        if (addressError) {
          toast.error("Tạo địa chỉ mới thất bại!");
          return;
        }
        updatedUserData.address.id = addressResult.data.id; 
      }
    }
  
    
    const [result, errorResponse] = await AuthService.updateUserInfo(dataToUpdate);
    if (errorResponse) {
      toast.error("Cập nhật thông tin thất bại!");
      return;
    }
  
    toast.success("Cập nhật thông tin thành công!");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 bg-[url('https://res.cloudinary.com/dt2tfpjrm/image/upload/v1730040121/secondhandmarket/60f1d9f1-d292-4a69-b0c1-35e5d047b42e/images/cwlzkl9hokhapuqlst7e.avif')] bg-cover bg-center min-h-screen flex items-center justify-center" >
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Chỉnh sửa thông tin cá nhân</h2>
        
        <form onSubmit={handleSubmit} >
          <div className="text-center mb-6">
            <div className="relative w-32 h-32 mx-auto mb-4">
              <img 
                src={userData.avatar || defaultAvatar} 
                alt="Avatar" 
                className="w-32 h-32 rounded-full object-cover"
              />
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleAvatarChange} 
                className="hidden" 
                id="avatar-input"
              />
              <label htmlFor="avatar-input" className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-2 cursor-pointer">
                <FontAwesomeIcon icon={faEdit} className="text-white" />
              </label>
            </div>
            <h2 className="text-xl font-semibold">{userData.name}</h2>
          </div>
           {/* Thông tin cá nhân */}
           <div className="mb-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold mb-2">Thông tin cá nhân</h3>
              <FontAwesomeIcon
                icon={faEdit}
                className="cursor-pointer text-blue-500"
                onClick={() => setIsEditingInfo((prev) => !prev)}
              />
            </div>
            {isEditingInfo && (
              <>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Họ tên</label>
                  <input 
                    type="text" 
                    name="name" 
                    value={userData.name} 
                    onChange={handleInputChange} 
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" 
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Số điện thoại</label>
                  <input 
                    type="text" 
                    name="phone" 
                    onChange={handleInputChange} 
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" 
                  />
                </div>
                </>
            )}
          </div>

          {/* Địa chỉ */}
          <div className="mb-4">
            <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold mb-2">Thông tin địa chỉ</h3>
            <FontAwesomeIcon
                icon={faEdit}
                className="cursor-pointer text-blue-500"
                onClick={() => setIsEditingAddress((prev) => !prev)}
              />
            </div>
            {isEditingAddress && (
              <>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Tỉnh</label>
                  <select 
                    name="address.province" 
                    onChange={handleInputChange} 
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  >
                    <option value="">Chọn tỉnh</option>
                    {provincesData.map((province) => (
                      <option key={province.id} value={province.name}>{province.name}</option>
                    ))}
                  </select>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Huyện</label>
                  <select 
                    name="address.district" 
                    onChange={handleInputChange} 
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  >
                    <option value="">Chọn huyện</option>
                    {userData.address.province && provincesData.find(province => province.name === userData.address.province)?.districts.map(district => (
                      <option key={district.id} value={district.name}>{district.name}</option>
                    ))}
                  </select>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Xã</label>
                  <select 
                    name="address.ward" 
                    onChange={handleInputChange} 
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  >
                    <option value="">Chọn xã</option>
                    {userData.address.district && provincesData.find(province => province.name === userData.address.province)?.districts.find(district => district.name === userData.address.district)?.wards.map(ward => (
                      <option key={ward.id} value={ward.name}>{ward.name}</option>
                    ))}
                  </select>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Địa chỉ chi tiết</label>
                  <input 
                    type="text" 
                    name="address.detail" 
                    onChange={handleInputChange} 
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" 
                  />
                </div>
                </>
            )}
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md">
            Cập nhật thông tin
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileSetting;