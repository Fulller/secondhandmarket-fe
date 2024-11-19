import { getApiUrl } from "@tools/url.tool";
import axios, { service } from "@tools/axios.tool";

const ProductService = {
  sellerGetProductById(id) {
    return service(axios.get(getApiUrl(`/products/seller/${id}`)));
  },
  postProduct(data) {
    return service(axios.post(getApiUrl("/products"), data));
  },
  updateProduct(id, data) {
    return service(axios.put(getApiUrl(`/products/seller/${id}`), data));
  },
  sellerGetAllProduct() {
    return service(axios.get(getApiUrl(`/products/seller`)));
  },
  changeStatus(id, status) {
    return service(
      axios.put(getApiUrl(`/products/seller/${id}/change-status/${status}`))
    );
  },
  // Lấy danh sách sản phẩm trên trang chủ
  async fetchHomeProducts(page = 0, size = 8) {
    try {
      const response = await axios.get(getApiUrl("/products/home"), {
        params: { page, size },
        headers: { Accept: "application/hal+json" },
      });
      return response.data.data;
    } catch (error) {
      console.error("Lỗi khi lấy danh sách sản phẩm:", error);
      throw error;
    }
  },

  // Lấy danh sách danh mục
  async fetchCategories() {
    try {
      const response = await axios.get(getApiUrl("/categories"));
      return response.data.data;
    } catch (error) {
      console.error("Lỗi khi tải danh mục:", error);
      throw error;
    }
  },

  // Tìm kiếm sản phẩm
  async searchProducts(query, filters = {}, page = 0, size = 10) {
    try {
      const params = {
        q: query || " ",
        page,
        size,
        ...(filters.province && { province: filters.province }),
        ...(filters.categoryId && { categoryId: filters.categoryId }),
        ...(filters.minPrice && { minPrice: filters.minPrice }),
        ...(filters.maxPrice && { maxPrice: filters.maxPrice }),
      };

      const response = await axios.get(getApiUrl("/products/search"), {
        params,
        headers: { Accept: "application/hal+json" },
      });

      return response.data.data;
    } catch (error) {
      console.error("Lỗi khi tìm kiếm sản phẩm:", error.response ? error.response.data : error.message);
      throw error;
    }
  },

  // Lấy sản phẩm theo ID hoặc slug
  async fetchProductByIdOrSlug(idOrSlug) {
    try {
      const response = await axios.get(getApiUrl(`/products/${idOrSlug}`));
      return response.data;
    } catch (error) {
      console.error("Lỗi khi lấy sản phẩm:", error);
      throw error;
    }
  },

  // Lấy thông tin người bán
  async fetchSellerInfo(id) {
    try {
      const response = await axios.get(getApiUrl(`/users/${id}`));
      return response.data;
    } catch (error) {
      console.error("Lỗi khi lấy thông tin người bán:", error);
      throw error;
    }
  },

  // Lấy danh sách sản phẩm của người bán theo trang
  async fetchProductsBySeller(id, page = 0, size = 10) {
    try {
      const response = await axios.get(
        getApiUrl(`/products/seller/${id}/available`),
        { params: { page, size } }
      );
      return response.data.data;
    } catch (error) {
      console.error("Lỗi khi lấy danh sách sản phẩm của người bán:", error);
      throw error;
    }
  },
};

export default ProductService;
