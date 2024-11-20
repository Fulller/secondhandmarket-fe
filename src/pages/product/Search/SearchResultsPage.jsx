import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { TreeSelect, Slider, Button, message, Pagination, Select } from "antd";
import debounce from "lodash/debounce";
import ProductList from "../../Home/ProductList";
import provincesData from "@assets/json/address.json";
import CategoryService from "@services/category.service";
import ProductService from "@services/product.service";

function SearchResultsPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    categoryId: searchParams.get("categoryId") || "",
    province: searchParams.get("province") || "",
    minPrice: parseInt(searchParams.get("minPrice") || 0, 10),
    maxPrice: parseInt(searchParams.get("maxPrice") || 1000000, 10),
  });

  const query = searchParams.get("q") || "";
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get("page") || 0, 10)
  );
  const [totalPages, setTotalPages] = useState(1);

  // Load danh mục khi khởi tạo
  useEffect(() => {
    const fetchCategories = async () => {
      const [res, err] = await CategoryService.getTree();
      if (err) {
        message.error("Không thể tải danh mục!");
      } else {
        setCategories(res.data);
      }
    };
    fetchCategories();
  }, []);

  // Load sản phẩm khi có thay đổi filters hoặc query
  useEffect(() => {
    const fetchProducts = async () => {
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
        setProducts([]);
      } else {
        setProducts(res.data.content);
        setTotalPages(res.data.totalPages);
      }
    };
    fetchProducts();
  }, [query, filters, currentPage]);

  const handleFilterChange = (name, value) => {
    const updatedFilters = { ...filters, [name]: value };
    setFilters(updatedFilters);

    const updatedSearchParams = new URLSearchParams(searchParams);
    if (value) {
      updatedSearchParams.set(name, value);
    } else {
      updatedSearchParams.delete(name);
    }

    setCurrentPage(0); // Reset page về 0
    updatedSearchParams.set("page", 0);
    navigate(`/search?${updatedSearchParams.toString()}`);
  };

  const handlePriceChange = debounce(([minPrice, maxPrice]) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      minPrice,
      maxPrice,
    }));

    const updatedSearchParams = new URLSearchParams(searchParams);
    updatedSearchParams.set("minPrice", minPrice);
    updatedSearchParams.set("maxPrice", maxPrice);
    updatedSearchParams.set("page", 0); // Reset page về 0 khi thay đổi giá
    navigate(`/search?${updatedSearchParams.toString()}`);
  }, 300);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    const updatedSearchParams = new URLSearchParams(searchParams);
    updatedSearchParams.set("page", page);
    navigate(`/search?${updatedSearchParams.toString()}`);
  };

  const handleGoBack = () => {
    navigate("/home");
  };

  // Biến đổi danh mục thành dạng tree cho TreeSelect
  const transformCategoriesToTree = (categories) => {
    return categories.map((category) => ({
      title: category.name,
      value: category.id,
      selectable: !category.children || category.children.length === 0, // chỉ cho phép chọn danh mục con
      children: category.children
        ? transformCategoriesToTree(category.children)
        : [],
    }));
  };

  return (
    <div className="container mx-auto p-4 flex">
      {/* Bộ lọc */}
      <div className="w-1/4 pl-4 bg-white p-4 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Bộ lọc</h2>

        {/* Bộ lọc danh mục */}
        {/* <TreeSelect
          placeholder="Tất cả danh mục"
          className="w-full mb-4"
          value={filters.categoryId}
          defaultValue={filters.categoryId}
          onChange={(value) => handleFilterChange("categoryId", value)}
          treeData={transformCategoriesToTree(categories)} // Dữ liệu danh mục dạng cây
          treeDefaultExpandAll
          showSearch
          filterTreeNode={(inputValue, treeNode) =>
            treeNode.title.toLowerCase().includes(inputValue.toLowerCase())
          }
          treeNodeFilterProp="title"
        /> */}

        {/* Bộ lọc tỉnh/thành phố */}
        <Select
          placeholder="Tất cả tỉnh/thành phố"
          className="w-full mb-4"
          value={filters.province}
          onChange={(value) => handleFilterChange("province", value)}
          showSearch
          filterOption={(input, option) =>
            option.children.toLowerCase().includes(input.toLowerCase())
          }
          defaultValue={filters.province}
        >
          <Select.Option value="">Tất cả tỉnh/thành phố</Select.Option>
          {Object.keys(provincesData).map((province) => (
            <Select.Option key={province} value={province}>
              {provincesData[province].name}
            </Select.Option>
          ))}
        </Select>

        {/* Bộ lọc giá */}
        <div className="mb-4">
          <label className="block mb-2">Khoảng giá (VNĐ):</label>
          <Slider
            range
            min={0}
            max={1000000}
            step={10000}
            value={[filters.minPrice, filters.maxPrice]}
            onChange={handlePriceChange}
          />
        </div>
      </div>

      {/* Danh sách sản phẩm */}
      <div className="w-3/4 pr-4">
        <h1 className="text-2xl font-bold mb-4">
          Kết quả tìm kiếm cho "{query}"
        </h1>
        {loading ? (
          <p>Đang tải...</p>
        ) : (
          <>
            <ProductList products={products} />
            <Pagination
              current={currentPage + 1} // Ant Design Pagination starts at 1
              total={totalPages * 10} // Tính toán tổng số bản ghi
              onChange={(page) => handlePageChange(page - 1)} // Convert back to 0-indexed
            />
            <div className="flex justify-center mb-4 mt-9">
              <Button onClick={handleGoBack} className="bg-gray-300">
                Trở lại
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default SearchResultsPage;
