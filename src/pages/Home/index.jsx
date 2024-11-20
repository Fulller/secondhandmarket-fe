import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Spin, Pagination, Row, Col, Typography } from "antd";
import ProductList from "./ProductList";
import Footer from "./Footer";
import ProductService from "@services/product.service";
import poster from "@assets/images/poster.png";
import ".scss";

const { Title, Paragraph } = Typography;

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(9);
  const [totalPages, setTotalPages] = useState(1);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const page = parseInt(searchParams.get("page") || "1", 10);
    const size = parseInt(searchParams.get("size") || "9", 10);
    setCurrentPage(page);
    setPageSize(size);
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

  const handleChangePage = (page) => {
    navigate(`?page=${page}`);
  };

  return (
    <div className="home-container">
      {/* Poster Image */}
      <div className="poster-container">
        <img src={poster} alt="Poster" className="poster" />
      </div>

      {/* Main Content */}
      <div className="main-content">
        <Title level={2} className="section-title">
          Tin đăng dành cho bạn
        </Title>

        {loading ? (
          <div className="loading-container">
            <Spin size="large" />
          </div>
        ) : (
          <>
            <ProductList products={products} />
            <Pagination
              className="pagination"
              current={currentPage}
              pageSize={pageSize}
              total={totalPages * pageSize}
              onChange={handleChangePage}
            />
          </>
        )}

        {/* Introduction Section */}
        <div className="intro-section">
          <Title level={3}>Secondhand Market</Title>
          <Paragraph>
            Secondhand Market là một nền tảng mua sắm trực tuyến tập trung vào
            việc mua bán các sản phẩm đã qua sử dụng, hướng đến phong cách sống
            bền vững và tiết kiệm.
          </Paragraph>
          <Paragraph>
            Ngoài việc giúp bạn tiết kiệm chi phí, Secondhand Market còn hướng
            tới bảo vệ môi trường bằng cách giảm lượng rác thải thông qua việc
            tái sử dụng sản phẩm.
          </Paragraph>
          <Paragraph>
            Hãy tham gia cộng đồng Secondhand Market để tìm kiếm và trao đổi
            những món đồ yêu thích!
          </Paragraph>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Home;
