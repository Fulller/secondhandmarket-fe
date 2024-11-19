import React, { useState } from "react";
import { Upload, Modal } from "antd";
import { CameraOutlined } from "@ant-design/icons";
import ErrorMessage from "../ErrorMessage";
import useProduct from "../../state/useProduct";
import { v4 as uuidv4 } from "uuid";
import "./.scss";

function UploadImges() {
  const {
    data: { categoryId, images: imagefileList },
    dispatch,
  } = useProduct();

  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  const setImageFileList = (fl) => {
    dispatch({ type: "FIELD/UPDATE", payload: { field: "images", value: fl } });
  };

  const handlePreview = (file) => {
    setPreviewImage(
      file.url || file.thumbUrl || URL.createObjectURL(file.originFileObj)
    );
    setPreviewVisible(true);
    setPreviewTitle(
      file.name || file.url?.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleChange = ({ fileList: newFileList }) => {
    const updatedList = newFileList.map((file) => {
      if (file.originFileObj && file.originFileObj instanceof Blob) {
        return {
          ...file,
          uid: file.uid || uuidv4(),
          key: file.uid || uuidv4(),
          thumbUrl: file.thumbUrl || URL.createObjectURL(file.originFileObj),
          originFileObj: file.originFileObj,
        };
      } else {
        return {
          ...file,
          id: file.id,
          key: file.id || uuidv4(), // Ensure that file has a unique key
          url: file.url,
        };
      }
    });

    setImageFileList(updatedList.slice(0, 6)); // Limit to 6 files
  };

  const handleRemove = (file) => {
    setImageFileList(
      (imagefileList || []).filter(
        (item) => item.uid !== file.uid && item.id !== file.id
      )
    );
  };

  const uploadButton = (
    <div className="upload-button">
      <CameraOutlined className="icon" />
      <div className="title">
        {isDragging
          ? "Thả file ảnh tại đây"
          : "ĐĂNG TỪ 1 ĐẾN 6 HÌNH (bắt buộc)"}
      </div>
    </div>
  );

  return (
    <div
      id="seller-product-images"
      className={`content ${!categoryId ? "disabled" : ""}`}
    >
      <Upload.Dragger
        className={`upload-images 
    ${isDragging ? "dragging" : ""} 
    ${imagefileList.length > 0 ? "has-files" : ""} 
    ${imagefileList.length >= 6 ? "full-files" : ""}
  `}
        listType="picture-card"
        fileList={imagefileList}
        onPreview={handlePreview}
        onChange={handleChange}
        onRemove={handleRemove}
        accept="image/*"
        beforeUpload={() => false}
        multiple
        onDrop={() => setIsDragging(false)}
      >
        {imagefileList.length < 6 && uploadButton}
      </Upload.Dragger>

      <ErrorMessage field="images" className="upload-image-error-message" />
      <Modal
        open={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={() => setPreviewVisible(false)}
      >
        <img alt="preview" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </div>
  );
}

export default UploadImges;
