import CategoryService from "@services/category.service";
import AddressService from "@services/address.service";
import UploadService from "@services/upload.service";
import postProductImg from "@assets/images/empty-category.svg";
import Address from "@components/Address";
import { Modal } from "antd";
import { useEffect, useState } from "react";
import "./PostProduct.css";
import { Link, useNavigate } from "react-router-dom";
import { FaCamera } from "react-icons/fa";
import postProductSchema from "@validations/postProductSchema";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Field, SubmitButton, Form } from "@components/Form";
import UploadImages from "@components/UploadImages";
import UploadVideo from "@components/UploadVideo";
import ProductService from "@services/product.service";
import { toast } from "react-toastify";
import { Spin } from "antd";

function PostProduct() {
  const [categoryTree, setCategoryTree] = useState([]);
  const [attribute, setAttribute] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [address, setAddress] = useState({});
  const [flagSelectedCategory, setFlagSelectedCategory] = useState(false);
  const [attributeSchema, setAttributeSchema] = useState(null);
  const [images, setImages] = useState([]);
  const [video, setVideo] = useState(null);
  const [errorUpload, setErrorUpload] = useState("");
  const [errorUploadVideo, setErrorUploadVideo] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedCategoryName, setSelectedCategoryName] = useState(""); // State cho tên danh mục đã chọn

  const nav = useNavigate();
  const submitPostProduct = async (data) => {
    setLoading(true);
    const [addressId, imagesUrls, videoUrl] = await Promise.all([
      handlePostAddress(address),
      handleUploadImages(images),
      handleUploadVideo(video),
    ]);

    console.log({ imagesUrls });
    console.log({ videoUrl });
    console.log({ addressId });
    if (!(addressId && imagesUrls && videoUrl)) {
      toast.error("!(addressId && imagesUrls && videoUrl) ERROR");
      setLoading(false);
      return;
    }

    const attributesArray = [];
    for (const key in data) {
      if (key.startsWith("attribute@")) {
        const id = key.split("@")[1];
        attributesArray.push({ attributeId: id, value: data[key] });
        delete data[key];
      }
    }
    data.addressId = addressId;
    data.images = imagesUrls;
    data.video = videoUrl;
    data.thumbnail = imagesUrls[0];
    data.productAttributes = attributesArray;
    data.categoryId = selectedCategory[0].id;

    console.log({ finalData: data });
    const [result, error] = await ProductService.PostProduct(data);
    console.log({ result, error });
    if (error) {
      setLoading(false);
      return;
    }
    nav("/product/all");
  };

  const handleUploadVideo = async (video) => {
    if (video === null) {
      setErrorUploadVideo("Vui lòng chọn video");
    }
    const [result, error] = await UploadService.postVideo(video);
    console.log({ result, error });
    if (error) {
      return;
    }
    return result.data;
  };

  const handleUploadImages = async (images) => {
    console.log("images: ", images);
    if (!images || images.length === 0) {
      console.error("No images to upload.");
      setErrorUpload("Vui lòng chọn hình");
      return;
    }
    const [result, error] = await UploadService.postImages(images);
    console.log({ result, error });
    if (error) {
      setErrorUpload(error);
      return;
    }
    return result.data;
  };

  const handlePostAddress = async (addressData) => {
    console.log({ addressData });
    const [result, error] = await AddressService.postAddress(addressData);
    if (error) {
      toast.error(`postAddress ERROR ${error.message}}`);
      return;
    }
    return result.data.id;
  };
  const showModal = () => {
    setIsModalOpen(true);
    setSelectedCategory([]);
    fetchCategory();
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    fetchCategory();
  };

  useEffect(() => {
    fetchCategory();
  }, []);
  async function fetchCategory() {
    const [result, error] = await CategoryService.getTree();
    console.log("result:", result);
    if (error) {
      console.log(error);
      return;
    }
    setCategoryTree(result.data);
  }
  async function fetchAttribute(id) {
    const [result, error] = await CategoryService.getAttributeById(id);
    if (error) {
      console.log("fetch attribute error: ", error);
    } else {
      setAttribute(result.data);
      setAttributeSchema(result.data);
      setFlagSelectedCategory(true);
    }
  }
  const handleCategoryClick = (category) => {
    setCategoryTree([]);
    setSelectedCategory(category.categoryChildren);
  };
  const handleSubmitCate = async (id, name) => {
    await fetchAttribute(id);
    setSelectedCategoryName(name); // Cập nhật tên danh mục đã chọn
    setIsModalOpen(false);
  };

  return (
    <Spin spinning={loading}>
      <div className="sm:container mx-auto bg-white rounded-lg max-w-sm m-3">
        <div className="grid lg:grid-cols-3 sm:grid-cols-2 p-5">
          <div className="lg:col-span-1 sm:col-span-2 m-5">
            <b>Hình ảnh và video sản phẩm</b> <br /> <br />
            <span>
              Xem thêm về <Link to={"/"}>Quy định đăng tin của chợ cũ</Link>
            </span>
            {flagSelectedCategory === false ? (
              <div className="mt-5" style={{ cursor: "not-allowed" }}>
                <div className="p-5 min-h-40 bg-slate-100 rounded-lg max-w-sm flex justify-center items-center border-dashed border-2 border-indigo-200 ">
                  <FaCamera style={{ fontSize: 50 }} />
                </div>
              </div>
            ) : (
              <div>
                <UploadImages onChange={setImages} />
                {errorUpload && (
                  <span className="text-red-500">{errorUpload}</span>
                )}
                <UploadVideo onChange={setVideo} />
                {errorUploadVideo && (
                  <span className="text-red-500">{errorUploadVideo}</span>
                )}
              </div>
            )}
          </div>
          <div className="col-span-2 p-5">
            <input
              readOnly
              className="mb-3 block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder={selectedCategoryName || "DANH MỤC ĐĂNG TIN"} // Sử dụng state làm placeholder
              onClick={showModal}
            />
            <Form
              onSubmit={submitPostProduct}
              schema={postProductSchema(attribute)}
            >
              {Array.isArray(attribute) && attribute.length === 0 ? ( // Kiểm tra nếu attribute là mảng không
                <div className="mt-5">
                  <div className="text-center">
                    <div className="flex justify-center items-center mb-5">
                      <img src={postProductImg} alt="" />
                    </div>
                    <b>ĐĂNG NHANH - BÁN GỌN</b> <br />
                    <span>Chọn "danh mục đăng tin" để đăng tin</span>
                  </div>
                </div>
              ) : (
                <div className="details-attribute">
                  <span>Thông tin chi tiết</span>
                  {Array.isArray(attribute) &&
                    attribute.map((item) => (
                      <div key={item.id}>
                        <Field
                          name={`attribute@${item.id}`}
                          type="text"
                          placeholder={item.name}
                        />
                      </div>
                    ))}
                  <span>Tiêu đề tin đăng và Mô tả chi tiết</span>
                  <Field
                    name="name"
                    placeholder="Ten san pham"
                    type="text"
                  ></Field>
                  <Field
                    name="description"
                    placeholder="Mo ta chi tiet"
                    type="text"
                  ></Field>
                  <Field
                    name="price"
                    placeholder="Gia san pham"
                    type="number"
                  ></Field>
                  <Address // Đảm bảo tên hàm là đúng
                    onChange={setAddress}
                    onSubmit={handlePostAddress}
                  />
                  <SubmitButton
                    style={{ backgroundColor: "#FFB057", color: "white" }}
                    className="mt-5"
                  >
                    Đăng bài
                  </SubmitButton>
                </div>
              )}
            </Form>
          </div>
        </div>
        <Modal footer={null} open={isModalOpen} onCancel={handleCancel}>
          <div className="text-xl font-bold">ĐĂNG TIN</div>
          <div className="text-lg font-semibold mb-5">CHỌN DANH MỤC</div>
          {categoryTree.map((item) => (
            <div className="mb-5" key={item.id}>
              <div className=" block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                <div
                  className="text-lg m-3"
                  onClick={() => handleCategoryClick(item)}
                  style={{ cursor: "pointer", fontWeight: "bold" }}
                >
                  {item.name}
                </div>
              </div>
            </div>
          ))}
          {selectedCategory.map((item) => (
            <div className="mb-5" key={item.id}>
              <div className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                <div
                  className="text-lg m-3"
                  onClick={() => handleSubmitCate(item.id, item.name)}
                  style={{ cursor: "pointer", fontWeight: "bold" }}
                >
                  {item.name}
                </div>
              </div>
            </div>
          ))}
        </Modal>
      </div>
    </Spin>
  );
}

export default PostProduct;
