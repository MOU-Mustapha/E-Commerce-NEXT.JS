"use client";
import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../../context/context";
import { getOrderDetails } from "../../../services/order";
import { useParams } from "next/navigation";
import { PulseLoader } from "react-spinners";
import Link from "next/link";

const OrderDetails = () => {
  const { user, pageLoader, setPageLoader } = useContext(GlobalContext);
  const [orderDetails, setOrderDetails] = useState([]);
  const { orderId } = useParams();
  const extractOrderDetails = async () => {
    setPageLoader(true);
    const res = await getOrderDetails(orderId);
    if (res.success) {
      setPageLoader(false);
      setOrderDetails(res.data);
    } else {
      setPageLoader(false);
    }
  };
  useEffect(() => {
    extractOrderDetails();
  }, []);
  if (pageLoader)
    return (
      <div className="w-full min-h-screen flex justify-center items-center">
        <PulseLoader color="#000" loading={pageLoader} size={10} />
      </div>
    );
  if (orderDetails)
    return (
      <div className="py-14 px-4 md:px-6">
        <div className="flex justify-start items-start space-y-2 flex-col">
          <h1 className="text-3xl lg:text-4xl font-bold leading-7 lg:leading-9 text-gray-900">
            Order #{orderDetails._id}
          </h1>
          <p className="text-base font-medium leading-6 text-gray-600">
            {orderDetails.paidAt && orderDetails.paidAt.split("T")[0]} |{" "}
            {orderDetails.paidAt &&
              orderDetails.paidAt.split("T")[1].split(".")[0]}
          </p>
        </div>
        <div className="mt-10 flex flex-col justify-center items-stretch w-full xl:flex-row  xl:space-x-8 md:space-y-6 xl:space-y-0">
          <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
            <div className="flex flex-col justify-start items-start bg-gray-50 rounded-lg px-4 py-4 md:p-6 xl:p-8 w-full">
              <p className="font-bold text-lg">Your Order Summary</p>
              {orderDetails &&
              orderDetails.orderItems &&
              orderDetails.orderItems.length
                ? orderDetails.orderItems.map((item) => (
                    <div
                      key={item._id}
                      className="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full"
                    >
                      <div className="pb-4 md:pb-8 w-full md:w-40">
                        <img
                          src={item.product.imageUrl}
                          alt="product-img"
                          className="w-full hidden md:block"
                        />
                      </div>
                      <div className="border-b border-gray-300 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
                        <div className="w-full flex flex-col justify-start items-start space-y-8">
                          <h3 className="text-xl font-semibold leading-6 text-gray-900">
                            {item.product.name}
                          </h3>
                        </div>
                        <div className="w-full flex items-start space-x-4">
                          <h3
                            className={`text-xl font-semibold leading-6 text-gray-900 ${
                              item.product.onSale === "yes"
                                ? "line-through"
                                : ""
                            }`}
                          >
                            EGP{item.product.price}.00
                          </h3>
                          {item.product.onSale === "yes" && (
                            <h3 className="text-xl font-semibold leading-6 text-red-700">
                              {`${(
                                item.product.price -
                                (item.product.priceDrop / 100) *
                                  item.product.price
                              ).toFixed(0)}`}
                              .00
                            </h3>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                : null}
            </div>
            <div className="flex justify-center flex-col md:flex-row items-stretch w-full space-y-4 md:space-y-0 md:space-x-5 xl:space-x-8">
              <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 rounded-lg space-y-6">
                <h3 className="text-xl font-semibold leading-6 text-gray-900">
                  Summary
                </h3>
                <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                  <div className="flex justify-between w-full">
                    <p className="text-base leading-5 text-gray-800">
                      Subtotal:
                    </p>
                    <p className="text-base leading-5 text-gray-900">
                      EGP{(+orderDetails.totalPrice).toFixed(0)}.00
                    </p>
                  </div>
                  <div className="flex justify-between w-full">
                    <p className="text-base leading-5 text-gray-800">
                      Shipping:
                    </p>
                    <p className="text-base leading-5 text-gray-900">EGP0.00</p>
                  </div>
                  <div className="flex justify-between w-full">
                    <p className="text-base leading-5 text-gray-800">Total:</p>
                    <p className="text-base leading-5 text-gray-900">
                      EGP{(+orderDetails.totalPrice).toFixed(0)}.00
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <div className="bg-gray-50 rounded-lg w-full xl:w-96 flex items-center md:items-start px-4 py-6 flex-col">
              <h3 className="text-xl font-semibold leading-6 text-gray-900">
                Customer Details
              </h3>
              <div className="flex flex-col justify-start items-start flex-shrink-0">
                <div className="flex flex-col gap-4 justify-center w-full md:justify-start py-8 border-b border-gray-200">
                  <div className="flex items-center gap-4">
                    <div>
                      <img
                        src="/images/photo.png"
                        alt="profile-photo"
                        className="w-20 h-20 rounded-full"
                      />
                    </div>
                    <div className="flex flex-col flex-1">
                      <p className="text-base font-semibold leading-4 text-left text-gray-900 mb-2">
                        Name: {user?.name}
                      </p>
                      <p className="text-base font-semibold leading-4 text-left text-gray-900">
                        Email: {user?.email}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg w-full xl:w-96 flex items-center md:items-start px-4 py-6 flex-col">
              <h3 className="text-xl font-semibold leading-6 text-gray-900">
                Shipping Address
              </h3>
              <div className="flex flex-col justify-start items-start flex-shrink-0">
                <div className="flex flex-col gap-4 justify-center w-full md:justify-start py-8 border-b border-gray-200">
                  <p>Address: {orderDetails?.shippingAddress?.address}</p>
                  <p>City: {orderDetails?.shippingAddress?.city}</p>
                  <p>Country: {orderDetails?.shippingAddress?.country}</p>
                  <p>
                    Postal Code: {orderDetails?.shippingAddress?.postalCode}
                  </p>
                </div>
              </div>
            </div>
            <Link
              href="/"
              className="mt-5 inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide text-center"
            >
              Shop Again
            </Link>
          </div>
        </div>
      </div>
    );
};

export default OrderDetails;
