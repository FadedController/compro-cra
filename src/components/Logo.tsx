import React from "react";

interface LogoProps {
  className?: string;
  height: number;
  onClick?: () => void;
}

const Logo: React.FC<LogoProps> = ({ className, onClick, height }) => {
  const width = (2346 / 537) * height;

  return (
    <div className={className} onClick={onClick}>
      <img loading="eager" src="brand/logo.png" height={height} width={width} />
    </div>
  );
};

export default Logo;
