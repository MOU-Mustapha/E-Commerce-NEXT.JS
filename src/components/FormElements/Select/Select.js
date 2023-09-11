import React from "react";

const Select = ({ label, value, onChange, options = [] }) => {
  return (
    <div className="relative">
      <p className="bg-white pt-0 px-2 pb-0 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute">
        {label}
      </p>
      <select
        value={value}
        onChange={onChange}
        className="border placeholder:gray-400 focus:outline-none focus:border-black w-full p-4 mx-0 mt-0 text-base block bg-white border-gray-300 rounded-md"
      >
        {options && options.length ? (
          options.map((option) => (
            <option id={option.id} value={option.id} key={option.id}>
              {option.label}
            </option>
          ))
        ) : (
          <option id="" value={""}>
            Select
          </option>
        )}
      </select>
    </div>
  );
};

export default Select;
