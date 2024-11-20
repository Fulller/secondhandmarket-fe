// src/pages/SellerProfile.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  fetchSellerInfo,
  fetchProductsBySeller,
} from "../services/productService";
import Avatar from "../assets/images/default-avatar.png";
import PlaceholderImage from "../assets/images/default-product.png"; // Ảnh placeholder
import ReviewSeller from "@components/ReviewSeller";
import ReviewService from "@services/review.service";
import { message } from "antd";
import ReportSeller from "@components/ReportSeller";

function SellerProfile() {
  const { id } = useParams();
  const [seller, setSeller] = useState(null);
  const [products, setProducts] = useState([]);
  const [loadingSeller, setLoadingSeller] = useState(true);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [activeTab, setActiveTab] = useState("store");
  const [isReported, setIsReported] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [reportNum, setReportNum] = useState(0);

  useEffect(() => {
    const loadSellerInfo = async () => {
      try {
        setLoadingSeller(true);
        const sellerInfo = await fetchSellerInfo(id);
        setSeller(sellerInfo.data);
        loadProducts(0);
      } catch (error) {
        console.error("Không thể tải thông tin người bán:", error);
      } finally {
        setLoadingSeller(false);
      }
    };

    const loadProducts = async (page = 0) => {
      try {
        setLoadingProducts(true);
        const productsResponse = await fetchProductsBySeller(id, page, 4);
        if (productsResponse) {
          setProducts(productsResponse);
          setTotalPages(productsResponse.totalPages || 1);
        } else {
          setProducts([]);
        }
      } catch (error) {
        console.error("Không thể tải danh sách sản phẩm của người bán:", error);
        setProducts([]);
      } finally {
        setLoadingProducts(false);
      }
    };
    handleGetReview(id);
    handleCheckIsReported();
    loadSellerInfo();
  }, [id]);

  async function handleGetReview(id) {
    try {
      const [res, err] = await ReviewService.getShopReview(id);
      if (err) {
        message.error("Không có dữ liệu review");
      } else {
        setReviews(res.data);
        handleCheckIsReported(res.data);
      }
    } catch (err) {
      message.error("Lấy review thất bại");
      console.error(err);
    }
  }
  const handleSetNum = (data) => {
    setReportNum(data);
  };

  const handleCheckIsReported = (reviewsList) => {
    if (Array.isArray(reviewsList)) {
      const reportedReview = reviewsList.some((review) => review.isReport);
      setIsReported(reportedReview);
    } else {
      console.error("Dữ liệu review không hợp lệ");
    }
  };
  const handlePageChange = (newPage) => {
    setPage(newPage);
    loadProducts(newPage);
  };

  const calculateDaysSincePosted = (postedAt) => {
    const postedDate = new Date(postedAt);
    const currentDate = new Date();
    const differenceInTime = currentDate - postedDate;
    return Math.floor(differenceInTime / (1000 * 60 * 60 * 24));
  };

  if (loadingSeller) return <p>Đang tải thông tin người bán...</p>;
  if (!seller) return <p>Không tìm thấy người bán.</p>;

  return (
    <div className="container mx-auto p-4">
      {/* Thanh điều hướng và ảnh lớn */}
      <div className="bg-white shadow rounded-lg mb-6">
        <div className="flex items-center p-4">
          <img
            src={seller.avatar || Avatar}
            alt={seller.name}
            className="w-16 h-16 rounded-full mr-4"
          />
          <div className="flex-1">
            <h1 className="text-2xl font-semibold">{seller.name}</h1>
            <p className="text-yellow-500 font-semibold">
              Đánh giá: {seller.rating || "Chưa có đánh giá"} ⭐
            </p>
          </div>
          <button className="bg-orange-500 text-white px-4 py-2 rounded">
            + Theo dõi
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="p-4 border bg-white shadow rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Giới thiệu</h2>
            <div className="mt-2">
              <p className="text-gray-500">SĐT: {seller.phone}</p>
              {seller?.address && (
                <p className="text-gray-500">
                  Địa chỉ:{" "}
                  {`${seller?.address?.detail}, ${seller?.address?.ward}, ${seller.address.district}, ${seller.address.province}`}
                </p>
              )}
            </div>
          </div>
          <div className="p-4 border bg-white shadow rounded-lg">
            <h2 className="text-xl font-semibold mb-2">
              Chính sách của cửa hàng
            </h2>
            <p>Chưa có chính sách cửa hàng</p>
          </div>
        </div>
        <img
          src={seller.avatar || PlaceholderImage}
          alt="Main banner"
          className="w-full h-64 object-cover"
        />
        <div className="flex justify-around border-t mt-2">
          <button
            onClick={() => setActiveTab("store")}
            className={`py-2 px-4 ${
              activeTab === "store"
                ? "border-orange-500 border-b-2 font-semibold"
                : ""
            }`}
          >
            Cửa Hàng
          </button>

          <button
            onClick={() => setActiveTab("reviews")}
            className={`py-2 px-4 ${
              activeTab === "reviews"
                ? "border-orange-500 border-b-2 font-semibold"
                : ""
            }`}
          >
            Đánh Giá
          </button>

          {isReported ? (
            <button
              onClick={() => setActiveTab("reports")}
              className={`py-2 px-4 ${
                activeTab === "reports"
                  ? "border-orange-500 border-b-2 font-semibold"
                  : ""
              }`}
            >
              Báo cáo
            </button>
          ) : (
            <></>
          )}
        </div>
      </div>

      {/* Nội dung tab */}
      {activeTab === "store" && (
        <div className="bg-white p-4 shadow rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Sản phẩm đang bán</h2>
          {loadingProducts ? (
            <p>Đang tải sản phẩm...</p>
          ) : (
            <div>
              {products.length > 0 ? (
                products.map((product) => (
                  <Link to={`/product/${product.slug}`} key={product.id}>
                    <div className="flex items-center gap-4 p-4 border-b">
                      <img
                        src={product.thumbnail || PlaceholderImage}
                        alt={product.name}
                        className="w-24 h-24 rounded"
                      />
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold">
                          {product.name}
                        </h3>
                        <p className="text-red-500 font-bold">
                          {product.price.toLocaleString("vi-VN")} VNĐ
                        </p>
                        <p className="text-gray-400 text-sm mt-5">
                          {" "}
                          {calculateDaysSincePosted(product.postedAt)} ngày
                        </p>
                      </div>
                      <button className="text-red-500">❤️</button>
                    </div>
                  </Link>
                ))
              ) : (
                <p>Không có sản phẩm để hiển thị.</p>
              )}
            </div>
          )}

          {/* Phân trang cho sản phẩm */}
          <div className="flex justify-center mt-4">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 0}
              className="px-4 py-2 bg-gray-300 rounded mr-2 disabled:opacity-50"
            >
              Trang trước
            </button>
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page >= totalPages - 1}
              className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
            >
              Trang sau
            </button>
          </div>
        </div>
      )}

      {activeTab === "activity" && (
        <div className="bg-white p-4 shadow rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Hoạt Động</h2>
          <p>Thông tin hoạt động của người bán sẽ hiển thị ở đây.</p>
        </div>
      )}

      {activeTab === "reports" && (
        <div className="bg-white p-4 shadow rounded-lg">
          <div className="flex justify-between">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Báo cáo</h2>
            </div>
            <div>
              {reportNum.number != null && reportNum.number >= 0 && (
                <h2 className="text-2xl font-semibold mb-4">
                  {reportNum.number}/5
                </h2>
              )}
            </div>
          </div>
          <ReportSeller reportNumber={handleSetNum} />
        </div>
      )}

      {activeTab === "reviews" && (
        <div className="bg-white p-4 shadow rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Đánh Giá</h2>
          <ReviewSeller />
        </div>
      )}
    </div>
  );
}

export default SellerProfile;
