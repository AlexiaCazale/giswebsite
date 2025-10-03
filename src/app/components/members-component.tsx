import Masonry from "@/components/Masonry";
import PixelTransition from "@/components/PixelTransition";
import Image from "next/image";
import React from "react";
import SlideComponent from "./slide-component";

export const membersList = [
  {
    id: 0,
    name: "Letícia Garcia",
    description: "Estudante",
    imgUrl: "/members/leticia.jpeg",
  },
  {
    id: 1,
    name: "Aléxia Cazale",
    description: "Estudante",
    imgUrl: "/members/alexia.jpeg",
  },
  {
    id: 2,
    name: "Julia Mazoti",
    description: "Estudante",
    imgUrl: "/members/julia.jpeg",
  },
  {
    id: 3,
    name: "Geovana Cristina",
    description: "Estudante",
    imgUrl: "/members/geovana.jpeg",
  },
  {
    id: 4,
    name: "Evelyn Cassinotte",
    description: "Estudante",
    imgUrl: "/members/evelyn.jpeg",
  },
  {
    id: 5,
    name: "Rayssa Maely",
    description: "Estudante",
    imgUrl: "/members/rayssa.jpeg",
  },
  {
    id: 6,
    name: "Yasmin Sanchez",
    description: "Estudante",
    imgUrl: "/members/yasmin.jpeg",
  },
  {
    id: 7,
    name: "Brenda Ananias",
    description: "Estudante",
    imgUrl: "/members/brenda.jpeg",
  },
  {
    id: 8,
    name: "Arthur Henrique",
    description: "Estudante",
    imgUrl: "/members/arthur.jpeg",
  },
  {
    id: 9,
    name: "Jorge Guilherme",
    description: "Estudante",
    imgUrl: "/members/jorge.jpeg",
  },
];

export default function Member() {
  return (
    <React.Fragment>
      <div className="flex bg-[#f2e4db] w-[100%] h-[100%] xl:w-screen p-[30px] md:px-16">
        <div className="hidden md:flex relative h-screen w-1/3">
          <Image
            src={"/floral-9190055.svg"}
            alt="flower"
            fill
            className="h-[100%]"
            priority
          />
        </div>
        <div className="flex flex-col w-2/3 justify-center gap-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-center md:text-start">Membros</h1>
            <p className="mb-3">
              Conheça o rosto de cada um que contribuiu com esse projeto.
            </p>
          </div>

          <div className="flex flex-col gap-10">
            <div className="flex items-center gap-10">
              <div className="bg-[#a45944] rounded-full p-1">
                <Image
                  src={"/members/cida.jpeg"}
                  alt={"Profª Cida Zem"}
                  width={150}
                  height={150}
                  className="rounded-[50%] w-[250px] h-[250px] object-cover  border-l-8 border-[#a45944]"
                />
              </div>
              <div className="flex-col">

              <p className="mt-2 font-bold">Profª Dra. Aparecia Zem Lopes</p>
              <span className="text-sm">Nossa orientadora</span>
              </div>
            </div>
            <SlideComponent slides={membersList} />
          </div>
        </div>
      </div>
      {/* </div> */}
    </React.Fragment>
  );
}
