import { getApiUrl } from "@tools/url.tool";
import axios, { service } from "@tools/axios.tool";

const ProductService = {
  GetProductById(id) {
    return service(axios.get(getApiUrl(`/products/seller/${id}`)));
  },
  PostProduct(data) {
    return service(axios.post(getApiUrl("/products"), data));
  },
  PutProduct(id, data) {
    return service(axios.put(getApiUrl(`/products/seller/${id}`), data));
  },
};

export default ProductService;
