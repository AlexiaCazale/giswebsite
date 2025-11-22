"use client";

import * as React from "react";
import Image from "next/image";
import { useState } from "react";
import dynamic from "next/dynamic";

// Import slick-carousel styles
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// MUI components for Modal
import {
  Dialog,
  DialogContent,
  IconButton,
} from "@mui/material";
import {
  Close as CloseIcon,
  LooksOneOutlined,
  LooksTwoOutlined,
  BarChartOutlined,
  DonutLargeOutlined,
  PieChartOutline,
  ShowChartOutlined,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  ConstructionOutlined,
} from "@mui/icons-material";

// Dynamically import Slider to ensure it only runs on the client-side
const Slider = dynamic(() => import("react-slick"), { ssr: false });

// Settings for the image carousel
const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
};

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

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
        <div className="w-full h-[22rem] bg-gray-100 rounded-lg p-4">
          <Slider {...sliderSettings}>
            <div
              className="relative h-[20rem] cursor-pointer"
              onClick={() => handleImageClick("/graphics/totalAlunos_2024.png")}
            >
              <Image
                src={"/graphics/totalAlunos_2024.png"}
                alt={"Gráfico de total de alunos 2024"}
                layout="fill"
                objectFit="contain"
              />
            </div>
            <div
              className="relative h-[20rem] cursor-pointer"
              onClick={() => handleImageClick("/graphics/ingressantes_2024.png")}
            >
              <Image
                src={"/graphics/ingressantes_2024.png"}
                alt={"Gráfico de ingressantes 2024"}
                layout="fill"
                objectFit="contain"
              />
            </div>
          </Slider>
        </div>
      </div>
    ),
    "item-2": (
      <div className="bg-white p-6 rounded-xl shadow-lg w-full h-full transition-all duration-300 ease-in-out">
        <h3 className="text-lg font-semibold mb-4 text-[#8E67A1] flex items-center">
          <PieChartOutline className="mr-2" fontSize="small" />
          Gráficos - Ano 2
        </h3>
        <p className="text-gray-700 mb-4">
          Percepção das alunas do ensino médio e impacto das atividades.
        </p>
        <div className="w-full h-[22rem] bg-gray-100 rounded-lg p-4 flex items-center justify-center">
          <div
            className="relative w-full h-[20rem] cursor-pointer"
            onClick={() => handleImageClick("/graphics/escolas_2025.png")}
          >
            <Image
              src={"/graphics/escolas_2025.png"}
              alt={"Gráfico de escolas 2025"}
              layout="fill"
              objectFit="contain"
            />
          </div>
        </div>
      </div>
    ),
    "item-3": (
      <div className="bg-white p-6 rounded-xl shadow-lg w-full h-full transition-all duration-300 ease-in-out">
        <h3 className="text-lg font-semibold mb-4 text-[#8E67A1] flex items-center">
          <ShowChartOutlined className="mr-2" fontSize="small" />
          Gráficos Consolidados
        </h3>
        <p className="text-gray-700 mb-4">
          Comparativo entre os resultados do Ano 1 e Ano 2.
        </p>
        <div className="w-full h-auto min-h-[22rem] bg-gray-100 rounded-lg flex flex-col items-center justify-center text-gray-500 gap-4">
          <ConstructionOutlined sx={{ fontSize: 48, color: 'text.secondary' }} />
          <p className="text-lg text-gray-600">Gráfico em construção...</p>
        </div>
      </div>
    ),
  };

  return (
    <React.Fragment>
      <div
        className="flex flex-col bg-[#F9F4F4] min-h-screen py-[60px] px-[30px] py-[0px 20px] md:px-16 justify-center items-center pt-20"
        id="resultados"
      >
        <div className="text-center gap-4 mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Resultados</h1>
          <p className="text-lg text-gray-700">
            Veja como nossa pesquisa impactou durante todo o nosso percurso.
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-start justify-center w-full gap-6">
          <div className="w-[100%] md:w-1/2">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200/80">
              {accordionData.map((item) => {
                const isActive = activeItem === item.anchor;
                return (
                  <div
                    key={item.anchor}
                    className="border-b last:border-b-0 border-gray-200"
                  >
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

          <div className="relative hidden items-center lg:flex flex-col gap-10 justify-center px-8">
            <Image
              src={"/flower-32541.svg"}
              alt={""}
              width={150}
              height={500}
            />
          </div>

          <div className="flex w-[100%] md:w-1/2 justify-center">
            {graphMap[activeItem]}
          </div>
        </div>
      </div>

      <Dialog
        open={isModalOpen}
        onClose={handleCloseModal}
        maxWidth="lg"
        fullWidth
      >
        <DialogContent sx={{ position: 'relative', p: 1, bgcolor: 'rgba(0, 0, 0, 0.8)' }}>
          <IconButton
            aria-label="close"
            onClick={handleCloseModal}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              zIndex: 1,
              color: 'white',
              bgcolor: 'rgba(0, 0, 0, 0.5)',
              '&:hover': {
                bgcolor: 'rgba(0, 0, 0, 0.7)',
              }
            }}
          >
            <CloseIcon />
          </IconButton>
          {selectedImage && (
            <div style={{ width: '100%', height: '80vh', position: 'relative' }}>
              <Image
                src={selectedImage}
                alt="Gráfico em tela cheia"
                layout="fill"
                objectFit="contain"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}