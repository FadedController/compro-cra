import React from "react";

interface buttonInterface {
  onClick?: () => void;
  normalWidth?: boolean;
  dark?: boolean;
}

const Button: React.FC<buttonInterface> = ({
  onClick,
  children,
  normalWidth,
  dark,
}) => {
  return (
    <button
      onClick={onClick}
      className={`${
        dark ? "bg-darkBlue" : "bg-lightBlue"
      } transform hover:scale-105 transition-transform ${
        normalWidth ? "px-8" : "w-full"
      } rounded-full py-2`}
    >
      <span className="text-white text-xl font-bold">{children}</span>
    </button>
  );
};

export default Button;
