"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { showError } from "@/utils/toast";
import DynamicSlider, { SlideItem } from "../shared/DynamicSlider";

// Interface for Projetos (ajustada para o novo esquema do DB)
export interface Project {
  id: number;
  name: string;
  description: string;
  cover_image?: string; // Renomeado de imgUrl para cover_image
  images?: string; // JSON string of string[] for gallery
  alt?: string;
}

export default function Projects() {
  const [projectsList, setProjectsList] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("projects")
        .select("id, name, description, cover_image")
        .order("display_order", { ascending: true });

      if (error) {
        showError("Erro ao buscar projetos: " + error.message);
        setProjectsList([]);
      } else {
        const formattedProjects: Project[] = data.map((p) => ({
          id: p.id,
          name: p.name,
          description: p.description,
          cover_image: p.cover_image,
          alt: p.name,
        }));
        setProjectsList(formattedProjects);
      }
      setLoading(false);
    };

    fetchProjects();
  }, []);

  // Map projects to the format expected by DynamicSlider
  const slides: SlideItem[] = projectsList.map(project => ({
    id: project.id,
    title: project.name,
    linkUrl: `/projeto/${project.id}`,
    imageUrl: project.cover_image || "/placeholder-project.jpeg",
  }));

  return (
    <React.Fragment>
      <div className="flex md:flex-row flex-col bg-[#2f3e43] min-h-screen w-full py-[60px] px-[30px] md:px-16 items-center" id="projetos">
        <div className="flex flex-col w-full xl:w-2/3 justify-center gap-6 text-[#f4f0e5]">
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
            <DynamicSlider slides={slides} showButton={false} />
          )}
        </div>
        <div className="hidden xl:flex relative self-stretch w-1/3">
          <Image
            src="/floral-9190052.svg"
            alt="flower"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>
    </React.Fragment>
  );
}