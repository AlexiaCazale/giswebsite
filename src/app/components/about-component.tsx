import RotatingText from "@/components/RotatingText";
import SpotlightCard from "@/components/SpotlightCard";
import TextType from "@/components/TextType";
import Image from "next/image";
import React from "react";

export default function About() {

    let data = [
        "35% dos diplomados em STEM são mulheres",
        "33% ocupam cargos de pesquisa no mundo",
        "áreas como engenharia, IA e dados, a participação cai para cerca de 22–31%",
    ]

    return (
        <React.Fragment>
            <div className="md:flex md:flex-row flex-col justify-between bg-[#f7e9e4] sm:w-[100%] xl:h-screen xl:w-screen gap-6 p-[30px] md:px-16">
                <div className="flex flex-col w-[100%] justify-center gap-4">

                    {/* "Um estudo para estimular e desenvolver competências em STEM (Ciência, Tecnologia, Engenharia e Matemática) nas diversas etapas do ensino!" */}
                    {/* <TextType
                    text={["STEM"]}
                    typingSpeed={175}
                    pauseDuration={1500}
                    showCursor={true}
                    cursorCharacter="|"
                /> */}
                    <h1 className="text-center md:text-start">Sobre nós</h1>
                    <div className="flex gap-2 items-center text-center justify-center md:justify-start">
                        <p>Girls In</p>
                        <RotatingText
                            //  bg-gradient-to-r from-[#BF4E83] to-[#000A90]
                            texts={['Science', 'Technology', 'Engineering', 'Mathematic']}
                            mainClassName="px-2 sm:px-2 md:px-3 bg-[#d99ab9] text-black overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
                            staggerFrom={"last"}
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "-120%" }}
                            staggerDuration={0.025}
                            splitLevelClassName="overflow-hidden sm:pb-1"
                            transition={{ type: "spring", damping: 30, stiffness: 400 }}
                            rotationInterval={2000}
                        />
                    </div>
                    <div className="text-center md:text-start">
                        <p>O Girls in STEM, coordenado pela professora Cida Zem, é um projeto que incentiva a participação feminina em Ciência, Tecnologia, Engenharia e Matemática (STEM). STEM é uma abordagem educacional que integra ciência, tecnologia, engenharia e matemática, preparando profissionais para o futuro, desenvolvendo pensamento crítico, raciocínio lógico e criatividade.</p>
                        <br />

                        <p>Apesar dos avanços, a presença feminina ainda é baixa: apenas 35% dos diplomados em STEM são mulheres, 33% ocupam cargos de pesquisa no mundo, e em áreas como engenharia, IA e dados, a participação cai para cerca de 22–31%.
                        </p>
                        <br />
                        <p>
                            O grupo atua para mudar esse cenário, criando oportunidades de aprendizado, apoio e crescimento para jovens mulheres, fortalecendo sua presença no mercado de trabalho e na pesquisa científica.
                        </p>
                        <br />
                    </div>

                    <div className="flex gap-4 flex-col md:flex-row">
                        {data.map((e, index) => (

                            <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(255, 0, 93, 0.3)" key={index}>
                                <p>{e}</p>
                            </SpotlightCard>
                        ))}
                    </div>
                </div>
                {/* <div className="flex justify-end [h-100vh]"> */}
                <div className="hidden md:flex relative h-screen w-1/2">
                    <Image
                        src={"/heart-8564951.svg"}
                        alt="flower"
                        fill
                        className="h-[100%]"
                        priority />
                </div>
                {/* </div> */}
            </div>
        </React.Fragment>
    )
}