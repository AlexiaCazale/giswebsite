"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Slider = dynamic(() => import("react-slick"), { ssr: false });

// Interface para Notícias (ajustada para o novo esquema do DB)
interface NewsItem {
  id: string;
  title: string;
  author: string;
  link_url?: string;
  image?: string;
  created_at: string;
  user_id: string;
}

interface SlideComponentNewsProps {
  slides: NewsItem[];
}

function SlideComponentNews({ slides }: SlideComponentNewsProps) {
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
        <div className="slider-container w-full max-w-7xl mx-auto">
            <Slider {...settings}>
                {slides.map((news) => (
                    <div
                        key={news.id}
                    >
                        <div
                            className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200/80 flex flex-col h-full mx-4"
                        >
                            <div className="relative w-full aspect-[4/4]">
                                {news.image ? (
                                    <Image
                                        src={news.image}
                                        alt={`Notícia ${news.title}`}
                                        layout="fill"
                                        objectFit="cover"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
                                        Sem Imagem
                                    </div>
                                )}
                            </div>

                            <div className="p-6 flex justify-center mt-auto">
                                <Link
                                    href={news.link_url || "#"}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="
                                      py-2 px-10 rounded-lg text-white font-semibold 
                                      bg-[#8c84b0] 
                                      shadow-md transition-all hover:opacity-90
                                    "
                                >
                                    ACESSAR
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );

}

export default SlideComponentNews;