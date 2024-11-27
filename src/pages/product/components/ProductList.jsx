import React from "react";
import { Link } from "react-router-dom";
import Avatar from "../../../assets/images/default-avatar.png";
import Product from "../../../assets/images/default-product.png";
import useAddress from "@hooks/useAddress";
import { CiLocationOn } from "react-icons/ci";
import "./ProductList.scss"; // Import the custom SCSS file

function ProductList({ products }) {
  const getAddress = useAddress();

  if (!products || products.length === 0) {
    return <p className="text-center">Không có sản phẩm nào để hiển thị.</p>;
  }

  return (
    <div className="product-list">
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <Link to={`/product/${product.slug}`}>
            <div className="product-image">
              <img
                src={product.thumbnail ? product.thumbnail : Product}
                alt={product.name}
                className="img-fluid"
              />
            </div>
            <div className="product-info">
              <div className="product-title">
                <h3>{product.name}</h3>
              </div>
              <p className="product-price">{product.price.toLocaleString()}₫</p>
              <div className="seller-info">
                <img
                  src={product.seller.avatar ? product.seller.avatar : Avatar}
                  alt={product.seller.name}
                  className="seller-avatar"
                />
                <p className="seller-name">{product.seller.name}</p>
              </div>
              <div className="product-meta">
                <div className="location">
                  <CiLocationOn className="location-icon" />
                  {getAddress.province(product.address.province)}
                </div>
                <p className="posted-time">
                  {Math.floor(
                    (Date.now() - new Date(product.postedAt)) /
                      (1000 * 60 * 60 * 24)
                  )}{" "}
                  ngày
                </p>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
