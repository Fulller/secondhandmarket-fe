import React from "react";
import Images from "./UploadImages";
import UploadVideo from "./UploadVideo";
import ".scss";

function ImagesAndVideo() {
  return (
    <div id="seller-product-images-and-video" className="component-wrapper">
      <h3 className="seller-product-cpn-title top">
        Hình ảnh và video sản phẩm
      </h3>
      <UploadVideo />
      <Images />
    </div>
  );
}

export default ImagesAndVideo;
