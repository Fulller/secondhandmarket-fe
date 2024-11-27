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
    return service(
      axios.post(getApiUrl("/uploads/video"), formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
    );
  },
  async image(imageFile) {
    const formData = new FormData();
    formData.append("file", imageFile, "image.jpg");
    return service(
      axios.post(getApiUrl("/uploads/image"), formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
    );
  },
  async images(imageFiles) {
    const formData = new FormData();
    if (imageFiles && imageFiles.length > 0) {
      imageFiles.forEach((file) => {
        formData.append("files", file);
      });
    }
    return service(
      axios.post(getApiUrl("/uploads/images"), formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
    );
  },
  async video(videoFile) {
    const formData = new FormData();
    formData.append("file", videoFile);
    return service(
      axios.post(getApiUrl("/uploads/video"), formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
    );
  },
  async delete(fileUrl) {
    return service(axios.delete(getApiUrl("/uploads"), { fileUrl }));
  },
  async blobUrlToFile(blobUrl, fileName) {
    const response = await fetch(blobUrl);
    const blob = await response.blob();
    return new File([blob], fileName, { type: blob.type });
  },
};

export default uploadService;
