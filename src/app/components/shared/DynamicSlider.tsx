"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Slider = dynamic(() => import("react-slick"), { ssr: false });

export interface SlideItem {
  id: string | number;
  title: string;
  linkUrl: string;
  imageUrl?: string;
}

interface DynamicSliderProps {
  slides: SlideItem[];
  showButton?: boolean; // If true, shows button (News style). If false, shows title (Project style).
}

function DynamicSlider({ slides, showButton = true }: DynamicSliderProps) {
  const [mounted, setMounted] = useState(false);
  const [windowWidth, setWindowWidth] = useState<number>(0);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    setWindowWidth(window.innerWidth);
    setMounted(true);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!mounted) return null;

  const slidesToShow =
    windowWidth >= 1024 ? 4 : windowWidth >= 768 ? 3 : windowWidth >= 480 ? 2 : 1;
  const slidesToScroll = slidesToShow;

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow,
    slidesToScroll,
  };

  // Unified styles for both news and projects
  const cardClasses = "bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200/80 flex flex-col h-full";
  const imageContainerClasses = "relative w-full aspect-[4/4]";
  const linkTarget = showButton ? "_blank" : undefined;

  return (
    <div className="slider-container w-full max-w-7xl">
      <Slider {...settings}>
        {slides.map((slide) => (
          <div key={slide.id} className="px-2">
            <div className={cardClasses}>
              <Link href={slide.linkUrl} target={linkTarget} rel={showButton ? "noopener noreferrer" : ""}>
                  <div className={imageContainerClasses}>
                    {slide.imageUrl ? (
                      <Image
                        src={slide.imageUrl}
                        alt={`Imagem para ${slide.title}`}
                        layout="fill"
                        objectFit="cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
                        Sem Imagem
                      </div>
                    )}
                  </div>
              </Link>

              {showButton ? (
                <div className="p-6 flex justify-center mt-auto">
                  <Link
                    href={slide.linkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2 px-10 rounded-lg text-white font-semibold bg-[#8c84b0] shadow-md transition-all hover:opacity-90"
                  >
                    ACESSAR
                  </Link>
                </div>
              ) : (
                <div className="p-6 flex justify-center items-center mt-auto text-center">
                    <Link href={slide.linkUrl}>
                        <p className="font-bold text-gray-800">{slide.title}</p>
                    </Link>
                </div>
              )}
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default DynamicSlider;