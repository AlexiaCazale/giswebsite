import PixelCard from "@/components/PixelCard";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Projects() {
  const data = [
    {
      id: 0,
      name: "Inteligência Artificial",
      description:
        "Projeto de apresentação realizado pela profª Cida Zem para os alunos da escola EMI Ana Franco, durante um bate-papo sobre inteligência artificial, tecnologia na educação, inclusão e a importância das mulheres na tecnologia.",
      src: "/projects/ia-capa.jpeg",
      alt: "Projeto 1",
    },
    {
      id: 1,
      name: "Girassol Arduino",
      description:
        "Projeto de Arduino desenvolvido pelos alunos do grupo de pesquisa Girls in STEM, apresentado durante o evento Fatec de Portas Abertas em 2024 e também para os estudantes da escola EMI Ana Franco, com a orientação dos professores Josiane e Felipe.",
      src: "/projects/girassolCapa.jpeg",
      alt: "Projeto 2",
    },
    {
      id: 2,
      name: "Girassol Arduino",
      description:
        "Projeto de Arduino desenvolvido pelos alunos do grupo de pesquisa Girls in STEM, apresentado durante o evento Fatec de Portas Abertas em 2024 e também para os estudantes da escola EMI Ana Franco, com a orientação dos professores Josiane e Felipe.",
      src: "/projects/girassolCapa.jpeg",
      alt: "Projeto 2",
    },
  ];
  return (
    <React.Fragment>
      <div className="flex bg-[#2f3e43] justify-between h-[100%] w-[100%] lg:h-screen lg:w-screen p-[30px] md:px-16">
        <div className="flex flex-col w-[100%] justify-center gap-4">
          <h1 className="text-[#f4f0e5] text-center md:text-start">Projetos</h1>

          <div
            className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))]
        
          gap-6 justify-items-center"
          >
            {data.map((e) => (
              <Link href={`/projeto/${e.id}`} key={e.id}>
                <PixelCard variant="blue">
                  <Image
                    src={e.src}
                    alt={e.alt}
                    fill
                    className="flex object-cover"
                    priority
                  />
                </PixelCard>
              </Link>
            ))}
          </div>
        </div>
        <div className="hidden md:flex relative h-screen w-1/2">
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
