import React from "react";

interface contentWrapperProps {
  className?: string;
}

const ContentWrapper: React.FC<contentWrapperProps> = ({
  className,
  children,
}) => {
  return (
    <div className="flex items-center justify-center w-full">
      <div className={`${className} w-full max-w-7xl`}>{children}</div>
    </div>
  );
};

export default ContentWrapper;
