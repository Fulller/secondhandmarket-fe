import { getApiUrl } from "@tools/url.tool";
import axios, { service } from "@tools/axios.tool";

const ReportService = {
  postReport(data) {
    return service(axios.post(getApiUrl("/report/post"), data));
  },
  getReport(id) {
    return service(axios.get(getApiUrl(`/report/reviews/${id}`)));
  },
};
export default ReportService;
