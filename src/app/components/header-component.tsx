"use client";

import Link from "next/link";
import { useState } from "react";
import { FaBars } from "react-icons/fa";

export default function HeaderComponent() {
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    const href = e.currentTarget.href;
    const targetId = href.replace(/.*\#/, "");
    const elem = document.getElementById(targetId);

    if (elem) {
      const windowHeight = window.innerHeight;
      const elementRect = elem.getBoundingClientRect();
      const elementHeight = elementRect.height;
      const scrollY = window.scrollY || window.pageYOffset;
      const elementTopAbsolute = elementRect.top + scrollY;
      let offsetPosition = elementTopAbsolute - (windowHeight / 2) + (elementHeight / 2);

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      setOpenMenu(false);
    }
  };
  let hover =
    "border-b-2 border-transparent hover:border-[#000000] active:border-[#000000] transition-colors duration-300 cursor-pointer";

  const links = [
    { href: "#about", label: "Sobre" },
    { href: "#fatec-jahu", label: "Fatec Jahu" },
    { href: "#projetos", label: "Projetos" },
    { href: "#noticias", label: "Notícias" },
    { href: "#resultados", label: "Resultados" },
    { href: "#membros", label: "Membros" },
    { href: "#contato", label: "Contato" },
  ];

  return (
    <aside className="flex justify-between items-center bg-white px-6 py-5 text-black uppercase font-bold fixed top-0 left-0 w-full z-50 font-arya shadow-sm">
      <div className="flex items-center gap-2">
        <span className="font-black">{"< Girls in STEM /> "}</span>
      </div>

      <nav
        className={`lg:flex ${openMenu
            ? "flex-col absolute items-center top-[60px] h-[100vh] left-0 w-[100%] bg-gradient-to-r bg-white text-black p-2"
            : "hidden"
          } flex list-none justify-normal items-right gap-[30px] `}
      >
        {links.map((link) => (
          <li key={link.href} className={hover}>
            <Link href={link.href} onClick={handleScroll}>
              {link.label}
            </Link>
          </li>
        ))}
      </nav>

      <button
        className="block lg:hidden text-2xl"
        onClick={() => setOpenMenu(!openMenu)}
      >
        <FaBars />
      </button>
    </aside>
  );
}