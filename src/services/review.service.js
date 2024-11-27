import { getApiUrl } from "@tools/url.tool";
import axios, { service } from "@tools/axios.tool";

const ReviewService = {
  postReview(reviewId, data) {
    return service(axios.post(getApiUrl(`/reviews/${reviewId}/post`), data));
  },

  getReview(reviewId) {
    return service(axios.get(getApiUrl(`/reviews/${reviewId}`)));
  },

  updateReview(reviewId, data) {
    return service(axios.put(getApiUrl(`/reviews/${reviewId}`), data));
  },

  deleteReview(reviewId) {
    return service(axios.put(getApiUrl(`/reviews/${reviewId}/change-status`)));
  },
  getSellerReview(status) {
    return service(
      axios.get(
        getApiUrl(`/reviews/seller${status ? "?status=" + status : ""}`)
      )
    );
  },
  getShopReview(sellerId, status) {
    return service(
      axios.get(
        getApiUrl(
          `/reviews/seller/${sellerId}${status ? "?status=" + status : ""}`
        )
      )
    );
  },

  getReviewerReview(status) {
    if (status == null) {
      return service(axios.get(getApiUrl(`/reviews/reviewer`)));
    } else {
      return service(
        axios.get(getApiUrl(`/reviews/reviewer?status=${status}`))
      );
    }
  },

  postFeedback(reviewId, data) {
    return service(
      axios.post(getApiUrl(`/reviews/${reviewId}/feedback`), data)
    );
  },
};
export default ReviewService;
