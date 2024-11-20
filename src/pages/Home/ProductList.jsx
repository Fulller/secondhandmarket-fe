import React from "react";
import { Card, Avatar } from "antd";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale"; // Locale tiếng Việt
import { FaMapMarkerAlt, FaClock } from "react-icons/fa"; // React Icons
import useAddress from "@hooks/useAddress";
import ".scss";

const { Meta } = Card;

function ProductList({ products }) {
  const address = useAddress();
  return (
    <div className="product-list">
      {products.map((product) => (
        <Link key={product.id} to={`/product/${product.slug}`}>
          <Card
            hoverable
            cover={
              <img
                alt={product.name}
                src={product.thumbnail}
                className="product-image"
              />
            }
            className="product-card"
          >
            <Meta
              avatar={
                <Avatar
                  src={
                    product.seller.avatar || "/assets/images/default-avatar.png"
                  }
                  alt={product.seller.name}
                />
              }
              title={product.name}
              description={
                <>
                  <p className="product-price">{`${product.price.toLocaleString()} ₫`}</p>
                  <p className="product-seller" title={product.seller.name}>
                    Người bán: {product.seller.name}
                  </p>
                  <p className="product-location">
                    <FaMapMarkerAlt className="icon" />
                    {address.province(product.address.province)}
                  </p>
                  <p className="product-postedAt">
                    <FaClock className="icon" />
                    {formatDistanceToNow(new Date(product.postedAt), {
                      addSuffix: true,
                      locale: vi, // Định dạng tiếng Việt
                    })}
                  </p>
                </>
              }
            />
          </Card>
        </Link>
      ))}
    </div>
  );
}

ProductList.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      thumbnail: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      address: PropTypes.shape({
        province: PropTypes.string.isRequired,
      }).isRequired,
      postedAt: PropTypes.string.isRequired,
      seller: PropTypes.shape({
        avatar: PropTypes.string,
        name: PropTypes.string.isRequired,
      }).isRequired,
    })
  ).isRequired,
};

export default ProductList;
