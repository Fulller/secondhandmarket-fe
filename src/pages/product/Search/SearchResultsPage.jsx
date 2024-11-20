import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { fetchCategories } from "../../../services/productService";
import ProductList from "../components/ProductList";
import Pagination from "../components/Pagination";
import provincesData from "../../../assets/json/address.json";
import ProductService from "@services/product.service";
import { message } from "antd";
import CategoryService from "@services/category.service";
import { debounce } from "lodash";

function SearchResultsPage() {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    categoryId: searchParams.get("categoryId") || "",
    province: searchParams.get("province") || "",
    minPrice: searchParams.get("minPrice") || 0,
    maxPrice: searchParams.get("maxPrice") || 1000000,
  });
  const query = searchParams.get("q") || "";
  const [currentPage, setCurrentPage] = useState(searchParams.get("page") || 0);
  const [totalPages, setTotalPages] = useState(searchParams.get("size") || 10);

  const navigate = useNavigate();

  // Load categories on component mount
  useEffect(() => {
    const loadCategories = async () => {
      const [res, err] = await CategoryService.getTree();
      if (err) return;
      setCategories(res.data);
    };
    loadCategories();
  }, []);

  // Load products based on filters and search query
  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      const [res, err] = await ProductService.searchProducts(
        query,
        filters,
        currentPage,
        10
      );
      setLoading(false);
      if (err) {
        message.error("Không tìm thấy sản phẩm!");
      } else {
        message.success("Tìm kiếm thành công!");
        setProducts(res.data.content);
        setTotalPages(res.data.totalPages);
      }
    };
    loadProducts();
  }, [query, filters, currentPage]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));

    const updatedSearchParams = new URLSearchParams(window.location.search);
    if (value) {
      updatedSearchParams.set(name, value);
    } else {
      updatedSearchParams.delete(name);
    }
    navigate(`/search?${updatedSearchParams.toString()}`);
    setCurrentPage(0);
  };

  const handlePriceChange = debounce((e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: Number(value),
    }));
  }, 300);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleGoBack = () => {
    navigate("/home");
  };

  return (
    <div className="container mx-auto p-4 flex">
      <div className="w-1/4 pl-4 bg-white p-4 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Bộ lọc</h2>

        <select
          name="categoryId"
          onChange={handleFilterChange}
          value={filters.categoryId}
          className="w-full mb-4 p-2 border rounded-md"
        >
          <option value="">Tất cả danh mục</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        {/* Dropdown tỉnh/thành phố */}
        <select
          name="province"
          onChange={handleFilterChange}
          value={filters.province}
          className="w-full mb-4 p-2 border rounded-md"
        >
          <option value="">Tất cả tỉnh/thành phố</option>
          {Object.keys(provincesData).map((province) => (
            <option key={province} value={province}>
              {provincesData[province].name}
            </option>
          ))}
        </select>

        <div className="mb-4">
          <label className="block mb-2">
            Giá tối thiểu: {filters.minPrice.toLocaleString()} VNĐ
          </label>
          <input
            type="range"
            name="minPrice"
            min="0"
            max="1000000"
            step="10000"
            value={filters.minPrice}
            onChange={handlePriceChange}
            className="w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">
            Giá tối đa: {filters.maxPrice.toLocaleString()} VNĐ
          </label>
          <input
            type="range"
            name="maxPrice"
            min="0"
            max="100000000"
            step="10000"
            value={filters.maxPrice}
            onChange={handlePriceChange}
            className="w-full"
          />
        </div>
      </div>

      <div className="w-3/4 pr-4 ms-9">
        <h1 className="text-2xl font-bold mb-4">
          Kết quả tìm kiếm cho "{query}"
        </h1>
        {loading ? (
          <p>Đang tải...</p>
        ) : (
          <>
            <ProductList products={products} />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
            <div className="flex justify-center mb-4 mt-9">
              <button
                onClick={handleGoBack}
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
              >
                Trở lại
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default SearchResultsPage;
