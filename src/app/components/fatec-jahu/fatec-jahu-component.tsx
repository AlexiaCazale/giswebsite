"use client";

import SpotlightCard from "@/components/SpotlightCard";
import StarBorder from "@/components/StarBorder";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useIsMobile } from "@/app/hooks/use-mobile";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

export default function FatecJahu() {
  const isMobile = useIsMobile();
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    // Define o estado inicial com base no tamanho da tela após a montagem do componente.
    // Em desktop (!isMobile), começa expandido. Em mobile, começa recolhido.
    setIsExpanded(!isMobile);
  }, [isMobile]);

  let data = [
    "Construção Naval",
    "Desenvolvimento de Software Multiplataforma",
    "Gestão da Tecnologia da Informação",
    "Logística",
    "Gestão da Produção Industrial",
    "Gestão Empresarial",
    "Meio Ambiente e Recursos Hídricos",
    "Sistemas Navais",
    "Sistemas para Internet",
  ];
  return (
    <React.Fragment>
      <div
        className="lg:flex md:flex-row flex-col h-[100%] lg-[h-100vh] bg-[#d1af65] xl:h-screen md:w-[100%] p-[30px] md:px-16"
        id="fatec-jahu"
      >
        <div className="hidden lg:flex relative h-screen md:w-[100%] lg:w-1/2">
          <Image
            src={"/flowers-9190054.svg"}
            alt="flower"
            fill
            className="h-[100%]"
            priority
          />
        </div>
        <div className="flex flex-col w-[100%] justify-center gap-4">
          <h1 className="text-center md:text-start">
            Fatec Jahu
          </h1>

          <div className="flex text-center md:text-start gap-6 flex-col items-center">
            <p>
              A FATEC Jahu é uma instituição pública de ensino superior em Jaú,
              São Paulo, que oferece cursos de graduação tecnológica. Parte do
              Sistema FATEC vinculado ao Centro Paula Souza, a faculdade
              integra teoria e prática, com laboratórios modernos e atividades
              extracurriculares, como palestras e parcerias com empresas. Com um
              corpo docente qualificado, a FATEC Jahu prepara os alunos para o
              mercado de trabalho, oferecendo uma formação prática e de
              qualidade em setores tecnológicos e empresariais.
            </p>

            {/* Botão visível apenas em mobile para expandir/recolher */}
            <div className="w-full md:hidden">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center justify-center w-full px-4 py-3 mt-2 bg-[#fff3c6] p-5 rounded-[1.5rem]"
              >
                <span>{isExpanded ? "Ocultar Cursos" : "Ver Cursos Oferecidos"}</span>
                {isExpanded ? <ExpandLess className="ml-2" /> : <ExpandMore className="ml-2" />}
              </button>
            </div>

            {/* Contêiner expansível para a lista de cursos */}
            <div
              className={`w-full transition-all duration-500 ease-in-out overflow-hidden ${
                isExpanded
                  ? "max-h-[1000px] opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <div className="grid items-center w-[100%] gap-4 grid-cols-[repeat(auto-fit,minmax(300px,1fr))] pt-4">
                {data.map((e, i) => (
                  <div className="min-h-[60px] max-h-[90px]" key={i}>
                    <div className="bg-[#fff3c6] p-5 rounded-[1rem]">
                      {e}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}