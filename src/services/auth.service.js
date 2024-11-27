import { getAuthUrl, getApiUrl } from "@tools/url.tool";
import axios, { service } from "@tools/axios.tool";
import store from "@redux/store.redux";

const AuthService = {
  // Đăng nhập
  login({ email, password }) {
    return service(axios.post(getAuthUrl("/login"), { email, password }));
  },

  // Đăng ký
  register({ email, password }) {
    return service(axios.post(getAuthUrl("/register"), { email, password }));
  },

  // Làm mới token
  refreshToken() {
    const { refreshToken } = store.getState().auth.tokens;
    return service(axios.post(getAuthUrl("/refresh-token"), { refreshToken }));
  },

  // Lấy thông tin người dùng
  getUserInfo() {
    return service(axios.get(getAuthUrl("/info")));
  },

  // Quên mật khẩu
  forgotPassword(email) {
    return service(axios.post(getAuthUrl("/forgot-password"), { email }));
  },

  // Xác thực mã quên mật khẩu
  forgotPasswordVerify({ code, newPassword }) {
    return service(
      axios.post(getAuthUrl("/forgot-password/verify"), { code, newPassword })
    );
  },

  // Cập nhật thông tin người dùng
  updateUserInfo(userInfo) {
    return service(axios.put(getApiUrl("/users"), userInfo));
  },

  // Đổi mật khẩu
  changePassword({ currentPassword, newPassword }) {
    return service(
      axios.post(getAuthUrl("/change-password"), {
        currentPassword,
        newPassword,
      })
    );
  },

  // **API: Lấy địa chỉ người dùng theo ID**
  getUserAddressByUserId(userId) {
    return service(axios.get(getApiUrl(`/users/${userId}/address`)));
  },

  // Lấy địa chỉ theo ID
  getAddressById(addressId) {
    return service(axios.get(getApiUrl(`/addresses/${addressId}`)));
  },

  // Tạo mới địa chỉ
  createAddress(addressData) {
    return service(axios.post(`/addresses`, addressData));
  },

  // Cập nhật địa chỉ
  updateAddress(addressId, addressData) {
    return service(
      axios.put(getApiUrl(`/addresses/${addressId}`), addressData)
    );
  },

  // Upload ảnh
  uploadImage(formData) {
    return axios.post(getApiUrl("/uploads/image"), formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  // Lấy thông tin người dùng theo ID
  getUser(userId) {
    return service(axios.get(`/users/${userId}`));
  },

  // Lấy địa chỉ người dùng theo ID người dùng
  getUserAddress(userId) {
    return service(axios.get(`/users/${userId}/address`));
  },
};

export default AuthService;
