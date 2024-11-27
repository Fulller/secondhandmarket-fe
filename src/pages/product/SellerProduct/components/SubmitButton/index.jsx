import useProduct from "../../state/useProduct";
import sellerProductSchema from "../../state/sellerProductSchema";
import { useEffect, useState } from "react";
import { message } from "antd";
import CategoryService from "@services/category.service";
import AddressService from "@services/address.service";
import uploadService from "@services/upload.service";
import _ from "lodash";
import ".scss";
import ProductService from "@services/product.service";
import { useNavigate } from "react-router-dom";

function SubmitButton() {
  const { data, dispatch } = useProduct();
  const { id, categoryId } = data;

  const [attributes, setAttributes] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    categoryId && fetchAttribute(categoryId);
  }, [categoryId]);

  const services = {
    async createOrUpdateAddress(address) {
      const addressId = address.id;
      const [res, err] = addressId
        ? await AddressService.putAddress(addressId, address)
        : await AddressService.postAddress(address);
      if (err) {
        message.error("Xử lý địa chỉ thất bại");
        return;
      }
      return res.data.id;
    },
    async uploadImages(images) {
      const filesToUpload = images.filter((img) => img.originFileObj);
      if (filesToUpload.length <= 0) return images;
      const [uploadedImages, uploadError] = await uploadService.images(
        filesToUpload.map((file) => file.originFileObj)
      );
      if (uploadError) {
        message.error("Lỗi upload hình ảnh");
        return;
      }
      const formattedUploadedImages = uploadedImages.data.map((img) => ({
        url: img,
      }));
      const allImages = images.map((img) => {
        if (img.originFileObj) {
          return formattedUploadedImages.shift();
        } else {
          return { id: img.id, url: img.url };
        }
      });
      return allImages;
    },
    async uploadVideo(video) {
      const isFile = video instanceof File;
      if (!isFile) return video;
      const [res, err] = await uploadService.video(video);
      if (err) {
        message.error("Lỗi upload video");
      }
      return res.data;
    },
    async uploadMedia({ images, video }) {
      return Promise.all([this.uploadImages(images), this.uploadVideo(video)]);
    },
  };

  async function fetchAttribute(categoryId) {
    const [res, err] = await CategoryService.getAttributesById(categoryId);
    if (!err) setAttributes(res.data || []);
  }

  function handleValidate() {
    const { error: validateError } = sellerProductSchema(attributes).validate(
      data,
      {
        abortEarly: false,
      }
    );
    if (!validateError) return true;
    const errors = validateError.details.map(({ path, message, type }) => {
      const field = path.join(".");
      return { field, type, message };
    });
    console.table(errors);
    dispatch({
      type: "ERROR/ALL/SET",
      payload: _.mapValues(_.keyBy(errors, "field"), "message"),
    });
    return false;
  }

  async function handleCreate(udpateData) {
    const images = udpateData.images.map((img) => img.url);
    const productAttributes = udpateData.productAttributes.map((pa) => ({
      attributeId: pa.attribute.id,
      value: pa.value,
    }));
    const [res, err] = await ProductService.postProduct(
      _.chain(udpateData)
        .pick([
          "name",
          "description",
          "price",
          "addressId",
          "categoryId",
          "video",
        ])
        .set("thumbnail", images[0])
        .set("images", images)
        .set("productAttributes", productAttributes)
        .value()
    );
    if (err) {
      message.error("Đăng sản phẩm thất bại");
      return;
    }
    message.info("Đăng sản phẩm thành công");
    return res;
  }
  async function handleUpdate(udpateData) {
    const productAttributes = udpateData.productAttributes
      .map((pa) => {
        if (pa.id) {
          return { id: pa.id, value: pa.value };
        }
        return {
          attributeId: pa.attribute.id,
          value: pa.value,
        };
      })
      .filter((pa) => pa.value);
    const dataForUpdate = _.chain(udpateData)
      .pick([
        "name",
        "description",
        "price",
        "addressId",
        "categoryId",
        "video",
        "images",
      ])
      .set("thumbnail", udpateData.images[0].url)
      .set("productAttributes", productAttributes)
      .value();
    const [res, err] = await ProductService.updateProduct(id, dataForUpdate);
    if (err) {
      message.error("Cập nhật phẩm thất bại");
      return;
    }
    message.info("Cập nhât phẩm thành công");
    return res;
  }

  async function handleSubmit() {
    const isValid = handleValidate();
    if (!isValid) {
      return;
    }
    const isPost = !id;
    dispatch({
      type: "LOADING/UPDATE",
      payload: {
        isLoading: true,
        title: `Đang xử lý ${isPost ? "đăng" : "cập nhật"} sản phẩm`,
      },
    });
    const [addressId, [images, video]] = await Promise.all([
      services.createOrUpdateAddress(data.address),
      services.uploadMedia(data),
    ]);
    const executedData = { ...data, addressId, images, video };
    const res = isPost
      ? await handleCreate(executedData)
      : await handleUpdate(executedData);
    if (res) {
      navigate(`/product/all`);
    }
    dispatch({
      type: "LOADING/UPDATE",
      payload: {
        isLoading: false,
      },
    });
  }

  return (
    <div className="submit-button-container">
      {/* <button className="preview-button">Xem trước</button> */}
      <button onClick={handleSubmit} className="submit-button">
        {id ? "Cập nhật" : "Đăng ngay"}
      </button>
    </div>
  );
}

export default SubmitButton;
