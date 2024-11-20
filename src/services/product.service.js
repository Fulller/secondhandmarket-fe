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
  fetchHomeProducts(page = 1, size = 8) {
    return service(
      axios.get(getApiUrl(`/products/home?page=${page - 1}&size=${size}`))
    );
  },
  searchProducts(query, filters = {}, page = 0, size = 10) {
    const params = {
      ...(query && { q: query.trim() }), // Thêm tham số 'q' nếu query có giá trị
      page,
      size,
      ...Object.fromEntries(
        Object.entries(filters).filter(
          ([_, value]) => value != null && value !== "" // Chỉ thêm các trường có giá trị hợp lệ
        )
      ),
    };
    // Sửa: Truyền params vào trong config của axios
    return service(axios.get(getApiUrl(`/products/search`), { params }));
  },
};

export default ProductService;
