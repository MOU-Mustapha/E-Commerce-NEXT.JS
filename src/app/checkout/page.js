"use client";
import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context/context";
import { getAllAddresses } from "../../services/address";
import Link from "next/link";
import { loadStripe } from "@stripe/stripe-js";
import { callStripeSession } from "../../services/stripe";
import { PulseLoader } from "react-spinners";
import { useRouter, useSearchParams } from "next/navigation";
import { createNewOrder } from "../../services/order";

const page = () => {
  const {
    cartItems,
    user,
    addresses,
    setAddresses,
    checkoutFormData,
    setCheckoutFormData,
    selectedAddress,
    setSelectedAddress,
  } = useContext(GlobalContext);
  const params = useSearchParams();
  const router = useRouter();
  const allAddresses = async () => {
    const res = await getAllAddresses(user._id);
    if (res.success) {
      setAddresses(res.data);
    }
  };
  useEffect(() => {
    if (user) {
      allAddresses();
    }
  }, [user]);
  const final = cartItems
    ?.map((item) => {
      return item.productId;
    })
    .map((product) => {
      return product.price - (product.priceDrop / 100) * product.price;
    });
  const handleSelectedAddress = (address) => {
    if (address._id === selectedAddress) {
      setSelectedAddress(null);
      setCheckoutFormData({
        ...checkoutFormData,
        shippingAddress: {},
      });
      return;
    }
    setSelectedAddress(address._id);
    setCheckoutFormData({
      ...checkoutFormData,
      shippingAddress: {
        fullName: address.fullName,
        city: address.city,
        country: address.country,
        postalCode: address.postalCode,
        address: address.address,
      },
    });
  };
  const [isOrderProcessing, setIsOrderProcessing] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const publishableKey =
    "pk_test_51NoblzEXceHzQqK76lAUppkhEvdE8XIfdbAPQXS99BN6hzn0kiPaMVhOUUXoBaX4w73phdIO9XqXs2Rb7VmE1U8n00HwOqmFHG";
  const stripePromise = loadStripe(publishableKey);
  const handleCheckout = async () => {
    const stripe = await stripePromise;
    const createLineItems = cartItems.map((item) => ({
      price_data: {
        currency: "EGP",
        product_data: {
          images: [item.productId.imageUrl],
          name: item.productId.name,
        },
        unit_amount: item.productId.price * 100,
      },
      quantity: 1,
    }));
    const res = await callStripeSession(createLineItems);
    setIsOrderProcessing(true);
    localStorage.setItem("stripe", true);
    localStorage.setItem("checkoutFormData", JSON.stringify(checkoutFormData));
    const { error } = await stripe.redirectToCheckout({
      sessionId: res.id,
    });
    console.log(error);
  };
  const createFinalOrder = async () => {
    const isStripe = JSON.parse(localStorage.getItem("stripe"));
    if (
      isStripe &&
      params.get("status") === "success" &&
      cartItems &&
      cartItems.length > 0
    ) {
      setIsOrderProcessing(true);
      const checkoutFormData = JSON.parse(
        localStorage.getItem("checkoutFormData")
      );
      const finalCheckoutFormData = {
        user: user._id,
        shippingAddress: checkoutFormData.shippingAddress,
        orderItems: cartItems.map((item) => ({
          qty: 1,
          product: item.productId,
        })),
        paymentMethod: "stripe",
        totalPrice: final.reduce((acc, curr) => {
          return acc + curr;
        }),
        isPaid: true,
        paidAt: new Date(),
        isProcessing: true,
      };
      const res = await createNewOrder(finalCheckoutFormData);
      if (res.success) {
        setIsOrderProcessing(false);
        setOrderSuccess(true);
      } else {
        setIsOrderProcessing(false);
        setOrderSuccess(false);
      }
    }
  };
  useEffect(() => {
    createFinalOrder();
  }, [params.get("status"), cartItems]);
  useEffect(() => {
    if (orderSuccess) {
      setTimeout(() => {
        router.push("/orders");
      }, 2000);
    }
  }, [orderSuccess]);
  if (isOrderProcessing)
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <PulseLoader color="#000" loading={isOrderProcessing} size={10} />
      </div>
    );
  if (orderSuccess)
    return (
      <div className="h-screen bg-gray-200">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mt-8 max-w-screen-xl px-4 sm:px-6 lg:px-8">
            <div className="bg-white shadow">
              <div className="px-4 py-6 sm:px-8 sm:py-10 flex flex-col gap-5">
                <h1 className="font-bold text-lg">
                  Your Payment Is Successful And You Will Be Redirected To
                  Orders Page In 2 Seconds
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  return (
    <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
      <div className="px-4 pt-8">
        <p className="font-medium text-xl">Cart Summary</p>
        <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-5">
          {cartItems && cartItems.length ? (
            cartItems.map((item) => (
              <div
                className="flex flex-col rounded-lg bg-white sm:flex-row"
                key={item._id}
              >
                <img
                  src={item.productId.imageUrl}
                  alt="cart-item"
                  className="rounded-md m-2 w-28 h-28 object-cover object-top"
                />
                <div className="flex w-full flex-col px-4 py-4">
                  <span className="font-bold">{item.productId.name}</span>
                  <div className="flex gap-2 mt-2">
                    <span
                      className={`font-semibold ${
                        item.productId.onSale === "yes" ? "line-through" : ""
                      }`}
                    >
                      EGP{item.productId.price}.00
                    </span>
                    {item.productId.onSale === "yes" && (
                      <span className="font-semibold text-red-700">
                        {`${(
                          item.productId.price -
                          (item.productId.priceDrop / 100) *
                            item.productId.price
                        ).toFixed(0)}`}
                        .00
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div>Your Shopping Cart Is Empty.</div>
          )}
        </div>
      </div>
      <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
        <p className="text-xl font-medium">Shipping Address Details</p>
        <p className="text-gray-400 font-bold">
          Complete Your Order By Selecting Address Below
        </p>
        <div className="w-full mt-6 mx-0 mb-0 space-y-6">
          {addresses && addresses.length ? (
            addresses.map((address) => (
              <div
                key={address._id}
                className={`border p-6 ${
                  address._id === selectedAddress ? "border-red-900" : ""
                }`}
                onClick={() => handleSelectedAddress(address)}
              >
                <p>Name: {address.fullName}</p>
                <p>City: {address.city}</p>
                <p>Country: {address.country}</p>
                <p>Postal Code: {address.postalCode}</p>
                <p>Address: {address.address}</p>
                <button className="mt-5 mr-5 inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide text-center">
                  {address._id === selectedAddress
                    ? "Selected Address"
                    : "Select Address"}
                </button>
              </div>
            ))
          ) : (
            <p>No Addresses Added</p>
          )}
        </div>
        <Link
          href="/profile"
          className="mt-5 mr-5 inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide text-center"
        >
          Add New Address
        </Link>
        <div className="my-6 border-t border-b py-2">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-900">Subtotal:</p>
            <p className="text-sm font-bold">
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
            <p className="text-sm font-medium text-gray-900">Shipping:</p>
            <p className="text-sm font-bold">EGP0.00</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-900">Total:</p>
            <p className="text-sm font-bold">
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
          <div className="pb-5">
            <button
              disabled={
                (cartItems && cartItems.length === 0) ||
                Object.keys(checkoutFormData.shippingAddress).length === 0
              }
              onClick={handleCheckout}
              className="mt-5 w-full inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide text-center disabled:opacity-50"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
