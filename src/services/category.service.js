import { getApiUrl } from "@tools/url.tool";
import axios, { service } from "@tools/axios.tool";
import mockCategory from "@assets/json/mock-category-tree.json";
import mockAttribute from "@assets/json/mock-attribute.json";

const CategoryService = {
  getTree() {
    return service(axios.get(getApiUrl("/categories")));
  },
  // getTree() {
  //   return [{ data: mockCategory }, null];
  // },
  getAttributesById(id) {
    return service(axios.get(getApiUrl(`/categories/` + id)));
  },
  // getAttributesById(id) {
  //   return [{ data: mockAttribute[id] }, null];
  // },
};

export default CategoryService;
