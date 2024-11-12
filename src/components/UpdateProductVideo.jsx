import { useEffect, useRef, useState } from "react";
import { BsCameraReelsFill } from "react-icons/bs";
import { TiDeleteOutline } from "react-icons/ti";

const UpdateProductVideo = ({ onChange: handleChange, data }) => {
  const [video, setVideo] = useState("");
  const [videoPreviewUrl, setVideoPreviewUrl] = useState("");
  const videoFileRef = useRef(null);

  useEffect(() => {
    setVideoPreviewUrl(data);
    handleChange(video);
  }, [video, handleChange, data]);
  console.log({ videoPreviewUrl });

  const handleVideoFileChange = () => {
    const file = videoFileRef?.current?.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setVideoPreviewUrl(reader.result); // Lưu URL tạm thời của video
        setVideo(file); // Lưu file video để upload
        console.log("video component", file);
      };
      reader.readAsDataURL(file); // Đọc video dưới dạng URL
    }
  };
  const handleDeleteVideo = () => {
    setVideo(null);
    setVideoPreviewUrl(null);
  };
  return (
    <>
      <div className="mt-5" onClick={() => videoFileRef.current.click()}>
        <div className="p-5 min-h-40 bg-slate-100 rounded-lg max-w-sm flex justify-center items-center border-dashed border-2 border-indigo-200 ">
          <input
            type="file"
            className="file-pp"
            accept=".mp4"
            hidden
            ref={videoFileRef}
            onChange={handleVideoFileChange}
          />
          {videoPreviewUrl ? (
            <div style={{ position: "relative", width: "100%" }}>
              <video
                controls
                src={videoPreviewUrl}
                style={{ width: "100%", maxHeight: "300px" }}
              />
              <button
                onClick={handleDeleteVideo}
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  background: "red",
                  color: "white",
                  border: "none",
                  borderRadius: "50%",
                  cursor: "pointer",
                }}
              >
                <TiDeleteOutline className="text-2xl" />
              </button>
            </div>
          ) : (
            <BsCameraReelsFill style={{ fontSize: 50 }} />
          )}
        </div>
      </div>
    </>
  );
};

export default UpdateProductVideo;
