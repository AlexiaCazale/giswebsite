import Masonry from "@/components/Masonry";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { showError } from "@/utils/toast";
import { Project } from "./projects-component";
import DynamicSlider, { SlideItem } from "../shared/DynamicSlider";

// Interface para Projetos (ajustada para o novo esquema do DB)
export interface ProjectDetailItem {
  id: number;
  name: string;
  description: string;
  cover_image?: string;
  images?: string; // JSON string of string[] for gallery
  created_at: string;
  user_id: string;
}

interface ProjectDetailsProps {
  projectId: number; // Recebe apenas o ID do projeto
}

function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

export default function ProjectDetails({ projectId }: ProjectDetailsProps) {
  const [project, setProject] = useState<ProjectDetailItem | null>(null);
  const [otherProjects, setOtherProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [projectsList, setProjectsList] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("projects")
        .select("id, name, description, cover_image")
        .order("created_at", { ascending: false });

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

  useEffect(() => {
    if (!projectId) {
      setLoading(false);
      return;
    }

    const fetchProjectData = async () => {
      setLoading(true);

      // Fetch the main project
      const { data: projectData, error: projectError } = await supabase
        .from("projects")
        .select("*")
        .eq("id", projectId)
        .single();

      if (projectError) {
        showError("Erro ao buscar detalhes do projeto: " + projectError.message);
        setProject(null);
      } else {
        setProject(projectData as ProjectDetailItem);
      }

      // Fetch all other projects for the slider
      const { data: allProjectsData, error: allProjectsError } = await supabase
        .from("projects")
        .select("id, name, description, cover_image")
        .neq("id", projectId)
        .order("created_at", { ascending: false });

      if (allProjectsError) {
        showError("Erro ao buscar outros projetos: " + allProjectsError.message);
      } else {
        const formattedProjects: Project[] = allProjectsData.map((p) => ({
          id: p.id,
          name: p.name,
          description: p.description,
          cover_image: p.cover_image,
          alt: p.name,
        }));
        setOtherProjects(formattedProjects);
      }

      setLoading(false);
    };

    fetchProjectData();
  }, [projectId]);

  if (loading) {
    return (
      <div className="flex flex-col gap-4 w-full min-h-screen p-[30px] md:px-16 bg-[#1a1a1a] text-white items-center justify-center">
        <Typography variant="h6" color="white">Carregando projeto...</Typography>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex flex-col gap-4 w-full min-h-screen p-[30px] md:px-16 bg-[#1a1a1a] text-white items-center justify-center">
        <Typography variant="h6" color="white">Projeto não encontrado.</Typography>
      </div>
    );
  }

  // Parsear a string JSON de imagens para o formato esperado pelo Masonry
  const galleryImages = project.images ? JSON.parse(project.images) : [];
  const items = galleryImages.map((imgUrl: string, index: number) => ({
    id: `${project.id}-${index}`,
    img: imgUrl,
    url: imgUrl, // Link para a própria imagem em tamanho real
    height: Math.floor(Math.random() * (500 - 300 + 1)) + 300, // Altura aleatória para layout
  }));


  const slides: SlideItem[] = projectsList.map(project => ({
    id: project.id,
    title: project.name,
    linkUrl: `/projeto/${project.id}`,
    imageUrl: project.cover_image || "/placeholder-project.jpeg",
  }));

  return (
    <div className="flex flex-col gap-4 w-full min-h-screen p-[30px] md:px-16 bg-[#1a1a1a] text-white items-center justify-center">
      <div
        className="mt-[10vh] flex flex-col w-full max-w-6xl justify-center"
        id="welcome"
      >
        <div role="presentation" onClick={handleClick}>
          <Breadcrumbs aria-label="breadcrumb" sx={{ color: "#ffffff" }}>
            <Link href="/" className="text-white hover:text-gray-300">
              Home
            </Link>
            <Typography sx={{ color: "#ffffff" }}>{project.name}</Typography>
          </Breadcrumbs>
        </div>

        <div className="mt-4">
          <h1 className="text-3xl font-bold mb-2">{project.name}</h1>
          <p className="text-gray-300">{project.description}</p>
        </div>
      </div>

      {items.length > 0 && (
        <div className="w-full max-w-6xl h-auto mb-8">
          <Masonry
            items={items}
            ease="power3.out"
            duration={0.6}
            stagger={0.05}
            animateFrom="bottom"
            scaleOnHover={true}
            hoverScale={0.95}
            blurToFocus={true}
            colorShiftOnHover={false}
          />
        </div>
      )}

      <div className="w-full max-w-6xl">
        <div className="flex flex-col w-full justify-center items-center">
          <h1 className="text-2xl font-bold text-center">
            Veja outros projetos
          </h1>
          <div className="w-[100%] py-10">
            <DynamicSlider slides={slides} showButton={false} />
          </div>
          <div className="flex justify-center mb-4">
            <button className="px-6 py-2 border border-white rounded-lg hover:bg-white hover:text-black transition-colors">
              <Link href="/#projetos">Voltar para projetos</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}