import { MdOutlineAccountCircle } from "react-icons/md";
import { RiBillLine, RiShoppingCartLine } from "react-icons/ri";
import { IoPricetagsOutline } from "react-icons/io5";
import { LuTags } from "react-icons/lu";
import { MdOutlineFiberNew, MdOutlinePassword } from "react-icons/md";
import { BsSendArrowDown, BsSendArrowUp } from "react-icons/bs";
import { CiMoneyBill } from "react-icons/ci";
import { useSelector } from "react-redux";
import { useMemo } from "react";

const navItems = [
  {
    label: "Tài khoản",
    key: "user",
    icon: <MdOutlineAccountCircle />,
    items: [
      {
        icon: <MdOutlineAccountCircle />,
        label: "Hồ sơ",
        key: "/user/profile",
        path: "/user/profile",
      },
    ],
  },
  {
    label: "Sản phẩm",
    key: "product",
    icon: <IoPricetagsOutline />,
    items: [
      {
        icon: <LuTags />,
        label: "Tất cả",
        key: "/product/all",
        path: "/product/all",
      },
      {
        icon: <MdOutlineFiberNew />,
        label: "Đăng mới",
        key: "/product/post",
        path: "/product/post",
      },
    ],
  },
  {
    label: "Yêu cầu mua hàng",
    key: "purchase-request",
    icon: <RiBillLine />,
    items: [
      {
        icon: <BsSendArrowUp />,
        label: "Của tôi",
        key: "/purchase-request/my",
        path: "/purchase-request/my",
      },
      {
        icon: <BsSendArrowDown />,
        label: "Cho tôi",
        key: "/purchase-request/to-me",
        path: "/purchase-request/to-me",
      },
    ],
  },
  {
    label: "Đơn hàng",
    key: "order",
    icon: <RiShoppingCartLine />,
    items: [
      {
        icon: <CiMoneyBill />,
        label: "Bán",
        key: "/order/sell",
        path: "/order/sell",
      },
      {
        icon: <CiMoneyBill />,
        label: "Mua",
        key: "/order/buy",
        path: "/order/buy",
      },
    ],
  },
];

function useNavItems() {
  const isFromOutside = useSelector((state) => state.auth?.user?.isFromOutside);

  const updatedNavItems = useMemo(() => {
    const newNavItems = [...navItems];
    if (isFromOutside === false) {
      const accountSection = newNavItems.find((item) => item.key === "user");
      if (
        accountSection &&
        !accountSection.items.some(
          (subItem) => subItem.key === "/user/change-password"
        )
      ) {
        accountSection.items.push({
          icon: <MdOutlinePassword />,
          label: "Đổi mật khẩu",
          key: "/user/change-password",
          path: "/user/change-password",
        });
      }
    }
    return newNavItems;
  }, [isFromOutside]);

  return updatedNavItems;
}

export default useNavItems;
