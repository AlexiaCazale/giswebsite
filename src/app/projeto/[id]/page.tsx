'use client';

import FooterComponent from "@/app/components/footer-component";
import HeaderComponent from "@/app/components/header-component";
import { dataProjects } from "@/app/components/projects/projects-component";
import ProjectDetails from "@/app/components/projects/projects-details";
import Masonry from "@/components/Masonry";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { useParams } from "next/navigation";
import { useEffect } from "react";



export default function Projeto() {

  const params = useParams();
  const projectId = Number(params.id);
  const project = dataProjects.find(p => p.id === projectId);

  if (!project) return <p>Projeto não encontrado</p>;

  return (
    <div >
      <HeaderComponent />
        <ProjectDetails project={project} />
      <FooterComponent />
    </div>
  );
}
