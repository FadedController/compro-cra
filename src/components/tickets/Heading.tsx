import React from "react";

interface headingProps {
  white?: boolean;
}

const Heading: React.FC<headingProps> = ({ children, white }) => {
  return (
    <h1
      className={`text-4xl font-extrabold font-poppins ${
        white ? "text-white" : "text-darkBlue"
      }`}
    >
      {children}
    </h1>
  );
};

export default Heading;
