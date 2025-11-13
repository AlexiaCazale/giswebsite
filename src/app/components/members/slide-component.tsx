"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import dynamic from "next/dynamic";

const Slider = dynamic(() => import("react-slick"), { ssr: false });

export interface ISlide {
  id: string; // Changed from number to string
  name: string;
  description: string;
  imgUrl: string;
  alt?: string;
}

interface SlideComponentProps {
  slides: ISlide[];
}

function SlideComponent({ slides = [] }: SlideComponentProps) {
  const [mounted, setMounted] = useState(false);
  const [windowWidth, setWindowWidth] = useState<number>(0);

  useEffect(() => {
    // Detecta o tamanho da tela apenas no cliente
    setWindowWidth(window.innerWidth);
    setMounted(true);

    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!mounted) return null;

  // Configurações do carrossel
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow:
      windowWidth >= 1024 ? 5 : windowWidth >= 600 ? 3 : windowWidth >= 480 ? 2 : 1,
    slidesToScroll:
      windowWidth >= 1024 ? 5 : windowWidth >= 600 ? 3 : windowWidth >= 480 ? 2 : 1,
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {slides.map((e) => (
          <div key={e.id} className="px-2">
            <div className="flex flex-col items-center text-center">
              <div className="bg-[#a45944] rounded-full p-1">
                <Image
                  src={e.imgUrl}
                  alt={e.name}
                  width={150}
                  height={150}
                  className="rounded-[50%] w-[150px] h-[150px] object-cover"
                />
              </div>
              <p className="mt-2 font-bold">{e.name}</p>
              <span className="text-sm">{e.description}</span>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default SlideComponent;