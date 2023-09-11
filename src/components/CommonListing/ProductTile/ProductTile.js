import Link from "next/link";
import React from "react";

const ProductTile = ({ item }) => {
  return (
    <Link href={`/product/${item._id}`}>
      <div className="overflow-hidden aspect-w-1 aspect-h-1 h-72">
        <img
          src={item.imageUrl}
          alt="product-image"
          className="product-hover object-cover"
        />
      </div>
      {item.onSale === "yes" ? (
        <div className="absolute top-0 m-2 rounded-full bg-black">
          <p className="rounded-full bg-black p-1 text-[8px] font-bold uppercase tracking-wide text-white sm:py-1 sm:px-3">
            Sale
          </p>
        </div>
      ) : null}
      <div className="my-4 flex flex-col items-center justify-between">
        <div className="mb-2 flex">
          <p
            className={`mr-3 text-sm font-semibold ${
              item.onSale === "yes" ? "line-through" : ""
            }`}
          >
            {`EGP${item.price}`}.00
          </p>
          {item.onSale === "yes" && (
            <p className="mr-3 text-sm font-semibold text-red-700">
              {`${(item.price - (item.priceDrop / 100) * item.price).toFixed(
                0
              )}`}
              .00
            </p>
          )}
          {item.onSale === "yes" && (
            <p className="mr-3 text-sm font-semibold">
              {`-${item.priceDrop}% Off`}
            </p>
          )}
        </div>
        <h3 className="mb-2 text-gray-400 text-sm">{item.name}</h3>
      </div>
    </Link>
  );
};

export default ProductTile;