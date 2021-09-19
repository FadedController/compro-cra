import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Logo } from ".";

interface navbarProps {
  logout: () => void;
}

const Navbar: React.FC<navbarProps> = ({ logout }) => {
  const [state, setState] = useState(false);

  const close = () => setState(false);
  const toggle = () => setState((s) => !s);

  return (
    <>
      <div className="bg-darkBlue flex sticky">
        <div className="flex justify-between w-full my-4 mx-4">
          <Link to="/app/user" onClick={close}>
            <Logo height={40} white />
          </Link>
          <div>
            <span
              className={`material-icons text-white text-4xl mr-2 transition-opacity ${
                state ? "opacity-100 cursor-pointer" : "opacity-0"
              }`}
              onClick={close}
            >
              close
            </span>
            <span
              className="material-icons cursor-pointer text-white text-4xl mr-2"
              onClick={toggle}
            >
              menu
            </span>
          </div>
        </div>
      </div>
      <div
        className={`bg-darkBlue transition-all flex flex-col space-y-3 overflow-hidden sticky px-6 ${
          state ? "h-60 py-4" : "h-0 py-0"
        }`}
      >
        <Link to="/app/user" onClick={close}>
          <h1 className="text-2xl text-white font-bold">Inicio</h1>
        </Link>
        <Link to="/app/user/history" onClick={close}>
          <h1 className="text-2xl text-white font-bold">Historial</h1>
        </Link>
        <Link to="/app/user/new" onClick={close}>
          <h1 className="text-2xl text-white font-bold">Nuevo ticket</h1>
        </Link>
        <button className="flex" onClick={logout}>
          <h1 className="text-2xl text-white font-bold">Cerrar sesión</h1>
        </button>
      </div>
    </>
  );
};

export default Navbar;
