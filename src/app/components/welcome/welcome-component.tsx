import Image from "next/image";
import React from "react";
import TextPressure from "@/components/TextPressure";

export default function Welcome() {
  return (
    <React.Fragment>
      <div className="flex w-[100%] h-[100%] py-[30px] min-h-screen p-[30px] md:px-16">
        <div className="relative h-screen w-1/2">
          <Image
            src="/floral-9190057.svg"
            alt="flower"
            fill
            className="h-[100%]"
            priority
          />
        </div>

        <div className="w-[100%] flex flex-col justify-center">
          <div>
            <h1 className="text-[28px] text-white">Girls In</h1>
            {/* <div style={{ position: 'relative', height: '300px' }}> */}
            <TextPressure
              text="STEM!"
              flex={true}
              alpha={false}
              stroke={false}
              width={true}
              weight={true}
              italic={true}
              textColor="#ffffff"
              strokeColor="#ff0000"
              minFontSize={22}
            />
            {/* </div> */}
          </div>
          {/* <TextType
                        text={["Um estudo para estimular e desenvolver competências em STEM (Ciência, Tecnologia, Engenharia e Matemática) nas diversas etapas do ensino!"]}
                        typingSpeed={75}
                        pauseDuration={1500}
                        showCursor={true}
                        cursorCharacter="|"
                    /> */}
        </div>
      </div>
    </React.Fragment>
  );
}
