import React from "react";

interface InputFieldProps {
  type?: "text" | "email" | "password" | "file" | string;
  placeholder?: string;
  value?: string; // Make this optional
  className?: string;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  isTextArea?: boolean;
  rows?: number;
  accept?: string;
  multiple?: boolean;
  required?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  type = "text",
  placeholder,
  value,
  className,
  onChange,
  isTextArea = false,
  rows = 3, // Default rows for textarea
  accept,
  multiple = false,
  required = false,
  ...rest
}) => {
  const InputComponent = isTextArea ? "textarea" : "input";

  return (
    <InputComponent
      rows={isTextArea ? rows : undefined}
      type={type}
      placeholder={placeholder}
      value={type !== "file" ? value : undefined} // Only apply value if it's not a file input
      onChange={onChange}
      accept={type === "file" ? accept : undefined} // Apply accept only for file inputs
      multiple={type === "file" ? multiple : undefined} // Apply multiple only for file inputs
      required={required}
      className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 rounded-full w-full text-lg border border-gray-300 px-6 py-3 ${className}`}
      {...rest}
    />
  );
};

export default InputField;
