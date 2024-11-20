import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import ProductList from "./product/components/ProductList";
import Pagination from "./product/components/Pagination";
import poster from "../assets/images/poster.png";
import Footer from "./product/components/Footer";
import ProductService from "@services/product.service";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 8;

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const page = parseInt(searchParams.get("page") || "0", 10);
    setCurrentPage(page);
  }, [searchParams]);

  useEffect(() => {
    handleGetProductHome(currentPage, pageSize);
  }, [currentPage]);

  async function handleGetProductHome(currentPage, pageSize) {
    setLoading(true);
    const [res, err] = await ProductService.fetchHomeProducts(
      currentPage,
      pageSize
    );
    setLoading(false);
    console.log({ res, err });
    if (err) {
      console.error("Không thể tải danh sách sản phẩm:", err);
    } else {
      setProducts(res.data.content);
      setTotalPages(res.data.totalPages);
    }
  }

  const handleChangePage = (newPage) => {
    navigate(`?page=${newPage}`);
  };

  return (
    <div>
      {/* Poster Image */}
      <div className="container mx-auto mt-4">
        <img
          src={poster}
          alt="Poster"
          className="w-full h-64 object-cover rounded-lg shadow-lg"
        />
      </div>

      {/* Main Content */}
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Tin đăng dành cho bạn</h1>

        {loading ? (
          <p>Đang tải sản phẩm...</p>
        ) : (
          <>
            <ProductList products={products} />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => handleChangePage(page)}
            />
          </>
        )}

        {/* Thông tin giới thiệu ở cuối trang */}
        <div className="mt-8 bg-gray-100 p-6 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-semibold mb-4">Secondhand Market</h2>
          <p className="text-gray-700 mb-4">
            Secondhand Market là một nền tảng mua sắm trực tuyến tập trung vào
            việc mua bán các sản phẩm đã qua sử dụng, hướng đến phong cách sống
            bền vững và tiết kiệm.
          </p>
          <p className="text-gray-700 mb-4">
            Ngoài việc giúp bạn tiết kiệm chi phí, Secondhand Market còn hướng
            tới bảo vệ môi trường bằng cách giảm lượng rác thải thông qua việc
            tái sử dụng sản phẩm.
          </p>
          <p className="text-gray-700">
            Hãy tham gia cộng đồng Secondhand Market để tìm kiếm và trao đổi
            những món đồ yêu thích!
          </p>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Home;
