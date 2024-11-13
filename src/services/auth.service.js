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
};

export default AuthService;
