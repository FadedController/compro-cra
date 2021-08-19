import React from "react";

const Subheading: React.FC = ({ children }) => {
  return (
    <h3 className="font-poppins text-base font-normal text-lightBlue">
      {children}
    </h3>
  );
};

export default Subheading;
