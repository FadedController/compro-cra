import React from "react";

const Heading: React.FC = ({ children }) => {
  return (
    <h1 className="text-4xl font-extrabold font-poppins text-darkBlue">
      {children}
    </h1>
  );
};

export default Heading;
