"use client";

import { useState } from "react";
import { FaBars } from "react-icons/fa";

export default function HeaderComponent() {
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  const menuItems = [
    { label: "Home", ariaLabel: "Go to home page", link: "/" },
    { label: "About", ariaLabel: "Learn about us", link: "/about" },
    { label: "Services", ariaLabel: "View our services", link: "/services" },
    { label: "Contact", ariaLabel: "Get in touch", link: "/contact" },
  ];

  let hover =
    "border-b-2 border-transparent hover:border-[#000000] active:border-[#000000] transition-colors duration-300";

  return (
    <aside className="flex justify-between items-center bg-white px-6 py-5 text-black uppercase font-bold fixed top-0 left-0 w-full z-10 font-arya">
      <div className="flex items-center gap-2">
        <span className="font-black">{"< Girls in STEM /> "}</span>
      </div>

      <nav
        className={`md:flex ${
          openMenu
            ? "flex-col absolute items-center top-[60px] h-[100vh] left-0 w-[100%] bg-gradient-to-r bg-white text-black p-2"
            : "hidden"
        } flex list-none justify-normal items-right gap-[30px]`}
      >
        <li className={hover}>
          <a href="#about">Sobre</a>
        </li>
        <li className={hover}>
          <a href="#fatec-jahu">Fatec Jahu</a>
        </li>
        <li className={hover}>
          <a href="#projetos">Projetos</a>
        </li>
        <li className={hover}>
          <a href="#noticias">Notícias</a>
        </li>
        <li className={hover}>
          <a href="#resultados">Resultados</a>
        </li>
        <li className={hover}>
          <a href="#membros">Membros</a>
        </li>
        <li className={hover}>
          <a href="#contato">Contato</a>
        </li>
      </nav>

      <button
        className="block md:hidden"
        onClick={() => setOpenMenu(!openMenu)}
      >
        <FaBars />
      </button>
    </aside>
  );
}
