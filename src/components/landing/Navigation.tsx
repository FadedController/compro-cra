import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Logo } from "../tickets";
import ContentWrapper from "./ContentWrapper";
import NavLink from "./NavLink";

export type sections =
  | "inicio"
  | "nosotros"
  | "comercializadora"
  | "distribucion"
  | "contacto"
  | string;

const Navigation: React.FC = () => {
  const [currentSection, setCurrentSection] = useState<sections>("inicio");

  // Set current section
  useEffect(() => {
    const sections = document.querySelectorAll("section");

    window.addEventListener("scroll", () => {
      sections.forEach((section) => {
        const sectionId = section.getAttribute("id");
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (window.pageYOffset >= sectionTop - sectionHeight / 4) {
          setCurrentSection(sectionId || currentSection);
        }
      });
    });
  }, [currentSection]);

  return (
    <nav className="bg-darkBlue sticky top-0">
      <ContentWrapper className="p-4">
        <ul className="flex space-x-4 items-center justify-center font-bold text-white text-xl">
          <li className="flex-1">
            <Logo white height={50} />
          </li>
          <NavLink sectionId="inicio" currentSection={currentSection}>
            Inicio
          </NavLink>
          <NavLink sectionId="nosotros" currentSection={currentSection}>
            Nosotros
          </NavLink>
        </ul>
      </ContentWrapper>
    </nav>
  );
};

export default Navigation;
