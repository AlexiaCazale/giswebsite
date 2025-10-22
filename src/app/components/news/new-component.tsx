"use client";

import * as React from "react"; // Esta é a linha corrigida
import Image from "next/image";
import Link from "next/link"; // Importe o Link

// Dados Fictícios (Mock)
const mockNewsData = [
  {
    id: "1",
    imageSrc: "/images/noticia-ciencia.jpg",
    linkUrl: "/noticias/mulheres-na-ciencia",
  },
  {
    id: "2",
    imageSrc: "/images/noticia-etecs.jpg",
    linkUrl: "/noticias/etecs-e-fatecs",
  },
  {
    id: "3",
    imageSrc: "/images/noticia-tomates.jpg",
    linkUrl: "/noticias/professores-fatec-jahu",
  },
];

export default function NewsPage() {
  return (
    <React.Fragment>
      <div
        className="flex flex-col bg-[#FDF9FA] min-h-screen w-full p-8 md:p-16 items-center"
        id="noticias"
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">Notícias</h1>
          <p className="text-center md:text-start">Saiba onde foi nossa última aparição.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
          {mockNewsData.map((news) => (
            <div
              key={news.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200/80 flex flex-col"
            >
              <div className="relative w-full aspect-[4/3]">
                <Image
                  src={news.imageSrc}
                  alt={`Notícia ${news.id}`}
                  layout="fill"
                  objectFit="cover"
                />
              </div>

              <div className="p-6 flex justify-center mt-auto">
                <Link
                  href={news.linkUrl}
                  className="
                    py-2 px-10 rounded-lg text-white font-semibold 
                    bg-gradient-to-r from-[#D6438F] to-[#8E67A1] 
                    shadow-md transition-all hover:opacity-90
                  "
                >
                  ACESSAR
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
}