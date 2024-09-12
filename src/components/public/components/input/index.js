import React from "react";

const Input = ({ type, placeholder, className, label, id, ...rest }) => {
  if (label) {
    return (
      <div className="mb-2">
        <label className="block text-sm lg:text-lg font-medium mb-2 text-white" htmlFor={id}>
          {label}
        </label>
        <input
          type={type}
          placeholder={placeholder}
          id={id}
          className={`${className} w-full p-2 border border-white rounded-md bg-dark text-white`}
          {...rest}
        />
      </div>
    );
  }
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`${className} w-full px-7 py-4 border rounded-full focus:ring-2 focus:ring-branded-blue placeholder:text-[#7F7F7F] placeholder:text-xs text-xs border-none`}
      {...rest}
    />
  );
};

export default Input;
