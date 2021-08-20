import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { sections } from "./Navigation";

interface navLinkProps {
  sectionId: sections;
  currentSection: sections;
}

const NavLink: React.FC<navLinkProps> = ({
  children,
  sectionId,
  currentSection,
}) => {
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    if (sectionId === currentSection) setIsSelected(true);
    if (sectionId !== currentSection) setIsSelected(false);
  }, [sectionId, currentSection]);

  return (
    <li className={`${isSelected ? "text-lightBlue" : "text-white"}`}>
      <a href={`#${sectionId}`}>{children}</a>
    </li>
  );
};

export default NavLink;
