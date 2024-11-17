import { Fragment } from "react";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import MainLayout from "@layouts/MainLayout";
import AuthLayout from "@layouts/AuthLayout";
import AccountLayout from "@layouts/AccountLayout";

// Auth
import NotFound from "@pages/auth/NotFound";
import Home from "@pages/Home";
import Login from "@pages/auth/Login";
import Register from "@pages/auth/Register";
import ReceiveTokens from "@pages/auth/ReceiveTokens";
import ForgotPassword from "@pages/auth/ForgotPassword";
import Logout from "@pages/auth/Logout";
// User
import UserProfile from "@pages/user/Profile";
import UserChangePassword from "@pages/user/ChangePassword";
// Product
import ProductAll from "@pages/product/All";
import SellerProduct from "@pages/product/SellerProduct";
import ProductDetail from "@pages/product/Detail";
// Purchase request
import PurchaseRequestMy from "@pages/purchaseRequest/My";
import PurchaseRequestToMe from "@pages/purchaseRequest/ToMe";
// Order
import BuyOrder from "@pages/order/BuyOrder";
import SellOrder from "@pages/order/SellOrder";
// Review
import ReviewForMe from "@pages/review/ForMe";
import ReviewFromMe from "@pages/review/FromMe";
// Seller
import Seller from "@pages/Seller";

const ROUTE_TYPES = {
  PUBLIC: PublicRoute,
  PRIVATE: PrivateRoute,
};

const routes = [
  // Auth
  {
    path: "/",
    Page: Home,
    Layout: MainLayout,
    type: ROUTE_TYPES.PUBLIC,
    title: "Trang chủ",
  },
  {
    path: "/home",
    Page: Home,
    Layout: MainLayout,
    type: ROUTE_TYPES.PUBLIC,
    title: "Trang chủ",
  },
  {
    path: "/login",
    Page: Login,
    Layout: AuthLayout,
    type: ROUTE_TYPES.PUBLIC,
    title: "Đăng nhập",
  },
  {
    path: "/register",
    Page: Register,
    Layout: AuthLayout,
    type: ROUTE_TYPES.PUBLIC,
    title: "Đăng ký",
  },
  {
    path: "/logout",
    Page: Logout,
    Layout: Fragment,
    type: ROUTE_TYPES.PUBLIC,
    title: "Đăng xuất",
  },
  {
    path: "/auth/receive-tokens",
    Page: ReceiveTokens,
    Layout: Fragment,
    type: ROUTE_TYPES.PUBLIC,
    title: "Nhận tokens",
  },
  {
    path: "/forgot-password",
    Page: ForgotPassword,
    Layout: AuthLayout,
    type: ROUTE_TYPES.PUBLIC,
    title: "Lấy lại mật khẩu",
  },
  // User
  {
    path: "/user/profile",
    Page: UserProfile,
    Layout: AccountLayout,
    type: ROUTE_TYPES.PRIVATE,
    title: "Tài khoản / Thông tin",
  },
  {
    path: "/user/change-password",
    Page: UserChangePassword,
    Layout: AccountLayout,
    type: ROUTE_TYPES.PRIVATE,
    title: "Tài khoản / Đổi mật khẩu ",
  },
  // Product
  {
    path: "/product/all",
    Page: ProductAll,
    Layout: AccountLayout,
    type: ROUTE_TYPES.PRIVATE,
    title: "Sản phẩm / Tất cả",
  },
  {
    path: "/product/post",
    Page: SellerProduct,
    Layout: AccountLayout,
    type: ROUTE_TYPES.PRIVATE,
    title: "Sản phẩm / Đăng mới",
  },
  {
    path: "/product/edit/:id",
    Page: SellerProduct,
    Layout: AccountLayout,
    type: ROUTE_TYPES.PRIVATE,
    title: "Sản phẩm / Chỉnh sửa",
  },
  {
    path: "/product/:idOrSlug",
    Page: ProductDetail,
    Layout: MainLayout,
    type: ROUTE_TYPES.PUBLIC,
    title: "Sẩn phẩm / Chi tiết",
  },
  // Purchase request
  {
    path: "/purchase-request/my",
    Page: PurchaseRequestMy,
    Layout: AccountLayout,
    type: ROUTE_TYPES.PRIVATE,
    title: "Yêu cầu mua / Của tôi",
  },
  {
    path: "/purchase-request/to-me",
    Page: PurchaseRequestToMe,
    Layout: AccountLayout,
    type: ROUTE_TYPES.PRIVATE,
    title: "Yêu cầu mua / Đến tôi",
  },
  // Order
  {
    path: "/order/buy",
    Page: BuyOrder,
    Layout: AccountLayout,
    type: ROUTE_TYPES.PRIVATE,
    title: "Đơn hàng / Mua",
  },
  {
    path: "/order/sell",
    Page: SellOrder,
    Layout: AccountLayout,
    type: ROUTE_TYPES.PRIVATE,
    title: "Đơn hàng / Bán",
  },
  // Review
  {
    path: "/review/for-me",
    Page: ReviewForMe,
    Layout: AccountLayout,
    type: ROUTE_TYPES.PRIVATE,
    title: "Đánh giá / Cho tôi",
  },
  {
    path: "/review/from-me",
    Page: ReviewFromMe,
    Layout: AccountLayout,
    type: ROUTE_TYPES.PRIVATE,
    title: "Đánh giá / Từ tôi",
  },
  // Seller
  {
    path: "/seller/:id",
    Page: Seller,
    Layout: MainLayout,
    type: ROUTE_TYPES.PUBLIC,
    title: "Người bán",
  },
  {
    path: "/404",
    Page: NotFound,
    Layout: MainLayout,
    type: ROUTE_TYPES.PUBLIC,
    title: "Không tìm thấy trang",
  },
  {
    path: "*",
    Page: NotFound,
    Layout: MainLayout,
    type: ROUTE_TYPES.PUBLIC,
    title: "Không tìm thấy trang",
  },
];

export default routes.map((route) => {
  const { Layout, Page, title } = route;
  return {
    path: route.path,
    type: route.type,
    title: title,
    element: (
      <Layout>
        <Page></Page>
      </Layout>
    ),
  };
});
