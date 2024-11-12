import axios from "axios";

export const fetchHomeProducts = async (page = 0, size = 8) => {
  try {
    const response = await axios.get(`http://localhost:8080/api/products/home`, {
      params: { page, size },
      headers: { Accept: "application/hal+json" }
    });
    return response.data.data; 
  } catch (error) {
    console.error("Lỗi khi lấy danh sách sản phẩm:", error);
    throw error;
  }
};
// Lấy danh sách danh mục
export const fetchCategories = async () => {
  try {
    const response = await axios.get("http://localhost:8080/api/categories");
    return response.data.data;
  } catch (error) {
    console.error("Lỗi khi tải danh mục:", error);
    throw error;
  }
};

// Hàm tìm kiếm sản phẩm với từ khóa bắt buộc và các bộ lọc không bắt buộc
export const searchProducts = async (query, filters = {}, page = 0, size = 10) => {
  try {
    // Thiết lập các tham số tìm kiếm với `q` bắt buộc
    const params = {
      q: query || " ",  // Dùng khoảng trắng nếu query rỗng
      page,
      size,
      ...(filters.province && { province: filters.province }),
      ...(filters.categoryId && { categoryId: filters.categoryId }),
      ...(filters.minPrice && { minPrice: filters.minPrice }),
      ...(filters.maxPrice && { maxPrice: filters.maxPrice }),
    };

    // Gửi yêu cầu tìm kiếm với các tham số được thiết lập
    const response = await axios.get("http://localhost:8080/api/products/search", {
      params,
      headers: { Accept: "application/hal+json" },
    });

    // Trả về dữ liệu từ API
    return response.data.data;
  } catch (error) {
    // In ra lỗi và ném lỗi lên để xử lý ở nơi gọi hàm
    console.error("Lỗi khi tìm kiếm sản phẩm:", error.response ? error.response.data : error.message);
    throw error;
  }
};

export const fetchProductByIdOrSlug = async (idOrSlug) => {
  const response = await axios.get(`http://localhost:8080/api/products/${idOrSlug}`);
  return response.data;
};


