import React from "react";

interface IProps {
  title: string | React.ReactNode;
  btnType?: "primary" | "outline";
  loading?: boolean;
  type?: "submit" | "button";
  className?: string;
  disabled?: boolean;
  color?: "text-white" | string;
  onClick?: () => void;
}

export const ApButton: React.FC<IProps> = ({
  title,
  type,
  className,
  loading,
  onClick,
  color,
  disabled,
  btnType = "primary",
}) => {
  const btnClassName = () => {
    switch (btnType) {
      case "outline":
        return `bg-white border border-primary text-primary`;
      default:
        return `bg-primary  text-white`;
    }
  };

  return (
    <button
      type={type}
      className={`text-sm uppercase rounded-lg cus-sm2:text-xs p-2 px-4 ${btnClassName()} ${color} ${
        disabled && "bg-gray-400"
      }  ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {loading ? <>loading...</> : title}
    </button>
  );
};
