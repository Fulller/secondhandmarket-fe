import { Form, Field, SubmitButton } from "@components/Form";
import { useEffect, useState } from "react";
import UserService from "@services/user.service";
import updateProfileSchema from "@validations/updateProfileSchema";
import { Upload, message, Avatar, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import ".scss"; // Import SCSS file
import defaultAvatar from "@assets/images/default-avatar.png";
import AddressSelector from "./Address";
import AddressService from "@services/address.service";
import uploadService from "@services/upload.service";

function Profile() {
  const [profile, setProfile] = useState({});

  useEffect(() => {
    fetchProfile();
  }, []);

  console.log({ profile });

  function setField(field, value) {
    setProfile((prev) => ({ ...prev, [field]: value }));
  }

  async function fetchProfile() {
    const [res, err] = await UserService.getProfile();
    if (err) {
      return;
    }
    setProfile(res.data);
  }

  async function upadateAddress(address) {
    if (!address) return;
    const [res, err] = await (address.id
      ? AddressService.putAddress(address.id, address)
      : AddressService.postAddress(address));
    if (err) {
      return;
    }
    return res.data;
  }

  async function uploadAvatar(avatar) {
    if (!(avatar instanceof File)) return avatar;
    const [res, err] = await uploadService.image(avatar);
    if (err) return;
    return res.data;
  }

  async function handleSubmit(data) {
    const { address } = data;
    const [updatedAddress, uploadedAvatar] = await Promise.all([
      upadateAddress(address),
      uploadAvatar(profile.avatar),
    ]);
    const [res, err] = await UserService.udpateProfile({
      name: data.name,
      phone: data.phone,
      avatar: uploadedAvatar,
      addressId: updatedAddress?.id,
    });
    if (err) return;
    setProfile(res.data);
    message.success("Cập nhật thông tin tài khoản thành công 👏");
  }

  const handleAvatarChange = async ({ file }) => {
    setField("avatar", file.originFileObj);
  };

  function toAvatarSrc(avatar) {
    if (!avatar) return defaultAvatar;
    if (avatar instanceof File) {
      return URL.createObjectURL(avatar);
    }
    return avatar;
  }

  return (
    <div className="profile-container">
      <div className="avatar-upload-container">
        <Upload
          name="avatar"
          action="/your-upload-endpoint"
          showUploadList={false}
          onChange={handleAvatarChange}
          accept="image/*"
        >
          <div className="avatar-upload-button">
            <Avatar size={128} src={toAvatarSrc(profile.avatar)} />
            <div className="upload-icon">
              <UploadOutlined />
            </div>
          </div>
        </Upload>
      </div>

      <Form onSubmit={handleSubmit} schema={updateProfileSchema}>
        <AddressSelector
          address={profile.address || {}}
          onSelected={(address) => setField("address", address)}
        ></AddressSelector>
        <Field name="name" label="Tên hiển thị" defaultValue={profile.name} />
        <Field
          name="phone"
          label="Số điện thoại"
          defaultValue={profile.phone}
        />
        <SubmitButton loadingText={"Đang cập nhật thông tin"}>
          Cập nhật
        </SubmitButton>
      </Form>
    </div>
  );
}

export default Profile;
