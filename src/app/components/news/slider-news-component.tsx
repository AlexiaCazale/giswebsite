"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { mockNewsData } from "./new-component";

const Slider = dynamic(() => import("react-slick"), { ssr: false });

function SlideComponentNews() {
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
    // SlideComponentNews.jsx
    const slidesToShow =
        windowWidth >= 1024 ? 4 : windowWidth >= 768 ? 3 : windowWidth >= 480 ? 2 : 1;
    // ...
    const slidesToScroll = slidesToShow;

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow,
        slidesToScroll,
        arrows: false,
    };

    // SlideComponentNews.jsx

    // ... (código anterior)

    return (
        <div className="slider-container w-full max-w-7xl mx-auto">
            <Slider {...settings}>
                {mockNewsData.map((news) => (
                    <div
                        key={news.id}
                    >
                        {/* Seu card com o conteúdo real */}
                        <div
                            className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200/80 flex flex-col h-full mx-4"
                        >
                            <div className="relative w-full aspect-[4/4]">
                                <Image
                                    src={news.imgUrl}
                                    alt={`Notícia ${news.alt}`}
                                    layout="fill"
                                    objectFit="cover"
                                />
                            </div>

                            <div className="p-6 flex justify-center mt-auto">
                                <Link
                                    href={news.linkUrl}
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