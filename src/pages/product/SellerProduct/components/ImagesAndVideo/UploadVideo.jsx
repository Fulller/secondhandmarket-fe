import React, { useState, useEffect } from "react";
import { Upload, Modal, Button, message } from "antd";
import { VideoCameraOutlined, DeleteOutlined } from "@ant-design/icons";
import useProduct from "../../state/useProduct";

function UploadVideo({ MAX_SIZE_MB = 40 }) {
  const {
    data: { categoryId, video },
    dispatch,
  } = useProduct();

  const [previewVideo, setPreviewVideo] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const setVideoFile = (videoFile) => {
    dispatch({
      type: "FIELD/UPDATE",
      payload: { field: "video", value: videoFile },
    });
  };

  useEffect(() => {
    if (video) {
      const videoURL =
        video instanceof File ? URL.createObjectURL(video) : video;
      setPreviewVideo(videoURL);

      return () => {
        if (video instanceof File) {
          URL.revokeObjectURL(videoURL);
        }
      };
    } else {
      setPreviewVideo(null);
    }
  }, [video]);

  const handlePreview = () => {
    setPreviewVisible(true);
  };

  const handleRemove = () => {
    setVideoFile(null);
  };

  const handleChange = ({ file }) => {
    if (!file) return;
    const isSizeValid = file.size / 1024 / 1024 <= MAX_SIZE_MB;
    if (!isSizeValid) {
      message.error(`Kích thước tệp phải nhỏ hơn ${MAX_SIZE_MB}MB!`);
      return;
    }
    setVideoFile(file);
  };

  const beforeUpload = () => {
    return false;
  };

  const uploadButton = (
    <div className="upload-video">
      <VideoCameraOutlined className="icon" />
      <div className="title">
        {isDragging ? "Thả video tại đây" : "Tải video lên (tùy chọn)"}
      </div>
    </div>
  );

  return (
    <div
      id="seller-product-video"
      className={`content ${!categoryId ? "disabled" : ""}`}
    >
      {video ? (
        <div className="uploaded-video-container">
          <video
            src={previewVideo}
            controls
            style={{ width: "100%", marginBottom: 8 }}
            onClick={handlePreview}
          />
          <Button icon={<DeleteOutlined />} onClick={handleRemove} danger block>
            Xóa video
          </Button>
        </div>
      ) : (
        <Upload.Dragger
          name="video"
          className={`upload-video-dragger ${isDragging ? "dragging" : ""}`}
          showUploadList={false}
          accept="video/*"
          beforeUpload={beforeUpload}
          onChange={handleChange}
          onDrop={() => setIsDragging(false)}
          onDragOver={() => setIsDragging(true)}
          onDragLeave={() => setIsDragging(false)}
        >
          {uploadButton}
        </Upload.Dragger>
      )}
    </div>
  );
}

export default UploadVideo;
