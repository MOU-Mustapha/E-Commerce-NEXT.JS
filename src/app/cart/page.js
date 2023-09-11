"use client";
import React, { useContext, useEffect } from "react";
import CommonCart from "../../components/CommonCart/CommonCart";
import { GlobalContext } from "../../context/context";
import { deleteCartItem, getCartItems } from "../../services/cart";
import Notification from "../../components/Notification";
import { toast } from "react-toastify";
import { PulseLoader } from "react-spinners";

const Cart = () => {
  const {
    user,
    cartItems,
    setCartItems,
    componentLoader,
    setComponentLoader,
    pageLoader,
    setPageLoader,
  } = useContext(GlobalContext);
  const getAllCartItems = async () => {
    setPageLoader(true);
    const res = await getCartItems(user._id);
    if (res.success) {
      setCartItems(res.data);
      localStorage.setItem("cartItems", JSON.stringify(res.data));
      setPageLoader(false);
    }
  };
  useEffect(() => {
    if (user) {
      getAllCartItems();
    }
  }, [user]);
  const handleDeleteCartItem = async (item) => {
    setComponentLoader({ loading: true, id: item._id });
    const res = await deleteCartItem(item._id);
    if (res.success) {
      setComponentLoader({ loading: false, id: "" });
      toast.success(res.message);
      getAllCartItems();
    } else {
      setComponentLoader({ loading: false, id: "" });
      toast.error(res.message);
    }
  };
  return (
    <div className="bg-gray-100">
      {pageLoader ? (
        <div className="flex justify-center mt-60 h-screen">
          <PulseLoader color="#000" loading={pageLoader} size={10} />
        </div>
      ) : cartItems && cartItems.length > 0 ? (
        <CommonCart
          cartItems={cartItems}
          componentLoader={componentLoader}
          handleDeleteCartItem={handleDeleteCartItem}
        />
      ) : (
        <div className="text-center pt-60 bg-white">
          <p className="font-medium text-xl tracking-wide">
            Your Shopping Cart Is Empty.
          </p>
        </div>
      )}
      <Notification />
    </div>
  );
};

export default Cart;
