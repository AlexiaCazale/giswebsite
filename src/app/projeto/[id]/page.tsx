'use client';

import FooterComponent from "@/app/components/footer-component";
import HeaderComponent from "@/app/components/header-component";
import ProjectDetails from "@/app/components/projects/projects-details";
import { useParams } from "next/navigation";


export default function Projeto() {
  const params = useParams();
  const projectId = Number(params.id);

  if (isNaN(projectId)) {
    return <p>ID de projeto inválido.</p>;
  }

  return (
    <div >
      <HeaderComponent />
        <ProjectDetails projectId={projectId} /> 
      <FooterComponent />
    </div>
  );
}