import RotatingText from "@/components/RotatingText";
import SpotlightCard from "@/components/SpotlightCard";
import Image from "next/image";
import React from "react";

export default function About() {

    let data = [
        "Apenas 30% das matrículas em cursos STEM no Brasil são femininas.",
        "Somente 28% dos cargos de liderança no setor de tecnologia global são ocupados por mulheres.",
        "Empresas de tecnologia com mais mulheres líderes têm 25% mais chances de serem mais rentáveis.",
    ]

    return (
        <React.Fragment>
            <div className="md:flex lg:flex-row flex-col justify-between bg-[#f7e9e4] sm:w-[100%] min-h-screen gap-6 py-[60px] px-[30px] md:px-16" id="about">
                <div className="flex flex-col w-[100%] justify-center gap-4">

                    <h1 className="text-center md:text-start">Sobre nós</h1>
                    <div className="flex gap-2 items-center text-center justify-center md:justify-start">
                        <p>Girls In</p>
                        <RotatingText
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
                            <SpotlightCard className="custom-spotlight-card bg-[#d99ab9] border border-[#d99ab9]" spotlightColor="rgba(255, 0, 93, 0.3)" key={index}>
                                <p>{e}</p>
                            </SpotlightCard>
                        ))}
                    </div>
                </div>

                <div className="hidden lg:flex relative h-screen md:w-[100%] lg:w-1/2">
                    <Image
                        src={"/heart-8564951.svg"}
                        alt="flower"
                        fill
                        className="h-[100%]"
                        priority />
                </div>

            </div>
        </React.Fragment>
    )
}