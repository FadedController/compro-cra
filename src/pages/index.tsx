import React, { useState } from "react";
import { Logo } from "../components/tickets";
import axios from "axios";
import { Navigation } from "../components/landing";

// Refactoring test commit

const Home: React.FC = () => {
  const [isDevMode, setIsDevMode] = useState<boolean>(
    process.env.NODE_ENV === "development" ? true : false
  );
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
        <main className="font-poppins">
          <Navigation></Navigation>
          <section id="inicio">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Placeat
            aliquam voluptatibus quisquam possimus, nostrum eaque quos saepe
            suscipit voluptatum sunt optio! Harum repellendus molestiae deleniti
            corporis non aspernatur alias incidunt dolores ab, quas delectus
            accusamus eius libero voluptatem dolorum ad! Sint, nostrum quod!
            Odit quae laudantium tempora, possimus ratione praesentium quisquam
            exercitationem aliquid doloribus voluptate sapiente repudiandae
            eveniet, maiores dolorum ad omnis accusamus, quod ducimus ut sequi
            mollitia consequuntur? Asperiores magni aut culpa illo sit nobis
            optio quis. Dignissimos ut natus culpa cupiditate blanditiis
            perferendis quas velit error, beatae autem deleniti odio? Ipsum
            aliquid vero repellat quod ducimus veritatis commodi temporibus
            nulla eaque totam recusandae sit sequi ut sapiente amet, dolorum
            iure delectus doloribus minus magni. Blanditiis dicta excepturi
            minima at dolorem harum enim! Similique ducimus consequatur quidem
            cupiditate ipsa esse molestiae, molestias consectetur quo excepturi
            veniam quod iure recusandae, ratione, delectus voluptatem
            consequuntur vero magnam animi tempora sint sequi eaque ex nemo! Qui
            dolor asperiores repudiandae, corrupti ipsum quos eius tempora est,
            vero excepturi quidem numquam hic cum dolore. Laudantium, pariatur!
            Ea accusamus quibusdam, ullam eum, dignissimos minus eius, fugiat
            dolores voluptatem doloremque similique quod laudantium quae
            sapiente iusto sint eveniet soluta adipisci nesciunt praesentium
            ipsam temporibus et a aut. Sit atque obcaecati pariatur et hic
            aperiam! Rem maxime, similique ab dolor labore nesciunt ullam nobis
            autem eius ipsum beatae voluptas, culpa unde et rerum at optio
            facere blanditiis. Saepe, placeat. Fugit, rerum eveniet, consequatur
            quis cupiditate veniam saepe nemo minus, temporibus commodi eligendi
            aspernatur. Accusantium ad at omnis quasi dolores minima ipsam modi!
          </section>
          <section id="nosotros" className="bg-lightBlue">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatem
            fuga neque quis nam minus amet velit repudiandae numquam.
            Voluptatibus neque dolores deleniti, iste autem delectus optio
            provident repudiandae quibusdam quis dicta minima, ut necessitatibus
            voluptas. Itaque repudiandae, vero sint labore error totam quod nam.
            Enim voluptatum vitae modi quasi ea corporis ipsa ad perferendis.
            Deserunt expedita aperiam voluptatibus rem aut. Officiis in
            molestias placeat quasi, itaque eum id consequuntur neque, expedita
            suscipit incidunt. Laborum, repudiandae distinctio nostrum atque
            iure consectetur sed odio, veniam delectus asperiores tenetur
            aspernatur? Quisquam quam deleniti maiores. Explicabo et, hic
            officiis modi ab illo nostrum debitis doloribus velit rerum deserunt
            repudiandae rem quae optio ipsa molestiae earum ullam, suscipit
            natus. Assumenda saepe neque odit porro totam sit delectus
            similique, voluptatibus blanditiis ex quasi ipsam debitis, sapiente
            necessitatibus minus modi numquam, ea rerum officia cumque optio
            beatae! Nam voluptatem minima natus temporibus dolorum unde
            provident ab assumenda explicabo enim possimus eum fuga vitae,
            perferendis perspiciatis neque sequi id nihil, quis excepturi nemo
            atque. Accusantium non pariatur enim ipsam beatae dolores officia
            quod ratione optio? Ea explicabo, debitis beatae totam cumque optio,
            quia reiciendis similique minima assumenda saepe id temporibus
            architecto pariatur minus voluptatem! Iusto porro accusamus, hic
            dolor assumenda magnam omnis perspiciatis esse iure nihil molestiae
            perferendis laborum temporibus pariatur saepe, cumque aspernatur.
            Cumque voluptatum saepe ipsum accusamus! Fugit aliquid eveniet atque
            est corporis rem praesentium harum? Tenetur neque obcaecati in
            aspernatur veniam, totam ea corporis dignissimos expedita libero vel
            harum odit minus delectus ipsum veritatis autem illum ut aperiam
            doloribus ipsa!
          </section>
        </main>
      ) : (
        <main className="font-poppins">
          <section className="flex flex-col items-center justify-center space-y-12 bg-gray-200 min-h-screen px-4 py-8">
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
            {/* eslint-disable-next-line */}
            <a
              href="#"
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
