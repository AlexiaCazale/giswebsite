import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Responsive from "./slide-component";
import SimpleSlider from "./slide-component";
import SlideComponent from "./slide-component";
import SlideComponentProjects from "./slide-component-projects";

const PixelCard = dynamic(() => import("@/components/PixelCard"), {
  ssr: false,
});

export const dataProjects = [
  {
    id: 0,
    name: "Inteligência Artificial",
    description:
      "Projeto de apresentação realizado pela profª Cida Zem para os alunos da escola EMI Ana Franco, durante um bate-papo sobre inteligência artificial, tecnologia na educação, inclusão e a importância das mulheres na tecnologia.",
    imgUrl: "/projects/ia-capa.jpeg",
    src: "/projects/ia-capa.jpeg",
    alt: "Projeto 1",
  },
  {
    id: 1,
    name: "Girassol Arduino",
    description:
      "Projeto de Arduino desenvolvido pelos alunos do grupo de pesquisa Girls in STEM, apresentado durante o evento Fatec de Portas Abertas em 2024 e também para os estudantes da escola EMI Ana Franco, com a orientação dos professores Josiane e Felipe.",
    imgUrl: "/projects/girassolCapa.jpeg",
    src: "/projects/girassolCapa.jpeg",
    alt: "Projeto 2",
  },
  {
    id: 2,
    name: "Girassol Arduino",
    description:
      "Projeto de Arduino desenvolvido pelos alunos do grupo de pesquisa Girls in STEM, apresentado durante o evento Fatec de Portas Abertas em 2024 e também para os estudantes da escola EMI Ana Franco, com a orientação dos professores Josiane e Felipe.",
    imgUrl: "/projects/girassolCapa.jpeg",
    src: "/projects/girassolCapa.jpeg",
    alt: "Projeto 2",
  },
  {
    id: 3,
    name: "Girassol Arduino",
    description:
      "Projeto de Arduino desenvolvido pelos alunos do grupo de pesquisa Girls in STEM, apresentado durante o evento Fatec de Portas Abertas em 2024 e também para os estudantes da escola EMI Ana Franco, com a orientação dos professores Josiane e Felipe.",
    imgUrl: "/projects/girassolCapa.jpeg",
    src: "/projects/girassolCapa.jpeg",
    alt: "Projeto 2",
  },
  {
    id: 4,
    name: "Girassol Arduino",
    description:
      "Projeto de Arduino desenvolvido pelos alunos do grupo de pesquisa Girls in STEM, apresentado durante o evento Fatec de Portas Abertas em 2024 e também para os estudantes da escola EMI Ana Franco, com a orientação dos professores Josiane e Felipe.",
    src: "/projects/girassolCapa.jpeg",
    imgUrl: "/projects/girassolCapa.jpeg",
    alt: "Projeto 2",
  },
];

export default function Projects() {
  return (
    <React.Fragment>
      <div className="flex bg-[#2f3e43] justify-between h-[100%] w-[100%] lg:h-screen lg:w-screen p-[30px] md:px-16">
        <div className="flex flex-col w-2/3 justify-center gap-6   text-[#f4f0e5]">
          <div>
            <h1 className=" text-center md:text-start">Projetos</h1>
            <p>Fique por dentro dos nossos projetos.</p>
          </div>
          <SlideComponentProjects />
        </div>
        <div className="hidden md:flex relative h-screen w-1/3">
          <Image
            src="/floral-9190052.svg"
            alt="flower"
            fill
            className="h-[100%]"
            priority
          />
        </div>
      </div>
    </React.Fragment>
  );
}
