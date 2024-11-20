import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  fetchProductByIdOrSlug,
  searchProducts,
} from "../../../services/productService";
import Avatar from "../../../assets/images/default-avatar.png";
import Product from "../../../assets/images/default-product.png";
import ProductList from "../components/ProductList";
import ModalRequestPurchase from "./components/ModalRequestPurchase";

function ProductDetail() {
  const { idOrSlug } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  const [thumbnailPage, setThumbnailPage] = useState(0);
  const thumbnailsPerPage = 4;
  const totalThumbnailPages = Math.ceil(
    (product?.images.length + 1) / thumbnailsPerPage
  );

  const [relatedPage, setRelatedPage] = useState(0);
  const [relatedTotalPages, setRelatedTotalPages] = useState(1);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const response = await fetchProductByIdOrSlug(idOrSlug);
        setProduct(response.data);

        if (response.data.category.id) {
          loadRelatedProducts(response.data.category.id);
        }
      } catch (error) {
        console.error("Không thể tải chi tiết sản phẩm:", error);
      } finally {
        setLoading(false);
      }
    };

    const loadRelatedProducts = async (categoryId) => {
      try {
        const relatedResponse = await searchProducts(
          " ",
          { categoryId },
          relatedPage,
          4
        );
        setRelatedProducts(relatedResponse.content || []);
        setRelatedTotalPages(relatedResponse.totalPages);
      } catch (error) {
        console.error("Không thể tải danh sách sản phẩm cùng loại:", error);
      }
    };

    loadProduct();
  }, [idOrSlug, relatedPage]);

  if (loading) return <p>Đang tải thông tin sản phẩm...</p>;
  if (!product) return <p>Không tìm thấy sản phẩm.</p>;

  const media = [
    ...(product.video ? [{ type: "video", url: product.video }] : []),
    { type: "image", url: product.thumbnail },
    ...product.images.map((img) => ({ type: "image", url: img.url })),
  ];

  const handlePrevSlide = () =>
    setCurrentSlide((prev) => (prev === 0 ? media.length - 1 : prev - 1));
  const handleNextSlide = () =>
    setCurrentSlide((prev) => (prev === media.length - 1 ? 0 : prev + 1));
  const handleThumbnailClick = (index) => setCurrentSlide(index);

  const handlePrevThumbnailPage = () =>
    setThumbnailPage((prev) => Math.max(prev - 1, 0));
  const handleNextThumbnailPage = () =>
    setThumbnailPage((prev) => Math.min(prev + 1, totalThumbnailPages - 1));

  const handlePrevRelatedPage = () =>
    setRelatedPage((prev) => Math.max(prev - 1, 0));
  const handleNextRelatedPage = () =>
    setRelatedPage((prev) => Math.min(prev + 1, relatedTotalPages - 1));

  return (
    <div className="container mx-auto p-4">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold">
          Thông tin chi tiết về {product.name}
        </h1>
      </div>

      {/* Phần chi tiết sản phẩm */}
      <div className="flex flex-col md:flex-row gap-10 mb-14 items-start">
        {/* Slideshow và ảnh nhỏ */}
        <div className="w-full md:w-1/3 relative flex flex-col items-center">
          <div className="relative w-full h-96">
            <button
              onClick={handlePrevSlide}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-300 p-2 rounded-full"
            >
              {"<"}
            </button>
            <button
              onClick={handleNextSlide}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-300 p-2 rounded-full"
            >
              {">"}
            </button>
            {media[currentSlide].type === "image" ? (
              <img
                src={media[currentSlide].url || Product}
                alt={product.name}
                className="w-full h-full object-cover rounded-lg shadow-lg"
              />
            ) : (
              <video
                src={media[currentSlide].url || Product}
                controls
                className="w-full h-full rounded-lg shadow-lg"
              />
            )}
          </div>
          {/* Thumbnails với phân trang */}
          <div className="flex items-center mt-4 space-x-2 mb-9">
            {thumbnailPage > 0 && (
              <button
                onClick={handlePrevThumbnailPage}
                className="p-2 bg-gray-300 rounded-lg"
              >
                {"<"}
              </button>
            )}
            {media
              .slice(
                thumbnailPage * thumbnailsPerPage,
                (thumbnailPage + 1) * thumbnailsPerPage
              )
              .map((item, index) => (
                <img
                  key={index}
                  src={item.url}
                  alt="Thumbnail"
                  onClick={() =>
                    handleThumbnailClick(
                      thumbnailPage * thumbnailsPerPage + index
                    )
                  }
                  className={`w-16 h-16 object-cover rounded-lg cursor-pointer ${
                    thumbnailPage * thumbnailsPerPage + index === currentSlide
                      ? "border-2 border-blue-500"
                      : "border border-gray-300"
                  }`}
                />
              ))}
            {thumbnailPage < totalThumbnailPages - 1 && (
              <button
                onClick={handleNextThumbnailPage}
                className="p-2 bg-gray-300 rounded-lg"
              >
                {">"}
              </button>
            )}
          </div>
        </div>

        {/* Thông tin chi tiết sản phẩm */}
        <div className="flex-1">
          <h2 className="text-3xl font-bold mb-2">{product.name}</h2>
          <p className="text-gray-600 mb-2">{product.description}</p>
          <p className="text-xl font-semibold text-blue-600 mb-4">
            Giá: {product.price.toLocaleString("vi-VN")} VNĐ
          </p>
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Địa chỉ:</h3>
            <p>
              {product.address.detail}, {product.address.ward},{" "}
              {product.address.district}, {product.address.province}
            </p>
          </div>
          <Link to={`/seller/${product.seller.id}`}>
            <div className="flex items-center gap-4">
              <img
                src={product.seller.avatar || Avatar}
                alt={product.seller.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h3 className="text-lg font-semibold">{product.seller.name}</h3>
                {product.seller.rating && (
                  <p className="text-yellow-500">
                    {" "}
                    Đánh giá: {product.seller.rating}⭐
                  </p>
                )}
              </div>
            </div>
          </Link>
          <div className="mt-14 mb-14">
            <ModalRequestPurchase product={product}/>
          </div>
        </div>
      </div>

      {/* Bảng thuộc tính sản phẩm */}
      <div className="mt-10">
        <h3 className="text-2xl font-semibold mb-4">Thuộc tính sản phẩm</h3>
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm">
              <th className="py-3 px-6 text-left">Tên thuộc tính</th>
              <th className="py-3 px-6 text-left">Giá trị</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {product.productAttributes.map((attr) => (
              <tr
                key={attr.id}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6">{attr.attribute.name}</td>
                <td className="py-3 px-6">{attr.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Danh sách sản phẩm cùng loại */}
      <div className="mt-10">
        <h3 className="text-2xl font-semibold mb-4">Sản phẩm cùng loại</h3>
        <ProductList products={relatedProducts} />
        <div className="flex justify-center mt-4 space-x-4">
          <button
            onClick={handlePrevRelatedPage}
            disabled={relatedPage === 0}
            className="px-4 py-2 bg-gray-300 rounded-lg"
          >
            Trang trước
          </button>
          <button
            onClick={handleNextRelatedPage}
            disabled={relatedPage === relatedTotalPages - 1}
            className="px-4 py-2 bg-gray-300 rounded-lg"
          >
            Trang sau
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
