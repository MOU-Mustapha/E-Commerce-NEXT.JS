import React from "react";
import ComponentLevelLoader from "../Loader/ComponentLevel";
import Link from "next/link";

const CommonCart = ({ cartItems, componentLoader, handleDeleteCartItem }) => {
  const final = cartItems
    ?.map((item) => {
      return item.productId;
    })
    .map((product) => {
      return product.price - (product.priceDrop / 100) * product.price;
    });
  return (
    <div className="my-8 min-h-screen">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mt-8 max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow">
            <div className="px-4 py-6 sm:px-8">
              <div>
                {cartItems && cartItems.length ? (
                  <ul>
                    {cartItems.map((item) => (
                      <li
                        key={item._id}
                        className="flex flex-col space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0"
                      >
                        <div className="shrink-0 h-24 w-24 mb-3">
                          <img
                            src={item.productId.imageUrl}
                            alt="product-img"
                            className="rounded-lg"
                          />
                        </div>
                        <div className="flex flex-1 flex-col justify-between">
                          <div className="sm:col-gap-5 sm:grid sm:grid-cols-3">
                            <div className="pr-8 sm:pr-4">
                              <p className="text-base font-semibold text-gray-900">
                                {item.productId.name}
                              </p>
                            </div>
                            <div className="flex mt-4 items-end justify-center gap-3 sm:mt-0">
                              <p
                                className={`text-base shrink-0 font-semibold text-gray-950 sm:order-1 ${
                                  item.productId.onSale === "yes"
                                    ? "line-through"
                                    : ""
                                }`}
                              >
                                EGP{item.productId.price}.00
                              </p>
                              {item.productId.onSale === "yes" && (
                                <p className="text-base shrink-0 font-semibold sm:order-1 text-red-700">
                                  {`${(
                                    item.productId.price -
                                    (item.productId.priceDrop / 100) *
                                      item.productId.price
                                  ).toFixed(0)}`}
                                  .00
                                </p>
                              )}
                            </div>
                            <button
                              type="button"
                              className="font-medium text-yellow-700 sm:order-2"
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
                ) : null}
              </div>
              <div className="mt-6 border-t border-b py-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-400">Subtotal:</p>
                  <p className="text-lg text-black font-semibold">
                    EGP
                    {final && final.length
                      ? final
                          .reduce((acc, curr) => {
                            return acc + curr;
                          })
                          .toFixed(0)
                      : "0"}
                    .00
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-400">Shipping:</p>
                  <p className="text-lg text-black font-semibold">EGP0.00</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-400">Total:</p>
                  <p className="text-lg text-black font-semibold">
                    EGP
                    {final && final.length
                      ? final
                          .reduce((acc, curr) => {
                            return acc + curr;
                          })
                          .toFixed(0)
                      : "0"}
                    .00
                  </p>
                </div>
                <div className="mt-5 text-center">
                  <Link
                    href="/checkout"
                    className="inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg text-white font-medium uppercase tracking-wide"
                  >
                    Checkout
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommonCart;
