import React from "react";

interface LogoProps {
  white?: boolean;
  className?: string;
  height: number;
  onClick?: () => void;
}

const Logo: React.FC<LogoProps> = ({ className, onClick, height, white }) => {
  const width = (2346 / 537) * height;
  const src = white ? "/brand/white_logo.png" : "/brand/blue_logo.png";

  return (
    <div className={className} onClick={onClick}>
      <img
        loading="eager"
        src={src}
        alt="Compro logo"
        height={height}
        width={width}
      />
    </div>
  );
};

export default Logo;
