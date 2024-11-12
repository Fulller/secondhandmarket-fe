// src/components/ProductList.jsx
import React from "react";
import { Link } from "react-router-dom";
import Avatar from "../../../assets/images/default-avatar.png";
import Product from "../../../assets/images/default-product.png";
function ProductList({ products }) {
  if (!products || products.length === 0) {
    return <p className="text-center">Không có sản phẩm nào để hiển thị.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
      {products.map((product) => (
        <div key={product.id} className="border rounded-lg overflow-hidden shadow-lg">
          <Link to={`/product/${product.slug}`}>
            <img src={product.thumbnail? product.thumbnail:Product} alt={product.name} className="w-full h-80 object-cover" />
            <div className="p-4">
              <h3 className="font-semibold text-lg">{product.name}</h3>
              <p className="text-red-500 font-bold">{product.price.toLocaleString()}₫</p>
              <p className="text-gray-500 text-sm">
                {product.address.district}, {product.address.province}
              </p>
              <div className="flex items-center mt-2">
                <img src={product.seller.avatar? product.seller.avatar:Avatar} alt={product.seller.name} className="w-8 h-8 rounded-full" />
                <p className="ml-2">{product.seller.name}</p>
              </div>
              {/* Thời gian đăng với giờ */}
              <p className="text-gray-400 text-xs mt-2">
                Ngày đăng: {new Date(product.postedAt).toLocaleString()}
              </p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
