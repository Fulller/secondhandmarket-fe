import Address from "@components/Address";
import { Field, Form, SubmitButton } from "@components/Form";
import postProductImg from "@assets/images/empty-category.svg";
import UploadImages from "@components/UploadImages";
import UploadVideo from "@components/UploadVideo";
import AddressService from "@services/address.service";
import ProductService from "@services/product.service";
import { Spin } from "antd";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import uploadService from "@services/upload.service";
import postProductSchema from "@validations/postProductSchema";
import UpdateProductImages from "@components/UpdateProductImages";
import UpdateProductVideo from "@components/UpdateProductVideo";

const UpdateProduct = () => {
  const { id } = useParams();
  const [attribute, setAttribute] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [product, setProduct] = useState(null);
  const [address, setAddress] = useState(null);
  const [images, setImages] = useState([]);
  const [imagesUrls, setImagesUrl] = useState([]);
  const [video, setVideo] = useState(null);
  const [videoUrl, setVideoUrl] = useState("");
  const [errorUpload, setErrorUpload] = useState("");
  const [errorUploadVideo, setErrorUploadVideo] = useState("");
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const submitUpdateProduct = async (data) => {
    console.log({ data: data });

    console.log({ attribute: attribute });
    setLoading(true);
    const [addressId, imagesUrls, videoUrl] = await Promise.all([
      handlePutAddress(address),
      handleUploadImages(images),
      handleUploadVideo(video),
    ]);

    if (!(addressId && imagesUrls.length > 0 && videoUrl)) {
      toast.error("Vui lòng kiểm tra địa chỉ, hình ảnh và video!");
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
    const dataJson = {
      productId: product.id,
      name: data.name,
      description: data.description,
      price: data.price,
      addressId: addressId,
      images: imagesUrls,
      video: videoUrl,
      thumbnail: imagesUrls[0].url,
      productAttributes: attributesArray,
      categoryId: categoryId,
    };

    console.log({ dataJson: dataJson });

    const [result, error] = await ProductService.PutProduct(id, dataJson);
    if (error) {
      toast.error("Cập nhật sản phẩm không thành công: " + error.message);
      setLoading(false);
      return;
    }

    toast.success("Cập nhật sản phẩm thành công!");
    nav("/product/all");
  };

  useEffect(() => {
    handleGetProduct(id);
  }, [id]);

  const handlePutAddress = async (addressData) => {
    const [result, error] = await AddressService.putAddress(
      address.id,
      addressData
    );
    if (error) {
      toast.error(`Lỗi khi cập nhật địa chỉ: ${error.message}`);
      return null;
    }
    return result.data.id;
  };

  const handleUploadVideo = async (video) => {
    if (video === null) {
      setErrorUploadVideo("Vui lòng chọn video");
      return null;
    }
    if (videoUrl !== null) {
      return videoUrl;
    }
    const [result, error] = await uploadService.postVideo(video);
    if (error) {
      toast.error("Lỗi khi tải video lên: " + error.message);
      return null;
    }
    return result.data;
  };

  const handleUploadImages = async (images) => {
    if (!images || images.length === 0) {
      setErrorUpload("Vui lòng chọn hình");
      return [];
    }
    if (imagesUrls.length !== 0) {
      return imagesUrls;
    }
    const [result, error] = await uploadService.postImages(images);
    if (error) {
      setErrorUpload(error.message);
      return [];
    }
    return result.data;
  };

  const handleGetProduct = async (id) => {
    const [result, error] = await ProductService.GetProductById(id);
    if (error) {
      console.log(error);
      return;
    }
    console.log({ result });

    setImages(result.data.images);
    setImagesUrl(result.data.images);
    setVideo(result.data.video);
    setVideoUrl(result.data.video);
    setAddress(result.data.address);
    setCategoryName(result.data.category.name);
    setCategoryId(result.data.category.id);
    setProduct(result.data);
    setAttribute(result.data.productAttributes);
  };

  return (
    <Spin spinning={loading}>
      <div className="sm:container mx-auto bg-white rounded-lg max-w-sm m-3">
        <div className="grid lg:grid-cols-3 sm:grid-cols-2 p-5">
          <div className="lg:col-span-1 sm:col-span-2 m-5">
            <b className="text-2xl font-bold">Hình ảnh và video sản phẩm</b>{" "}
            <br /> <br />
            <span>
              Xem thêm về <Link to={"/"}>Quy định đăng tin của chợ cũ</Link>
            </span>
            <div>
              {images.length > 0 ? (
                <>
                  <UpdateProductImages data={images} onChange={setImages} />
                </>
              ) : (
                <>
                  <UploadImages onChange={setImages} data={images} />
                  {errorUpload && (
                    <span className="text-red-500">{errorUpload}</span>
                  )}
                </>
              )}
              {video ? (
                <>
                  <UpdateProductVideo onChange={setVideo} data={video} />
                </>
              ) : (
                <>
                  <UploadVideo onChange={setVideo} data={video} />
                  {errorUploadVideo && (
                    <span className="text-red-500">{errorUploadVideo}</span>
                  )}
                </>
              )}
            </div>
          </div>
          <div className="col-span-2 p-5">
            <input
              readOnly
              className="mb-3 block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder={categoryName || "DANH MỤC ĐĂNG TIN"}
              disabled
            />
            <Form
              onSubmit={submitUpdateProduct}
              schema={postProductSchema(attribute)}
            >
              <div className="details-attribute">
                <div className="mb-5">
                  <span className="text-2xl font-bold">Thông tin chi tiết</span>
                </div>
                <div>
                  {Array.isArray(attribute) &&
                    attribute.map((item) => (
                      <div key={item.id}>
                        <label>{item.attribute.name}</label>
                        <Field
                          name={`attribute@${item.attribute.id}`}
                          type="text"
                          placeholder={item.value}
                          defaultValue={item.value}
                        />
                      </div>
                    ))}
                </div>
                <div className="mb-5">
                  <span className="text-2xl font-bold">
                    Tiêu đề tin đăng và Mô tả chi tiết
                  </span>
                </div>
                <label>Tên sản phẩm</label>
                <Field name="name" type="text" defaultValue={product?.name} />
                <label>Mô tả chi tiết</label>
                <Field
                  name="description"
                  placeholder={product?.description}
                  type="text"
                  defaultValue={product?.description}
                />
                <label>Giá sản phẩm</label>
                <Field
                  name="price"
                  placeholder={product?.price}
                  type="number"
                  defaultValue={product?.price}
                />
                <Address onChange={handlePutAddress} address={address} />{" "}
                <div className="mb-5">
                  {" "}
                  <label className="text-red-500">
                    *Vui lòng chọn lại địa chỉ
                  </label>
                </div>
                <SubmitButton
                  style={{ backgroundColor: "#FFB057", color: "white" }}
                  className="mt-5"
                >
                  Chỉnh sửa
                </SubmitButton>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </Spin>
  );
};

export default UpdateProduct;
