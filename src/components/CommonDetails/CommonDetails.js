"use client";
import Link from "next/link";
import React, { useContext } from "react";
import { GlobalContext } from "../../context/context";
import { addToCart } from "../../services/cart";
import ComponentLevelLoader from "../Loader/ComponentLevel";
import Notification from "../Notification";
import { toast } from "react-toastify";

const CommonDetails = ({ product }) => {
  const { componentLoader, setComponentLoader, user, setShowCartModal } =
    useContext(GlobalContext);
  const handleAddToCart = async (item) => {
    setComponentLoader({ loading: true, id: item._id });
    const res = await addToCart({
      userId: user._id,
      productId: item._id,
    });
    if (res.success) {
      setComponentLoader({ loading: false, id: "" });
      toast.success(res.message);
      setShowCartModal(true);
    } else {
      setComponentLoader({ loading: true, id: "" });
      toast.error(res.message);
      setShowCartModal(true);
    }
  };
  return (
    <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-12 mt-8 lg:col-gap-12 xl:col-gap-16 lg:mt-12 lg:grid-cols-5 lg:gap-16">
          <div className="lg:col-span-3 lg:row-end-1">
            <div className="lg:flex lg:items-start">
              <div className="lg:order-2 lg:ml-5">
                <div className="max-w-xl overflow-hidden rounded-lg">
                  <img
                    src={product.imageUrl}
                    alt="product-details"
                    className="h-full w-full max-w-full object-cover"
                  />
                </div>
              </div>
              <div className="mt-2 w-full lg:order-1 lg:w-32 lg-flex-shrink-0">
                <div className="flex flex-row items-start lg:flex-col">
                  <button
                    type="button"
                    className="flex-0 aspect-square mb-3 h-20 overflow-hidden rounded-lg border-2 border-gray-100 text-center"
                  >
                    <img
                      src={product.imageUrl}
                      alt="product-details"
                      className="object-cover"
                    />
                  </button>
                  <button
                    type="button"
                    className="flex-0 aspect-square mb-3 h-20 overflow-hidden rounded-lg border-2 border-gray-100 text-center"
                  >
                    <img
                      src={product.imageUrl}
                      alt="product-details"
                      className="object-cover"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-2 lg:row-span-2 lg:row-end-2">
            <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
            <div className="mt-10 flex flex-col items-center justify-between space-y-4 border-t border-b py-4 sm:flex-row sm:space-y-0">
              <div className="flex items-end">
                <h1
                  className={`text-2xl font-bold mr-2 ${
                    product.onSale === "yes" ? "line-through" : ""
                  }`}
                >
                  EGP{product.price}.00
                </h1>
                {product.onSale === "yes" && (
                  <h1 className="text-2xl font-bold text-red-700">
                    {`${(
                      product.price -
                      (product.priceDrop / 100) * product.price
                    ).toFixed(0)}`}
                    .00
                  </h1>
                )}
              </div>
              <button
                className="mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium tracking-wide uppercase text-white"
                type="button"
                onClick={() => handleAddToCart(product)}
              >
                {componentLoader.loading &&
                product._id === componentLoader.id ? (
                  <ComponentLevelLoader
                    text="Adding To Cart"
                    loading={componentLoader.loading}
                    color="#fff"
                  />
                ) : (
                  "Add To Cart"
                )}
              </button>
            </div>
            <ul className="mt-8 space-y-2">
              <li className="flex items-center text-left text-sm font-medium text-gray-600">
                {product.deliveryInfo}
              </li>
              <li className="flex items-center text-left text-sm font-medium text-gray-600">
                cancel anytime
              </li>
            </ul>
            <div className="lg:col-span-3 mt-2">
              <div className="border-b border-gray-400">
                <nav className="flex gap-4">
                  <Link
                    href="#"
                    className="border-b-2 border-gray-900 py-4 text-sm font-medium text-gray-900"
                  >
                    Description
                  </Link>
                </nav>
              </div>
              <div className="mt-6">{product.description}</div>
            </div>
          </div>
        </div>
      </div>
      <Notification />
    </div>
  );
};

export default CommonDetails;
