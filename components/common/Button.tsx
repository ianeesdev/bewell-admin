import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "outline" | "tertiary";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = "primary",
  size = "md",
  disabled = false,
  onClick,
  type = "button",
  ...rest
}) => {
  const baseClasses =
    "px-6 py-3 text-lg rounded-full font-medium transition-all duration-300 ease-in-out";
  let variantClasses: string;

  switch (variant) {
    case "primary":
      variantClasses = "bg-deepAqua text-white hover:bg-seaBlue";
      break;
    case "secondary":
      variantClasses = "bg-seaBlue text-white text-gray-700 hover:bg-deepAqua";
      break;
    case "outline":
      variantClasses =
        "border border-priamry text-deepAqua hover:bg-deepAqua hover:text-white";
      break;
    case "tertiary":
      variantClasses =
        "text-deepAqua font-semibold bg-[#1D6C861F] hover:bg-deepAqua hover:text-white rounded-full px-6 py-2";
      break;
    default:
      variantClasses = "";
  }

  const sizeClasses = `text-${size}`;
  const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "";

  const classes = `${baseClasses} ${variantClasses} ${sizeClasses} ${disabledClasses} ${className}`;

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={classes}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
