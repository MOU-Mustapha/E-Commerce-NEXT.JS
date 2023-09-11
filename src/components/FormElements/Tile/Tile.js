import React from "react";

const Tile = ({ data, selected = [], onClick }) => {
  if (data && data.length)
    return (
      <div className="mt-3 flex flex-wrap items-center gap-1">
        {data.map((item) => (
          <label
            onClick={() => onClick(item)}
            key={item.id}
            className="cursor-pointer"
          >
            <span
              className={`rounded-lg border border-black px-6 py-2 w-full h-full font-bold ${
                selected &&
                selected.length &&
                selected.map((el) => el.id).indexOf(item.id) !== -1
                  ? "text-white bg-black"
                  : ""
              }`}
            >
              {item.label}
            </span>
          </label>
        ))}
      </div>
    );
};

export default Tile;
