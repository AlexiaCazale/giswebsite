import Image from "next/image";
import React from "react";
import Slider from "react-slick";

export interface ISlide {
  id: number;
  name: string;
  description: string;
  imgUrl: string;
  alt?: string;
}

interface SlideComponentProps {
  slides: ISlide[];
}

function SlideComponent({ slides = [] }: SlideComponentProps) {
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
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
        {slides.map((e) => (
          <div
            key={e.id}
            className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(200px,1fr))]"
          >
            <div className="flex flex-col items-center text-center">
              <div className="bg-[#a45944] rounded-full p-1">
                <Image
                  src={e.imgUrl}
                  alt={e.name}
                  width={150}
                  height={150}
                  className="rounded-[50%] w-[150px] h-[150px] object-cover  border-l-8 border-[#a45944]"
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
