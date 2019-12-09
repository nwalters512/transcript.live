import React from "react";
import classnames from "classnames";

interface IButtonProps {
  className?: string;
  rounded?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const Button = ({
  className = null,
  rounded = false,
  onClick,
  children
}: IButtonProps) => (
  <button
    onClick={onClick}
    className={classnames(
      className,
      "bg-blue-700 text-white py-2 px-4 focus:outline-none focus:shadow-outline",
      {
        rounded: !rounded,
        "rounded-full": rounded
      }
    )}
  >
    {children}
  </button>
);

export default Button;
