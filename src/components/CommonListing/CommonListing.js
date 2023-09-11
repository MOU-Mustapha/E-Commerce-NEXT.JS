"use client";
import React, { useEffect } from "react";
import ProductTile from "./ProductTile/ProductTile";
import ProductButtons from "./ProductButtons/ProductButtons";
import { useRouter } from "next/navigation";
import Notification from "../Notification";

const CommonListing = ({ data }) => {
  const router = useRouter();
  useEffect(() => {
    router.refresh();
  }, []);
  return (
    <section className="bg-white py-12">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {data && data.length
            ? data.map((item) => (
                <article
                  className="relative flex flex-col overflow-hidden border cursor-pointer"
                  key={item._id}
                >
                  <ProductTile item={item} />
                  <ProductButtons item={item} />
                </article>
              ))
            : null}
        </div>
      </div>
      <Notification />
    </section>
  );
};

export default CommonListing;
