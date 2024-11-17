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
};

export default ProductService;
