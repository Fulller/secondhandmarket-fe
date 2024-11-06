import { getApiUrl } from "@tools/url.tool";
import axios, { service } from "@tools/axios.tool";

const CategoryService = {
  getTree() {
    return service(axios.get(getApiUrl("/categories")));
  },
  getAttributeById(id) {
    return service(axios.get(getApiUrl(`/categories/`+id)))
  }
};

export default CategoryService;
