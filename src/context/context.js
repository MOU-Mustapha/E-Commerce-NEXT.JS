"use client";
import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";

export const GlobalContext = createContext(null);

const protectedRoutes = ["cart", "checkout", "profile", "orders", "admin-view"];
const protectedAdminRoutes = [
  "/admin-view",
  "/admin-view/all-products",
  "/admin-view/add-product",
];

const GlobalState = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [showNavModal, setShowNavModal] = useState(false);
  const [pageLoader, setPageLoader] = useState(false);
  const [componentLoader, setComponentLoader] = useState({
    loading: false,
    id: "",
  });
  const [isAuthUser, setIsAuthUser] = useState(null);
  const [user, setUser] = useState(null);
  const [currentUpdatedProduct, setCurrentUpdatedProduct] = useState(null);
  const [showCartModal, setShowCartModal] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [addressFormData, setAddressFormData] = useState({
    fullName: "",
    address: "",
    city: "",
    country: "",
    postalCode: "",
  });
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [checkoutFormData, setCheckoutFormData] = useState({
    shippingAddress: {},
    paymentMethod: "",
    totalPrice: 0,
    isPaid: false,
    paidAt: new Date(),
    isProcessing: true,
  });
  useEffect(() => {
    if (Cookies.get("token")) {
      setIsAuthUser(true);
      setUser(JSON.parse(localStorage.getItem("user")));
      setCartItems(JSON.parse(localStorage.getItem("cartItems")));
    } else {
      setIsAuthUser(false);
      setUser({});
    }
  }, [Cookies]);
  useEffect(() => {
    if (
      pathname !== "/register" &&
      pathname !== "/" &&
      !pathname.includes("product") &&
      user &&
      Object.keys(user).length === 0 &&
      protectedRoutes.includes(pathname) > -1
    ) {
      router.push("/login");
    }
  }, [user, pathname]);
  useEffect(() => {
    if (
      user &&
      Object.keys(user).length > 0 &&
      user?.role !== "admin" &&
      protectedAdminRoutes.indexOf(pathname) !== -1
    ) {
      router.push("/unauthorized");
    }
  }, [user, pathname]);
  return (
    <GlobalContext.Provider
      value={{
        showNavModal,
        setShowNavModal,
        isAuthUser,
        setIsAuthUser,
        user,
        setUser,
        pageLoader,
        setPageLoader,
        componentLoader,
        setComponentLoader,
        currentUpdatedProduct,
        setCurrentUpdatedProduct,
        showCartModal,
        setShowCartModal,
        cartItems,
        setCartItems,
        addresses,
        setAddresses,
        addressFormData,
        setAddressFormData,
        checkoutFormData,
        setCheckoutFormData,
        selectedAddress,
        setSelectedAddress,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalState;
