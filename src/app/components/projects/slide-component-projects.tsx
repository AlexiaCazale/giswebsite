"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Project } from "./projects-component"; // Importar a interface Project

const Slider = dynamic(() => import("react-slick"), { ssr: false });

interface SlideComponentProjectsProps {
  slides: Project[]; // Usar a interface Project
}

function SlideComponentProjects({ slides }: SlideComponentProjectsProps) {
  const [mounted, setMounted] = useState(false);
  const [windowWidth, setWindowWidth] = useState<number>(0);

  useEffect(() => {
    // Executa apenas no cliente
    const handleResize = () => setWindowWidth(window.innerWidth);
    setWindowWidth(window.innerWidth);
    setMounted(true);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Evita renderizar antes de saber o tamanho real da janela
  if (!mounted) return null;

  // Lógica dinâmica de slides com base no tamanho da tela
  const slidesToShow =
    windowWidth >= 1024 ? 4 : windowWidth >= 768 ? 3 : windowWidth >= 480 ? 2 : 1;

  const slidesToScroll = slidesToShow;

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow,
    slidesToScroll,
    // arrows: false,
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {slides.map((e) => (
          <div key={e.id}>
            <div
              className=" shadow-lg flex flex-col h-full mx-4"
            >
              <Link href={`/projeto/${e.id}`}>
                <div className="relative w-full aspect-[3/4] ">
                  <Image
                    src={e.cover_image || "/placeholder-project.jpeg"} // Usar cover_image
                    alt={e.alt || e.name || "Projeto"}
                    layout="fill"
                    objectFit="cover" 
                    className="rounded-2xl" />
                </div>
                  <p className="mt-2 text-center font-bold">{e.name}</p>
              </Link>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default SlideComponentProjects;