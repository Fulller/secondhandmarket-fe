import { getApiUrl } from "@tools/url.tool";
import axios, { service } from "@tools/axios.tool";

const OrderService = {
  getOrderSeller(status) {
    return service(axios.get(getApiUrl(`/orders/seller?status=${status}`)));
  },

  getOrderBuyer(status) {
    return service(axios.get(getApiUrl(`/orders/buyer?status=${status}`)));
  },

  getOrderByProductId(productId) {
    return service(axios.get(getApiUrl(`/orders/product/${productId}`)));
  },
  //cancel order
  putCancelOrderProduct(orderId) {
    return service(axios.put(getApiUrl(`/orders/cancel/${orderId}`)));
  },
  //complete order
  putCompleteOrder(orderId) {
    return service(axios.put(getApiUrl(`/orders/complete/${orderId}`)));
  },
};

export default OrderService;
