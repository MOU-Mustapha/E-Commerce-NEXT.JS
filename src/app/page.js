"use client";
import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { GlobalContext } from "../context/context";
import { getAllUserProducts } from "../services/user/product";
import { PulseLoader } from "react-spinners";

const page = () => {
  const { pageLoader, setPageLoader } = useContext(GlobalContext);
  const [products, setProducts] = useState([]);
  const allProducts = async () => {
    setPageLoader(true);
    const res = await getAllUserProducts();
    if (res.success) {
      setProducts(res.data);
      setPageLoader(false);
    } else {
      setPageLoader(false);
    }
  };
  useEffect(() => {
    allProducts();
  }, []);
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-16">
      <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div className="mr-auto place-self-center lg:col-span-7">
          <div className="flex flex-col items-center">
            <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-4xl lg:text-6xl">
              Best Fashion Collection
            </h1>
            <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl text-center">
              Quisquemos sodales suscipit tortor ditaemcos condimentum de cosmo
              lacus meleifend menean diverra loremous.
            </p>
            <Link
              href="/product/listing/all-products"
              className="mt-1.5 inline-block px-5 py-3 text-xs font-medium uppercase tracking-wide text-white bg-black"
            >
              Shop Collection
            </Link>
          </div>
        </div>
        <div className="hidden lg:flex lg:mt-0 lg:col-span-5">
          <img
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
            alt="header"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      {pageLoader ? (
        <PulseLoader color="#000" loading={pageLoader} size={10} />
      ) : (
        <div className="max-w-screen-xl px-4 py-8 mx-auto sm:py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:items-stretch">
            <div className="grid p-6 bg-gray-100 rounded place-content-center sm:p-8">
              <div className="max-w-md mx-auto text-center lg:text-left">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
                    Summer Sale Collection
                  </h2>
                </div>
                <Link
                  href="/product/listing/all-products"
                  className="mt-1.5 inline-block px-5 py-3 text-xs font-medium uppercase tracking-wide text-white bg-black"
                >
                  Shop All
                </Link>
              </div>
            </div>
            <div className="lg:col-span-2">
              <ul className="grid grid-cols-2 gap-8">
                {products && products.length
                  ? products
                      .filter((product) => product.onSale === "yes")
                      .slice(0, 2)
                      .map((product) => (
                        <li key={product._id} className="product-hover-home">
                          <Link href={`/product/${product._id}`}>
                            <div>
                              <img
                                src={product.imageUrl}
                                alt="product-img"
                                className="rounded w-full object-cover aspect-square object-top"
                              />
                            </div>
                            <div className="mt-3">
                              <h3 className="font-medium text-gray-900">
                                {product.name}
                              </h3>
                              <p className="mt-1 text-sm text-gray-800">
                                EGP{product.price}.00{" "}
                                <span className="text-red-700">{`(-${product.priceDrop}%) Off`}</span>
                              </p>
                            </div>
                          </Link>
                        </li>
                      ))
                  : null}
              </ul>
            </div>
          </div>
        </div>
      )}
      <div className="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 lg:px-8 sm:py-12">
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-950 sm:text-3xl uppercase">
            Shop by Category
          </h2>
        </div>
        <ul className="grid grid-cols-1 gap-4 mt-8 lg:grid-cols-3">
          <li>
            <div className="relative block group cat-hover">
              <img
                src="/images/kidsCat.jpg"
                alt="category-prod"
                className="object-cover w-full aspect-square"
              />
              <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                <h3 className="text-xl font-medium text-white uppercase">
                  Kids
                </h3>
                <Link
                  href="/product/listing/kids"
                  className="mt-1.5 inline-block px-5 py-3 text-xs font-medium uppercase tracking-wide text-white bg-black"
                >
                  Shop Now
                </Link>
              </div>
            </div>
          </li>
          <li>
            <div className="relative block group cat-hover">
              <img
                src="/images/womenCat.jpg"
                alt="category-prod"
                className="object-cover w-full aspect-square"
              />
              <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                <h3 className="text-xl font-medium text-white uppercase">
                  Women
                </h3>
                <Link
                  href="/product/listing/women"
                  className="mt-1.5 inline-block px-5 py-3 text-xs font-medium uppercase tracking-wide text-white bg-black"
                >
                  Shop Now
                </Link>
              </div>
            </div>
          </li>
          <li className="lg:col-span-2 lg:col-start-2 lg:row-span-2 lg:row-start-1">
            <div className="relative block group cat-hover">
              <img
                src="/images/menCat.jpg"
                alt="category-prod"
                className="object-cover w-full aspect-square"
              />
              <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                <h3 className="text-xl font-medium text-white uppercase">
                  Men
                </h3>
                <Link
                  href="/product/listing/men"
                  className="mt-1.5 inline-block px-5 py-3 text-xs font-medium uppercase tracking-wide text-white bg-black"
                >
                  Shop Now
                </Link>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default page;
