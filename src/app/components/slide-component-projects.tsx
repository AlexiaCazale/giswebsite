"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { dataProjects } from "./projects-component";
import Link from "next/link";
import dynamic from "next/dynamic";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Slider = dynamic(() => import("react-slick"), { ssr: false });

function SlideComponentProjects() {
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
    arrows: false,
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {dataProjects.map((e) => (
          <div key={e.id} className="px-2">
            <Link href={`/projeto/${e.id}`}>
              <div className="flex flex-col items-center p-1">
                <Image
                  src={e.imgUrl}
                  alt={e.alt || e.name || "Projeto"}
                  width={250}
                  height={250}
                  className="rounded-[8px] flex object-cover"
                  priority
                />
                <p className="mt-2 font-bold">{e.name}</p>
              </div>
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default SlideComponentProjects;