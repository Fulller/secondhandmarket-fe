import { getAuthUrl, getApiUrl } from "@tools/url.tool";
import axios, { service } from "@tools/axios.tool";
import store from "@redux/store.redux";

const AuthService = {
  
  login({ email, password }) {
    return service(axios.post(getAuthUrl("/login"), { email, password }));
  },

  
  register({ email, password }) {
    return service(axios.post(getAuthUrl("/register"), { email, password }));
  },

  
  refreshToken() {
    const { refreshToken } = store.getState().auth.tokens;
    return service(axios.post(getAuthUrl("/refresh-token"), { refreshToken }));
  },

 
  getUserInfo() {
    return service(axios.get(getAuthUrl("/info")));
  },

  
  forgotPassword(email) {
    return service(axios.post(getAuthUrl("/forgot-password"), { email }));
  },

  
  forgotPasswordVerify({ code, newPassword }) {
    return service(
      axios.post(getAuthUrl("/forgot-password/verify"), { code, newPassword })
    );
  },

  
  updateUserInfo(userInfo) {
    return service(axios.put(getApiUrl("/users"), userInfo));
  },

  
  changePassword({ currentPassword, newPassword }) {
    return service(
      axios.post(getAuthUrl("/change-password"), {
        currentPassword,
        newPassword,
      })
    );
  },

 
  getAddressById(addressId) {
    return service(axios.get(getApiUrl(`/addresses/${addressId}`)));
  },
  
  createAddress(addressData) {
    return service(axios.post(getApiUrl("/addresses"), addressData));
  },

  
  updateAddress(addressId, addressData) {
    return service(axios.put(getApiUrl(`/addresses/${addressId}`), addressData));
  },

  
  uploadImage(formData) {
    return axios.post(getApiUrl("/uploads/image"), formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};

export default AuthService;
