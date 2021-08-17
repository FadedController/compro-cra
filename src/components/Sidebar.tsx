import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "./Logo";

interface sidebarProps {
  admin?: boolean;
  logout: () => void;
}

const Sidebar: React.FC<sidebarProps> = ({ admin, logout }) => {
  const { pathname } = useLocation();
  const [currentMenu, setCurrentMenu] = useState(
    pathname.replace("/app/admin", "")
  );

  useEffect(() => {
    setCurrentMenu(pathname.replace("/app/admin", ""));
  }, [pathname]);

  return (
    <nav className="flex flex-col space-y-28 items-center w-2/12 h-screen bg-darkBlue rounded-r-xl font-poppins py-12 px-8 2xl:px-12">
      <Logo height={50} white />
      {admin && (
        <div className="flex flex-col space-y-16 w-full">
          <div className="flex flex-col space-y-4">
            <p className="text-base text-lightBlue opacity-70">Menú</p>
            <ul className="flex flex-col space-y-4">
              <li>
                <Link
                  className={`flex items-center text-xl ${
                    currentMenu === "/" || !currentMenu
                      ? "opacity-90 font-bold"
                      : "opacity-80 font-light"
                  } text-white space-x-4 hover:pl-1 transition-all`}
                  to="/app/admin/"
                >
                  <span
                    className={`${
                      currentMenu === "/" || !currentMenu
                        ? "material-icons"
                        : "material-icons-outlined"
                    }`}
                  >
                    home
                  </span>
                  <p>Inicio</p>
                </Link>
              </li>
              <li>
                <Link
                  className={`flex items-center text-xl ${
                    currentMenu === "/pending"
                      ? "opacity-90 font-bold"
                      : "opacity-80 font-light"
                  } text-white space-x-4 hover:pl-1 transition-all`}
                  to="/app/admin/pending"
                >
                  <span
                    className={`${
                      currentMenu === "/pending"
                        ? "material-icons"
                        : "material-icons-outlined"
                    }`}
                  >
                    pending
                  </span>
                  <p>Pendientes</p>
                </Link>
              </li>
              <li>
                <Link
                  className={`flex items-center text-xl ${
                    currentMenu === "/history"
                      ? "opacity-90 font-bold"
                      : "opacity-80 font-light"
                  } text-white space-x-4 hover:pl-1 transition-all`}
                  to="/app/admin/history"
                >
                  <span className="material-icons-outlined">history</span>
                  <p>Historial</p>
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex flex-col space-y-4">
            <p className="text-base text-lightBlue opacity-70">Configuración</p>
            <ul className="flex flex-col space-y-4">
              <li>
                <Link
                  className={`flex items-center text-xl ${
                    currentMenu === "/account"
                      ? "opacity-90 font-bold"
                      : "opacity-80 font-light"
                  } text-white space-x-4 hover:pl-1 transition-all`}
                  to="/app/admin/account"
                >
                  <span
                    className={`${
                      currentMenu === "/account"
                        ? "material-icons"
                        : "material-icons-outlined"
                    }`}
                  >
                    person
                  </span>
                  <p>Mi Cuenta</p>
                </Link>
              </li>
              <li>
                <Link
                  className={`flex items-center text-xl ${
                    currentMenu === "/users"
                      ? "opacity-90 font-bold"
                      : "opacity-80 font-light"
                  } text-white space-x-4 hover:pl-1 transition-all`}
                  to="/app/admin/users"
                >
                  <span
                    className={`${
                      currentMenu === "/users"
                        ? "material-icons"
                        : "material-icons-outlined"
                    }`}
                  >
                    group
                  </span>
                  <p>Usuarios</p>
                </Link>
              </li>
              <li>
                <Link
                  className={`flex items-center text-xl ${
                    currentMenu === "/appearence"
                      ? "opacity-90 font-bold"
                      : "opacity-80 font-light"
                  } text-white space-x-4 hover:pl-1 transition-all`}
                  to="/app/admin/appearence"
                >
                  <span
                    className={`${
                      currentMenu === "/appearence"
                        ? "material-icons"
                        : "material-icons-outlined"
                    }`}
                  >
                    palette
                  </span>
                  <p>Apariencia</p>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
      <div className="h-full flex items-end w-full">
        <button
          onClick={logout}
          className="bg-lightBlue transform hover:scale-105 transition-transform w-full rounded-full py-2"
        >
          <span className="text-white opacity-80 text-xl font-bold">
            Cerrar sesión
          </span>
        </button>
      </div>
    </nav>
  );
};

export default Sidebar;
