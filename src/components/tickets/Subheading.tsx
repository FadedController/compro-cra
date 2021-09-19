import React from "react";

interface subheadingProps {
  white?: boolean;
}

const Subheading: React.FC<subheadingProps> = ({ children, white }) => {
  return (
    <h3
      className={`font-poppins text-base font-normal ${
        white ? "text-white" : "text-lightBlue"
      }`}
    >
      {children}
    </h3>
  );
};

export default Subheading;
