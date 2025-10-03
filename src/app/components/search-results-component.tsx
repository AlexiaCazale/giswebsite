"use client";

import * as React from "react";
import Image from "next/image";
import { Accordion } from "@rewind-ui/core";

export default function SearchResult() {
  return (
    <React.Fragment>
      <div className="flex flex-col bg-[#f7e9e4] h-screen w-screen px-16 items-center">
        <div className="flex items-center justify-center w-[100%]">
          <div className="w-1/3">
            <Accordion
              defaultItem="item-1"
              activeColor="gray"
              shadow="sm"
              shadowColor="slate"
            >
              <Accordion.Item anchor="item-1">
                <Accordion.Header>
                  Objetivos específicos - Ano 1
                </Accordion.Header>
                <Accordion.Body>
                  <li>
                    Identificar o número de mulheres matriculadas nos cursos da
                    Fatec Jahu​
                  </li>
                  <li>
                    Coletar informações com essas estudantes sobre suas
                    percepções em relação a STEM​
                  </li>
                  <li>
                    Identificar as principais barreiras que impedem as mulheres
                    de se interessarem por STEM​
                  </li>
                  <li>
                    Identificar o número de mulheres matriculadas nos cursos da
                    Fatec Jahu​
                  </li>
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item anchor="item-2">
                <Accordion.Header>
                  Objetivos específicos - Ano 2
                </Accordion.Header>
                <Accordion.Body>
                  <li>
                    Coletar informações com as estudantes do ensino médio sobre
                    suas percepções em relação a STEM;
                  </li>
                  <li>
                    Identificar as principais barreiras que impedem essas
                    estudantes de se interessarem por STEM;
                  </li>
                  <li>
                    Realizar atividades de capacitação e formação com as
                    estudantes do ensino médio; e
                  </li>
                  <li>
                    Avaliar os resultados obtidos com as estudantes do ensino
                    médio.
                  </li>
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item anchor="item-3">
                <Accordion.Header>Header</Accordion.Header>
                <Accordion.Body>Body</Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
          <div className="relative h-screen w-1/3 items-center flex flex-col gap-20 justify-center">
            <div className="text-center gap-4">
              <h1>Resultados</h1>
              <p>
                Veja como nossa pesquisa impactou durante todo o nosso percurso.
              </p>
            </div>
            <Image
              src={"/flower-32541.svg"}
              alt={""}
              width={200}
              height={500}
            />
          </div>
          <div className="flex w-1/3 justify-center">outras coisas</div>
        </div>
      </div>
    </React.Fragment>
  );
}
