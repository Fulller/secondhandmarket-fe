import { ProductProvider } from "./useProduct";
import Category from "./components/Category";
import DetailedInformation from "./components/DetailedInformation";
import SalesInformation from "./components/SalesInformation";
import Address from "./components/Address";
import ImagesAndVideo from "./components/ImagesAndVideo";
import SubmitButton from "./components/SubmitButton";

import ".scss";

function SellerProduct() {
  return (
    <ProductProvider>
      <div id="seller-product-page">
        <div id="seller-product-page-left">
          <ImagesAndVideo />
        </div>
        <div id="seller-product-page-right">
          <Category />
          <DetailedInformation />
          <SalesInformation />
          <Address />
          <SubmitButton />
        </div>
      </div>
    </ProductProvider>
  );
}

export default SellerProduct;
