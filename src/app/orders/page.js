"use client";
import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context/context";
import { getAllOrders } from "../../services/order";
import { PulseLoader } from "react-spinners";
import Link from "next/link";

const page = () => {
  const { user, pageLoader, setPageLoader } = useContext(GlobalContext);
  const [orders, setOrders] = useState([]);
  const allOrders = async () => {
    setPageLoader(true);
    const res = await getAllOrders(user._id);
    if (res.success) {
      setOrders(res.data);
      setPageLoader(false);
    } else {
      setPageLoader(false);
    }
  };
  useEffect(() => {
    if (user) {
      allOrders();
    }
  }, [user]);
  if (pageLoader)
    return (
      <div className="w-full min-h-screen flex justify-center items-center">
        <PulseLoader color="#000" loading={pageLoader} size={10} />
      </div>
    );
  return (
    <div className="min-h-screen bg-gray-200 ">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mt-8 mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-8 sm:py-10">
            <div>
              {orders && orders.length ? (
                <ul className="flex flex-col gap-4">
                  {orders.map((item) => (
                    <li
                      key={item._id}
                      className="bg-white shadow p-5 flex flex-col space-y-3 py-6 text-left"
                    >
                      <div className="flex">
                        <h1 className="font-bold text-lg mb-3 flex-1">
                          Order: #{item._id}
                        </h1>
                        <div className="flex items-center">
                          <p className="mr-3 text-sm font-medium text-gray-900">
                            Total Paid Amount:
                          </p>
                          <p className="mr-3 text-2xl font-semibold text-gray-900">
                            EGP{item.totalPrice.toFixed(0)}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {item.orderItems.map((orderItem, index) => (
                          <div key={index} className="shrink-0">
                            <img
                              src={orderItem.product.imageUrl}
                              alt="product-img"
                              className="h-24 w-24 object-cover object-top rounded-lg"
                            />
                          </div>
                        ))}
                      </div>
                      <div className="flex gap-5">
                        {item.isProcessing ? (
                          <button className="mt-5 inline-block bg-red-900 text-white px-5 py-3 text-xs font-medium uppercase tracking-wide text-center">
                            Order Is Processing
                          </button>
                        ) : (
                          <button className="mt-5 inline-block bg-green-900 text-white px-5 py-3 text-xs font-medium uppercase tracking-wide text-center">
                            Order Is Delivered
                          </button>
                        )}
                        <Link
                          href={`/orders/${item._id}`}
                          className="mt-5 inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide text-center"
                        >
                          Order Details
                        </Link>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="w-full flex flex-col justify-center items-center mt-40">
                  <p className="font-medium text-xl tracking-wide">
                    There Are No Orders Yet.
                  </p>
                  <Link
                    href="/"
                    className="mt-5 inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide text-center"
                  >
                    Go Shopping
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
