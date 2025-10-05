import Masonry from "@/components/Masonry";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import SlideComponentProjects from "./slide-component-projects";

export interface Project {
  id: number;
  name: string;
  description: string;
  src: string;
  alt: string;
  height?: number;
  gallery?: { id: string; img: string; height: number }[];
}

interface ProjectDetailsProps {
  project: Project;
}

function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

export default function ProjectDetails({ project }: ProjectDetailsProps) {

  const items =
    project.gallery?.map((g) => ({
      id: g.id,
      img: g.img,
      url: g.img,
      height: g.height,
    })) ?? [];

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

      <div className="w-full max-w-6xl">
        <div className="flex flex-col w-full justify-center items-center">
          <h1 className="text-2xl font-bold text-center">
            Veja outros projetos
          </h1>
          <div className="w-[100%] py-10">
            <SlideComponentProjects />
          </div>
          <div className="flex justify-center mb-4">
            <button className="px-6 py-2 border border-white rounded-lg hover:bg-white hover:text-black transition-colors">
              <Link href="/#projects">Voltar para projetos</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
