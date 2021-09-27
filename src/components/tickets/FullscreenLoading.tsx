import React from "react";

interface fullscreenLoadingProps {
  shown?: boolean;
}

const FullscreenLoading: React.FC<fullscreenLoadingProps> = ({ shown }) => {
  if (shown) {
    return (
      <div className="fixed z-50 top-0 right-0 left-0 bottom-0 bg-darkBlue flex items-center justify-center">
        <div className="spinner"></div>
      </div>
    );
  }
  return <div></div>;
};

export default FullscreenLoading;
