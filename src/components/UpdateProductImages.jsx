import { useRef, useState } from "react";
import Slider from "react-slick";
import { TiDeleteOutline } from "react-icons/ti";
import { FaCamera } from "react-icons/fa";

const UploadProductImages = ({ onChange: handChange, data }) => {
  const [images, setImages] = useState(data);
  const imageFileRef = useRef(null);
  const handleFileChange = () => {
    const files = imageFileRef?.current?.files || []; // Lấy file đầu tiên
    // setImages(files);

    const fileArray = Array.from(files);

    // Sử dụng FileReader để lấy URLs của các hình ảnh
    const imageUrls = fileArray.map((file) => {
      return new Promise((resolve, reject) => {
        const render = new FileReader();
        render.onload = () => resolve(render.result);
        render.onerror = reject;
        render.readAsDataURL(file);
      });
    });

    // Đọc tất cả các URLs của hình ảnh và lưu vào state
    Promise.all(imageUrls)
      .then((files) => {
        setImages(files);
        console.log({ files });
        handChange(fileArray); // Gửi images sau khi cập nhật
      })
      .catch((error) => {
        console.error("Error reading files: ", error);
      });
  };
  // Hàm xóa hình
  const handleDeleteImage = (index) => {
    setImages((prevImages) => {
      const updatedImages = prevImages.filter((_, i) => i !== index);
      // onSubmit(updatedImages); // Gửi images mới sau khi xóa
      return updatedImages;
    });
  };
  const NextArrow = ({ onClick }) => (
    <div className="slick-arrow slick-next" onClick={onClick}>
      &#x3E; {/* hoặc biểu tượng bất kỳ */}
    </div>
  );

  const PrevArrow = ({ onClick }) => (
    <div className="slick-arrow slick-prev" onClick={onClick}>
      &#x3C; {/* hoặc biểu tượng bất kỳ */}
    </div>
  );

  const settings = {
    dots: true,
    infinite: false, // Thử tắt tính năng lặp
    speed: 500,
    slidesToShow: 1, // Chỉ hiển thị một slide tại một thời điểm
    slidesToScroll: 1,
    arrows: true, // Bật các nút trước và sau
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <>
      {images.length < 1 ? (
        <div className="mt-5" onClick={() => imageFileRef.current.click()}>
          <div className="p-5 min-h-40 bg-slate-100 rounded-lg max-w-sm flex justify-center items-center border-dashed border-2 border-indigo-200 ">
            <input
              name="images"
              type="file"
              multiple
              accept=".jpg, .jpeg, .png"
              className="file-pp"
              hidden
              ref={imageFileRef}
              onChange={handleFileChange}
            />
            <FaCamera style={{ fontSize: 50 }} />
          </div>
        </div>
      ) : (
        <div>
          <Slider
            {...settings}
            style={{ position: "relative" }}
            className="mt-5 p-5 min-h-40 bg-slate-100 rounded-lg max-w-sm flex justify-center items-center border-dashed border-2 border-indigo-200 "
          >
            {images.map((image, index) => (
              <div key={index} style={{ position: "relative", width: "100%" }}>
                <img
                  key={index}
                  src={image.url}
                  alt={`Preview ${index}`}
                  style={{
                    width: "300px",
                    height: "auto",
                    margin: "5px",
                  }}
                />
                <button
                  onClick={() => handleDeleteImage(index)}
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
            ))}
          </Slider>
        </div>
      )}
    </>
  );
};

export default UploadProductImages;
