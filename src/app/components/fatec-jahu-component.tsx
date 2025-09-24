import FadeContent from "@/components/FadeContent";
import SpotlightCard from "@/components/SpotlightCard";
import StarBorder from "@/components/StarBorder";
import Image from "next/image";
import React from "react";

export default function FatecJahu() {

    let data = [
        "Construção Naval",
        "Desenvolvimento de Software Multiplataforma",
        "Gestão da Tecnologia da Informação",
        "Logística",
        "Gestão da Produção Industrial",
        "Gestão Empresarial",
        "Meio Ambiente e Recursos Hídricos",
        "Sistemas Navais",
        "Sistemas para Internet",
    ]
    return (
        <React.Fragment>
            <div className="lg:flex md:flex-row flex-col h-[100%] lg-[h-100vh] bg-[#d1af65] xl:h-screen md:w-[100%] p-[30px] md:px-16">
                <div className="hidden md:flex relative h-screen w-1/2">
                    <Image
                        src={"/flowers-9190054.svg"}
                        alt="flower"
                        fill
                        className="h-[100%]"
                        priority />
                </div>
                <div className="flex flex-col w-[100%] justify-center gap-4">

                    <h1 className="text-center md:text-start">Fatec Jahu</h1>
                    <div className="flex text-center md:text-start gap-6 flex-col items-center">
                        <p>
                            A FATEC Jahu é uma instituição pública de ensino superior em Jaú, São Paulo, que oferece cursos de graduação tecnológica. Parte do Sistema FATEC vinculado ao Centro Paula Souza, a faculdade integra teoria e prática, com laboratórios modernos e atividades extracurriculares, como palestras e parcerias com empresas. Com um corpo docente qualificado, a FATEC Jahu prepara os alunos para o mercado de trabalho, oferecendo uma formação prática e de qualidade em setores tecnológicos e empresariais.
                        </p>

                        <div className="grid w-[100%] gap-4 grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
                            {data.map((e, i) => (
                                <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0} key={i}>
                                    <div className="bg-[#fff3c6] p-5 rounded-[6px]">{e}</div>
                                </FadeContent>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}