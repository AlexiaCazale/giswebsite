"use client";

import * as React from "react";
import Image from "next/image";
import { useState } from "react";

// Ícones para o Accordion e para os Gráficos
import {
  LooksOneOutlined,
  LooksTwoOutlined,
  BarChartOutlined,
  DonutLargeOutlined,
  PieChartOutline,
  ShowChartOutlined,
} from "@mui/icons-material";

// Ícones de "chevron" (seta para baixo/cima)
import {
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
} from "@mui/icons-material";

/**
 * 1. NOVO Mapa de Conteúdo (graphMap)
 * Controla o conteúdo da DIREITA (Gráficos).
 */
const graphMap: { [key: string]: React.ReactNode } = {
  "item-1": (
    <div className="bg-white p-6 rounded-xl shadow-lg w-full h-full transition-all duration-300 ease-in-out">
      <h3 className="text-lg font-semibold mb-4 text-[#8E67A1] flex items-center">
        <DonutLargeOutlined className="mr-2" fontSize="small" />
        Gráficos - Ano 1
      </h3>
      <p className="text-gray-700 mb-4">
        Diagnóstico interno e percepção das alunas da Fatec Jahu.
      </p>
      {/* Placeholder de um gráfico */}
      <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500">
        (Componente de Gráfico 1)
      </div>
    </div>
  ),
  "item-2": (
    <div className="bg-white p-6 rounded-xl shadow-lg w-full transition-all duration-300 ease-in-out">
      <h3 className="text-lg font-semibold mb-4 text-[#8E67A1] flex items-center">
        <PieChartOutline className="mr-2" fontSize="small" />
        Gráficos - Ano 2
      </h3>
      <p className="text-gray-700 mb-4">
        Percepção das alunas do ensino médio e impacto das atividades.
      </p>
      {/* Placeholder de um gráfico */}
      <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500">
        (Componente de Gráfico 2)
      </div>
    </div>
  ),
  "item-3": (
    <div className="bg-white p-6 rounded-xl shadow-lg w-full transition-all duration-300 ease-in-out">
      <h3 className="text-lg font-semibold mb-4 text-[#8E67A1] flex items-center">
        <ShowChartOutlined className="mr-2" fontSize="small" />
        Gráficos Consolidados
      </h3>
      <p className="text-gray-700 mb-4">
        Comparativo entre os resultados do Ano 1 e Ano 2.
      </p>
      {/* Placeholder de um gráfico */}
      <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500">
        (Componente de Gráfico 3)
      </div>
    </div>
  ),
};

/**
 * 2. accordionData ATUALIZADO
 * O 'content' (as listas <ul>) é o que será exibido abaixo de cada item.
 */
const accordionData = [
  {
    anchor: "item-1",
    title: "Objetivos específicos - Ano 1",
    icon: <LooksOneOutlined fontSize="small" className="text-gray-700" />,
    content: (
      <ul className="list-disc pl-6 space-y-2 text-gray-600">
        <li>
          Identificar o número de mulheres matriculadas nos cursos da Fatec Jahu
        </li>
        <li>
          Coletar informações com essas estudantes sobre suas percepções em
          relação a STEM
        </li>
        <li>
          Identificar as principais barreiras que impedem as mulheres de se
          interessarem por STEM
        </li>
        <li>
          Identificar o número de mulheres matriculadas nos cursos da Fatec Jahu
        </li>
      </ul>
    ),
  },
  {
    anchor: "item-2",
    title: "Objetivos específicos - Ano 2",
    icon: <LooksTwoOutlined fontSize="small" className="text-gray-700" />,
    content: (
      <ul className="list-disc pl-6 space-y-2 text-gray-600">
        <li>
          Coletar informações com as estudantes do ensino médio sobre suas
          percepções em relação a STEM;
        </li>
        <li>
          Identificar as principais barreiras que impedem essas estudantes de se
          interessarem por STEM;
        </li>
        <li>
          Realizar atividades de capacitação e formação com as estudantes do
          ensino médio; e
        </li>
        <li>
          Avaliar os resultados obtidos com as estudantes do ensino médio.
        </li>
      </ul>
    ),
  },
  {
    anchor: "item-3",
    title: "Resultados Consolidados",
    icon: <BarChartOutlined fontSize="small" className="text-gray-700" />,
    content: (
      <p className="text-gray-600 px-2 pb-2">
        Análise dos dados e gráficos comparativos dos dois anos de pesquisa.
      </p>
    ),
  },
];

export default function SearchResult() {
  const [activeItem, setActiveItem] = useState("item-1");

  return (
    <React.Fragment>
      <div
        className="flex flex-col bg-[#F9F4F4] w-screen h-screen p-[30px] py-[0px 20px] md:px-16 justify-center items-center pt-20"
        id="resultados"
      >
        {/* Título e Subtítulo - Agora no topo */}
        <div className="text-center gap-4 mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Resultados</h1>
          <p className="text-lg text-gray-700">
            Veja como nossa pesquisa impactou durante todo o nosso percurso.
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-start justify-center w-full gap-6">
          {/**
           * 3. Accordion Customizado (Coluna da Esquerda)
           * Redimensionado para md:w-1/2
           */}
          <div className="w-[100%] md:w-1/2">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200/80">
              {accordionData.map((item) => {
                const isActive = activeItem === item.anchor;
                return (
                  <div
                    key={item.anchor}
                    className="border-b last:border-b-0 border-gray-200"
                  >
                    {/* O botão (cabeçalho) que controla o estado */}
                    <button
                      onClick={() => setActiveItem(item.anchor)}
                      className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors duration-200"
                    >
                      <div className="flex items-center">
                        <span className="text-gray-600 mr-4">{item.icon}</span>
                        <span className="text-base font-medium text-gray-800">
                          {item.title}
                        </span>
                      </div>
                      {isActive ? (
                        <ExpandLessIcon className="text-gray-700" />
                      ) : (
                        <ExpandMoreIcon className="text-gray-700" />
                      )}
                    </button>
                    {/* O conteúdo (corpo) que abre e fecha */}
                    {isActive && (
                      <div className="p-6 pt-0 text-gray-700">
                        {item.content}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* O conteúdo do Meio (Flor) - AGORA SÓ APARECE EM TELAS PEQUENAS */}
          <div className="relative hidden items-center lg:flex flex-col gap-10 justify-center px-8">
            <Image
              src={"/flower-32541.svg"}
              alt={""}
              width={150}
              height={500}
            />
          </div>

          {/**
           * 4. Conteúdo da Direita (Dinâmico para Gráficos)
           * Redimensionado para md:w-1/2
           */}
          <div className="flex w-[100%] md:w-1/2 justify-center">
            {graphMap[activeItem]}
          </div>

        </div>
      </div>
    </React.Fragment>
  );
}
