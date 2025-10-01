import Masonry from "@/components/Masonry";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Link from "next/link";

export interface Project {
  id: number;
  name: string;
  description: string;
  src: string;
  alt: string;
  height?: number;
}

interface ProjectDetailsProps {
  project: Project;
}

function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

// Corrigir as URLs das imagens - usar URLs que realmente existam
export const items = [
  {
    id: "1",
    img: "https://picsum.photos/600/900", // URL mais simples
    url: "https://example.com/one",
    height: 400,
  },
  {
    id: "2", 
    img: "https://picsum.photos/600/750",
    url: "https://example.com/two",
    height: 300,
  },
  {
    id: "3",
    img: "https://picsum.photos/600/800", 
    url: "https://example.com/three",
    height: 500,
  },
  {
    id: "4",
    img: "https://picsum.photos/600/700",
    url: "https://example.com/four", 
    height: 350,
  },
  {
    id: "5",
    img: "https://picsum.photos/600/850",
    url: "https://example.com/five",
    height: 450,
  }
];

export default function ProjectDetails(props: ProjectDetailsProps) {
  const { project } = props;
  
  return (
    <div className="mt-[4vh] flex flex-col gap-4 w-full min-h-screen p-[30px] md:px-16 bg-[#1a1a1a] text-white items-center justify-center">
      <div className="flex flex-col w-full max-w-6xl justify-center" id="welcome">
        <div role="presentation" onClick={handleClick}>
          <Breadcrumbs aria-label="breadcrumb" sx={{ color: "#ffffff" }}>
            <Link href="/" className="text-white hover:text-gray-300">
              Home
            </Link>
            <Typography sx={{ color: "#ffffff" }}>{project.name}</Typography>
          </Breadcrumbs>
        </div>

        <div className="mt-4">
          <h1 className="text-3xl font-bold mb-2">
            {project.name}
          </h1>
          <p className="text-gray-300">
            {project.description}
          </p>
        </div>
      </div>

      {/* Container para o Masonry com altura fixa */}
      <div className="w-full max-w-6xl h-[800px] mb-8"> 
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
          <h1 className="text-2xl font-bold text-center mb-4">
            Veja outros projetos
          </h1>

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