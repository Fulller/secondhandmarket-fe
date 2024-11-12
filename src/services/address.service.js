import { getApiUrl } from "@tools/url.tool";
import axios, { service } from "@tools/axios.tool";

const AddressService = {
  postAddress(data) {
    return service(axios.post(getApiUrl("/addresses"), data));
  },
  putAddress(id, data) {
    return service(axios.put(getApiUrl(`/addresses/${id}`), data));
  },
  getAddressByid(id) {
    return service(axios.get(getApiUrl(`/addresses/${id}`)));
  },
};

export default AddressService;
