import React from "react";

interface InputFieldProps {
  type: string;
  label: string;
  name: string;
  placeholder?: string;
  className?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  type,
  label,
  name,
  placeholder = "",
  className = "",
  value,
  onChange,
}) => {
  return (
    <div className="w-full p-3 flex flex-col rounded-lg">
      <label htmlFor="inputField" className="text-md font-semibold mb-1">
        {label}
      </label>
      {type === "textarea" ? (
        <textarea
          id="inputField"
          value={value}
          rows={6}
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          className={`rounded-md border-2 border-borderGray p-2 bg-gray-50 hover:bg-white focus:border-opacity-70 focus:drop-shadow-md focus:outline-none ${className}`}
        />
      ) : (
        <input
          id="inputField"
          type={type}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          className={`rounded-md border-2 border-borderGray p-2 bg-gray-50 hover:bg-white focus:border-primary focus:border-opacity-70 focus:drop-shadow-md focus:outline-none ${className}`}
          min={1}
        />
      )}
    </div>
  );
};

export default InputField;
