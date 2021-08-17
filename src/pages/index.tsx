import React, { useState } from "react";
import { Logo } from "../components";
import axios from "axios";

// Refactoring test commit

const Home: React.FC = () => {
  const [isDevMode, setIsDevMode] = useState<boolean>();
  const [count, setCount] = useState(0);
  const [password, setPassword] = useState("");
  const [inputMode, setInputMode] = useState(true);

  const handleClick = () => setInputMode(!inputMode);
  const handleSubmit = async (password: string) => {
    if (password) {
      const link = `/api/${password}.json`;
      try {
        const { data } = await axios.get(link);
        if (data.isAllowed) {
          setIsDevMode(data.isAllowed);
        }
      } catch (err) {
        setCount(0);
      }
      setPassword("");
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSubmit(password);
  };
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setInputMode(true);
  };
  const incrementCount = () => {
    if (count >= 5) return setCount(0);
    setCount(count + 1);
  };

  return (
    <>
      {isDevMode ? (
        <div className="text-5xl font-poppins">THIS IS THE LANDING PAGE</div>
      ) : (
        <main>
          <section className="flex font-poppins flex-col items-center justify-center space-y-12 bg-gray-200 min-h-screen px-4 py-8">
            <Logo height={100} />
            <div className="max-w-md text-[#072F41]">
              <h1 className="text-2xl tracking-wide text-center font-semibold">
                Estamos trabajando para brindarte la mejor experiencia
              </h1>
            </div>
            <a
              href="#contact"
              className="h-12 w-12 transform transition-all hover:-translate-y-1 cursor-pointer bg-[#65A2CF] hover:bg-[#38729c] rounded-full text-gray-50 shadow-md flex items-center justify-center"
            >
              <span className="material-icons transform rotate-90">
                arrow_forward_ios
              </span>
            </a>
          </section>
          <section
            className="flex flex-col items-center justify-center space-y-12 bg-[#072F41] min-h-screen px-4 py-8"
            id="contact"
          >
            <div className="max-w-md w-full text-gray-50 flex flex-col space-y-9">
              <h1 className="text-4xl font-semibold text-center tracking-wide">
                Contáctanos
              </h1>
              <div className="flex flex-col space-y-3 text-xl">
                <div className="flex flex-1 items-center justify-center space-x-2">
                  <span className="material-icons">mail_outline</span>
                  <p>e.mora@comprov.com.mx</p>
                </div>
                <div className="flex space-x-6 items-center justify-center">
                  <div className="flex items-center justify-center space-x-2">
                    <span className="material-icons">phone</span>
                    <p>311 211 9655</p>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <span className="material-icons">phone</span>
                    <p>311 211 9574</p>
                  </div>
                </div>
              </div>
            </div>
            <a
              href="# "
              className="h-12 w-12 transform transition-all hover:-translate-y-1 cursor-pointer bg-gray-200 hover:bg-gray-300 rounded-full text-[#072F41] shadow-md flex items-center justify-center"
            >
              <span className="material-icons transform -rotate-90 mb-1">
                arrow_forward_ios
              </span>
            </a>
          </section>
          <section
            className="flex flex-col items-center justify-center space-y-12 bg-gray-200 min-h-screen px-4 py-8"
            id="access"
          >
            <img
              alt="Logo cuadrado"
              loading="eager"
              src="brand/square_logo.png"
              height={250}
              width={250}
              onClick={incrementCount}
            />

            <div
              className={`flex flex-col space-y-6 max-w-md w-full px-4 transition-all overflow-hidden ${
                count >= 5 ? "h-32" : "h-0"
              } `}
            >
              <div className="flex flex-col space-y-3 items-center justify-center">
                <h1 className="text-xl font-semibold text-center tracking-wide text-[#072F41]">
                  Ingreso a área en desarrollo
                </h1>
                <div className="flex px-2 text-[#65A2CF]">
                  <input
                    onKeyDown={handleKeyDown}
                    value={password}
                    onChange={handleOnChange}
                    type={inputMode ? "password" : "text"}
                    className="px-4 py-2 w-64 rounded-l-full border border-[#65A2CF]"
                    placeholder="Escribe aqui la contraseña"
                  />
                  <button
                    onClick={handleClick}
                    className={`px-4 rounded-r-full transition-colors border border-[#65A2CF] ${
                      inputMode
                        ? "bg-[#65A2CF] text-gray-50"
                        : "bg-gray-50 text-[#65A2CF]"
                    } `}
                  >
                    <span className="material-icons text-xl mt-1 mr-1">
                      visibility
                    </span>
                  </button>
                </div>
                {isDevMode === false && (
                  <div>
                    <p className="font-light text-[#072F41]">
                      Contraseña Incorrecta
                    </p>
                  </div>
                )}
              </div>
            </div>
          </section>
        </main>
      )}
    </>
  );
};

export default Home;
