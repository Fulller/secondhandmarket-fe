import { getApiUrl } from "@tools/url.tool";
import axios, { service } from "@tools/axios.tool";

const uploadService = {
  postImages(images) {
    const formData = new FormData();
    for (let i = 0; i < images.length; i++) {
      formData.append("files", images[i]);
    }
    return service(
      axios.post(getApiUrl("/uploads/images"), formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
    );
  },

  postImage(data) {
    return service(axios.post(getApiUrl("/uploads/image"), { data }));
  },

  postVideo(video) {
    const formData = new FormData();
    formData.append("file", video);
    return service(axios.post(getApiUrl("/uploads/video"), formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
    }));
  },
};

export default uploadService;
