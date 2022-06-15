import React from "react";

const FormInput = ({
  label = "",
  name = "",
  placeholder = "",
  handleChange,
  value = "",
  touched = "",
    errors = "",
  type = "text"
}) => {
  const borderColor =
    touched[name] && errors[name] ? "border-red-300" : touched[name] && !errors[name] ? "border-green-300": "border-gray-300";
  return (
    <div>
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-medium text-gray-900 "
      >
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        className={`bg-gray-50 border-2 ${borderColor} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 `}
        placeholder={placeholder}
        onChange={handleChange}
        value={value}
      />
      {touched[name] && errors[name] ? (
        <p className="mt-2 text-sm text-red-600 ">
          {errors[name]}
        </p>
      ) : null}
    </div>
  );
};

export default FormInput;
