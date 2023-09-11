import React from "react";

const Input = ({ label, placeholder, type, value, onChange }) => {
  return (
    <div className="relative">
      <p className="bg-white pt-0 px-2 pb-0 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute">
        {label}
      </p>
      <input
        name=""
        type={type || "text"}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="border placeholder:gray-400 focus:outline-none focus:border-black w-full p-4 mx-0 mt-0 text-base block bg-white border-gray-300 rounded-md"
      />
    </div>
  );
};

export default Input;
