"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import SlideComponentProjects from "./slide-component-projects";
import { supabase } from "@/integrations/supabase/client";
import { showError } from "@/utils/toast";

// Interface para Projetos (ajustada para o novo esquema do DB)
export interface Project {
  id: number;
  name: string;
  description: string;
  cover_image?: string; // Renomeado de imgUrl para cover_image
  images?: string; // JSON string of string[] for gallery
  alt?: string;
}

const dataProjects = [
  {
    id: 1,
    name: "Inteligência Artificial",
    description: "Projeto de IA",
    cover_image: "/projects/ia-capa.jpeg",
    alt: "Projeto de IA",
  },
  {
    id: 2,
    name: "Girassol",
    description: "Projeto Girassol",
    cover_image: "/projects/girassolCapa.jpeg",
    alt: "Projeto Girassol",
  },
  {
    id: 3,
    name: "Inteligência Artificial",
    description: "Projeto de IA",
    cover_image: "/projects/ia-capa.jpeg",
    alt: "Projeto de IA",
  },
  {
    id: 4,
    name: "Girassol",
    description: "Projeto Girassol",
    cover_image: "/projects/girassolCapa.jpeg",
    alt: "Projeto Girassol",
  },
  {
    id: 5,
    name: "Inteligência Artificial",
    description: "Projeto de IA",
    cover_image: "/projects/ia-capa.jpeg",
    alt: "Projeto de IA",
  },
  {
    id: 6,
    name: "Girassol",
    description: "Projeto Girassol",
    cover_image: "/projects/girassolCapa.jpeg",
    alt: "Projeto Girassol",
  },
];

export default function Projects() {
  const [projectsList, setProjectsList] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Revertendo para dados mockados
    setProjectsList(dataProjects);
    setLoading(false);
  }, []);

  return (
    <React.Fragment>
      <div className="flex md:flex-row flex-col bg-[#2f3e43] justify-between h-screen w-[100%] lg:w-screen p-[30px] md:px-16 items-center justify-center" id="projetos">
        <div className="flex flex-col w-[100%] lg:w-2/3 justify-center gap-6 text-[#f4f0e5]">
          <div>
            <h1 className=" text-center md:text-start">Projetos</h1>
            <p className="text-center md:text-start">Fique por dentro dos nossos projetos.</p>
          </div>
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <p className="text-white">Carregando projetos...</p>
            </div>
          ) : projectsList.length === 0 ? (
            <div className="flex justify-center items-center h-40">
              <p className="text-white">Nenhum projeto encontrado.</p>
            </div>
          ) : (
            <SlideComponentProjects slides={projectsList} />
          )}
        </div>
        <div className="hidden lg:flex relative h-screen md:w-[100%] md:w-1/3">
          <Image
            src="/floral-9190052.svg"
            alt="flower"
            fill
            className="h-[100%]"
            priority
          />
        </div>
      </div>
    </React.Fragment>
  );
}