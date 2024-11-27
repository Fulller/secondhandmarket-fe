import { getApiUrl } from "@tools/url.tool";
import axios, { service } from "@tools/axios.tool";

const CategoryService = {
  localStorageKey: 'categoryTreeCache',
  getTree() {
    const cachedData = localStorage.getItem(this.localStorageKey);
    if (cachedData) {
      return Promise.resolve([JSON.parse(cachedData), null]);
    } else {
      return service(axios.get(getApiUrl("/categories")))
        .then(([response,err]) => {
          localStorage.setItem(this.localStorageKey, JSON.stringify(response));
          return [response,err];
        });
    }
  },
  getAttributesById(id) {
    return service(axios.get(getApiUrl(`/categories/` + id)));
  },
};

export default CategoryService;
