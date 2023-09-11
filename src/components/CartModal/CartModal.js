"use client";
import React, { useContext, useEffect } from "react";
import CommonModal from "../CommonModal/CommonModal";
import Link from "next/link";
import { GlobalContext } from "../../context/context";
import { deleteCartItem, getCartItems } from "../../services/cart";
import Notification from "../Notification";
import ComponentLevelLoader from "../Loader/ComponentLevel";
import { toast } from "react-toastify";
import { PulseLoader } from "react-spinners";

const CartModal = () => {
  const {
    showCartModal,
    setShowCartModal,
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
    <div>
      <CommonModal
        show={showCartModal}
        setShow={setShowCartModal}
        showButtons={true}
        mainContent={
          pageLoader ? (
            <div className="flex justify-center items-center mt-60">
              <PulseLoader color="#000" loading={pageLoader} size={10} />
            </div>
          ) : cartItems && cartItems.length > 0 ? (
            <ul role="list" className="my-6 divide-y divide-gray-300">
              {cartItems.map((item) => (
                <li key={item._id} className="flex py-6">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <Link href={`/product/${item.productId?._id}`}>
                      <img src={item.productId?.imageUrl} alt="product-img" />
                    </Link>
                  </div>
                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>
                          <Link href={`/product/${item.productId?._id}`}>
                            {item.productId?.name}
                          </Link>
                        </h3>
                      </div>
                      <div className="flex items-center">
                        <p
                          className={`text-sm text-gray-600 mt-1  ${
                            item.productId?.onSale === "yes"
                              ? "line-through"
                              : ""
                          }`}
                        >
                          EGP{item.productId?.price}.00
                        </p>
                        {item.productId?.onSale === "yes" && (
                          <p className="ml-2 mt-1 text-sm font-semibold text-red-700">
                            {`${(
                              item.productId?.price -
                              (item.productId?.priceDrop / 100) *
                                item.productId?.price
                            ).toFixed(0)}`}
                            .00
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <button
                        type="button"
                        className="font-medium text-yellow-600 sm:order-2"
                        onClick={() => handleDeleteCartItem(item)}
                      >
                        {componentLoader.loading &&
                        componentLoader.id === item._id ? (
                          <ComponentLevelLoader
                            text="Removing"
                            color="#000"
                            loading={componentLoader.loading}
                          />
                        ) : (
                          "Remove"
                        )}
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center mt-60">
              <p className="font-medium text-xl tracking-wide">
                Your Shopping Cart Is Empty.
              </p>
            </div>
          )
        }
        buttonComponent={
          <>
            <Link
              href="/cart"
              onClick={() => setShowCartModal(false)}
              className="mt-1.5 w-full inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide text-center"
            >
              Go To Cart
            </Link>
            <Link
              href="/checkout"
              onClick={() => setShowCartModal(false)}
              disabled={cartItems && cartItems.length === 0}
              className="mt-1.5 w-full inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide text-center disabled:opacity-50"
            >
              Checkout
            </Link>
            <div className="mt-6 flex justify-center text-center text-sm text-gray-600">
              <button
                className="font-medium text-gray"
                onClick={() => setShowCartModal(false)}
              >
                Continue Shopping
                <span aria-hidden="true"> &rarr;</span>
              </button>
            </div>
          </>
        }
      />
      <Notification />
    </div>
  );
};

export default CartModal;
