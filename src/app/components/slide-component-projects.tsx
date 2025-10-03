"use client";

import Image from "next/image";
import React from "react";
import Slider from "react-slick";
import { dataProjects } from "./projects-component";
import PixelCard from "@/components/PixelCard";
import Link from "next/link";
import SlideComponent from "./slide-component";

function SlideComponentProjects() {
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="slider-container">
      <Slider {...settings}>
        {dataProjects.map((e) => (
          <div
            key={e.id}
            className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(200px,1fr))]"
          >
            <Link href={`/projeto/${e.id}`} key={e.id}>
              <div className="flex flex-col items-center p-1">
                <Image
                  src={e.imgUrl}
                  alt={e.alt}
                  width={250}
                  height={250}
                  className="rounded-[8px] flex object-cover"
                  priority
                />
              </div>
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default SlideComponentProjects;
