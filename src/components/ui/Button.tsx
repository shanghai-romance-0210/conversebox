import React from "react";

interface ButtonProps {
  onClick?: () => void;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary" | "outlined" | "text";
  className?: string;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  size = "md",
  variant = "primary",
  className,
  children,
}) => {
  const sizeClasses = {
    sm: "px-3.5 py-1.5 text-sm h-8",
    md: "px-4 py-2 text-base h-10",
    lg: "px-4.5 py-2.5 text-lg h-12",
  };

  const variantClasses = {
    primary: "bg-gray-800 text-white",
    secondary: "bg-gray-200 text-gray-800",
    outlined: "border border-gray-200 text-gray-800",
    text: "text-gray-800",
  };

  return (
    <button
      onClick={onClick}
      className={`${sizeClasses[size]} ${variantClasses[variant]} ${className} rounded-lg font-semibold active:scale-90 duration-200 select-none cursor-pointer`}
    >
      {children}
    </button>
  );
};

export default Button;