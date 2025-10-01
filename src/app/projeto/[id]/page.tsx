'use client';

import FooterComponent from "@/app/components/footer-component";
import HeaderComponent from "@/app/components/header-component";
import { dataProjects } from "@/app/components/projects-component";
import ProjectDetails from "@/app/components/projects-details";
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
      {/* className="bg-[#1a1a1a] " */}
      <HeaderComponent />
      <div className="h-[90vh] 2xl: h-[95vh] bg-[#1a1a1a]">




        <ProjectDetails project={project} />
      </div>
      {/* <Masonry
        items={items}
        ease="power3.out"
        duration={0.6}
        stagger={0.05}
        animateFrom="bottom"
        scaleOnHover={true}
        hoverScale={0.95}
        blurToFocus={true}
        colorShiftOnHover={false}
      /> */}
      <FooterComponent />
    </div>
  );
}
