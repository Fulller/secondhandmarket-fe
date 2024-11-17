import useProduct, { ProductProvider } from "./state/useProduct";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import Category from "./components/Category";
import DetailedInformation from "./components/DetailedInformation";
import SalesInformation from "./components/SalesInformation";
import Address from "./components/Address";
import ImagesAndVideo from "./components/ImagesAndVideo";
import SubmitButton from "./components/SubmitButton";
import emptyCategoryImage from "@assets/images/empty-category.svg";
import productLoading from "@assets/images/product-loading.svg";
import ProductService from "@services/product.service";
import _ from "lodash";
import ".scss";

function SellerProduct() {
  const {
    data: { categoryId },
    dispatch,
    loading,
  } = useProduct();
  const { isLoading, title } = loading;
  const { id } = useParams();

  useEffect(() => {
    id && fetchProduct(id);
  }, [id]);

  async function fetchProduct(id) {
    dispatch({
      type: "LOADING/UPDATE",
      payload: { isLoading: true, title: "Lấy thông tin sản phẩm" },
    });
    const [res, err] = await ProductService.sellerGetProductById(id);
    dispatch({
      type: "LOADING/UPDATE",
      payload: { isLoading: false },
    });
    if (err) {
      console.log({ err });
      return;
    }
    dispatch({
      type: "ALL/SET",
      payload: res.data,
    });
  }

  return (
    <div id="seller-product-page">
      {isLoading && (
        <div className="loading-overlay">
          <img src={productLoading} alt="Loading" className="loading-image" />
          {title && <p className="loading-title">{title}</p>}
        </div>
      )}
      <div id="seller-product-page-left">
        <ImagesAndVideo />
      </div>
      <div id="seller-product-page-right">
        <Category />
        {categoryId ? (
          <>
            <DetailedInformation />
            <SalesInformation />
            <Address />
            <SubmitButton />
          </>
        ) : (
          <div className="empty-category">
            <img src={emptyCategoryImage} alt="" />
          </div>
        )}
      </div>
    </div>
  );
}

export default () => (
  <ProductProvider>
    <SellerProduct />
  </ProductProvider>
);
