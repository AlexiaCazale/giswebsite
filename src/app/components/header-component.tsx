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

  const socialItems = [
    { label: "Twitter", link: "https://twitter.com" },
    { label: "GitHub", link: "https://github.com" },
    { label: "LinkedIn", link: "https://linkedin.com" },
  ];

  return (
    // <div className="bg-white fixed w-full z-[9999] p-6 flex justify-between">
    //     <div>
    //         <p>Girls in STEM</p>
    //     </div>
    //     <div className="flex gap-6 list-none">
    //         <li>Sobre</li>
    //         <li>Fatec Jahu</li>
    //         <li>Resultados</li>
    //         <li>Projetos</li>
    //         <li>Membros</li>
    //         <li>Contato</li>
    //     </div>
    // </div>

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
        <li>Sobre</li>
        <li>Fatec Jahu</li>
        <li>Resultados</li>
        <li>Projetos</li>
        <li>Membros</li>
        <li>Contato</li>
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
