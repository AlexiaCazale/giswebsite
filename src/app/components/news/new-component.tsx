"use client";

import * as React from "react"; // Esta é a linha corrigida
import Image from "next/image";
import Link from "next/link"; // Importe o Link
import SlideComponentNews from "./slider-news-component";

// Dados Fictícios (Mock)
// new-component.jsx - Exemplo com mais dados

export const mockNewsData = [
  {
    id: "1",
    imgUrl: "/news/mulheresnaciencia.png",
    alt: "Mulheres na Ciência",
    linkUrl: "/noticias/mulheres-na-ciencia",
  },
  {
    id: "2",
    imgUrl: "/news/Mulheres-Cientistas.png",
    alt: "ETECs e FATECs",
    linkUrl: "/noticias/etecs-e-fatecs",
  },
  {
    id: "3",
    imgUrl: "/news/tomates.png",
    alt: "Professores FATEC Jahu",
    linkUrl: "/noticias/professores-fatec-jahu",
  },
  {
    id: "4", // NOVO
    imgUrl: "/news/noticia-exemplo-4.jpg",
    alt: "Exemplo Notícia 4",
    linkUrl: "/noticias/exemplo-4",
  },
  {
    id: "5", // NOVO
    imgUrl: "/news/noticia-exemplo-5.jpg",
    alt: "Exemplo Notícia 5",
    linkUrl: "/noticias/exemplo-5",
  },
];

export default function NewsPage() {
  return (
    <React.Fragment>
      <div
        className="relative flex flex-col min-h-screen w-full p-8 md:p-16 justify-center items-center bg-[#3f485c]"
        id="noticias"
      >
        <div className="absolute inset-0 bg-black/20 z-0" />

        <div className="flex flex-col relative text-center mb-12 gap-2">
          <h1 className="text-4xl font-bold text-white">Notícias</h1>
          <p className="text-center text-white md:text-start">Saiba onde foi nossa última aparição.</p>
        </div>


        <SlideComponentNews />

      </div>
    </React.Fragment>
  );
}