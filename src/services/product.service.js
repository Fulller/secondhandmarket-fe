import { getApiUrl } from "@tools/url.tool";
import axios, { service } from "@tools/axios.tool";
import _ from "lodash";

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
  searchProducts(filter) {
    return service(
      axios.get(getApiUrl(`/products/search`), {
        params: _.chain(filter)
          .clone()
          .set("page", filter.page - 1)
          .value(),
      })
    );
  },
};

export default ProductService;
