import { getApiUrl } from "@tools/url.tool";  
import axios, { service } from "@tools/axios.tool";

// Cấu hình các hàm gọi API cho Purchase Requests
const PurchaseRequestService = {
  // Lấy yêu cầu mua của người mua
  getBuyerRequests() {
    return service(axios.get(getApiUrl("/purchase-requests/buyer")));
  },

  // Lấy yêu cầu mua của người bán
  getSellerRequests() {
    return service(axios.get(getApiUrl("/purchase-requests/seller")));
  },

  // Tạo yêu cầu mua
  postPurchaseRequest(productId, message) {
    return service(axios.post(getApiUrl(`/purchase-requests/${productId}`), { message }));
  },

  // Lấy yêu cầu mua theo ID sản phẩm
  getPurchaseRequestsByProductId(productId) {
    return service(axios.get(getApiUrl(`/purchase-requests/product/${productId}`)));
  },

  // Chấp nhận yêu cầu mua
  acceptPurchaseRequest(purchaseRequestId) {
    return service(axios.put(getApiUrl(`/purchase-requests/${purchaseRequestId}/accept`)));
  },

  // Từ chối yêu cầu mua
  rejectPurchaseRequest(purchaseRequestId) {
    return service(axios.put(getApiUrl(`/purchase-requests/${purchaseRequestId}/reject`)));
  },

  // Xóa yêu cầu mua
  deletePurchaseRequest(purchaseRequestId) {
    return service(axios.delete(getApiUrl(`/purchase-requests/${purchaseRequestId}`)));
  }
};

export default PurchaseRequestService;
