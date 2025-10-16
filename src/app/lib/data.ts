// src/lib/data.ts

export interface Member {
  id: string;
  name: string;
  role: string;
  email: string;
  joinedDate: string;
}

export const mockMembers: Member[] = [
  {
    id: "1",
    name: "Ana Silva",
    role: "Desenvolvedora Frontend",
    email: "ana.silva@example.com",
    joinedDate: "2023-01-15",
  },
  {
    id: "2",
    name: "Beatriz Costa",
    role: "Designer UX/UI",
    email: "beatriz.costa@example.com",
    joinedDate: "2023-03-20",
  },
  {
    id: "3",
    name: "Carla Dias",
    role: "Engenheira de Dados",
    email: "carla.dias@example.com",
    joinedDate: "2023-05-10",
  },
  {
    id: "4",
    name: "Daniela Esteves",
    role: "Gerente de Projetos",
    email: "daniela.esteves@example.com",
    joinedDate: "2023-07-01",
  },
];

export interface Project {
  id: string;
  name: string;
  status: "Em Andamento" | "Concluído" | "Pendente";
  startDate: string;
  endDate?: string;
  members: string[]; // IDs of members
}

export const mockProjects: Project[] = [
  {
    id: "p1",
    name: "Plataforma de Mentoria Online",
    status: "Em Andamento",
    startDate: "2023-02-01",
    members: ["1", "2"],
  },
  {
    id: "p2",
    name: "Aplicativo de Aprendizado STEM",
    status: "Em Andamento",
    startDate: "2023-04-10",
    members: ["1", "3"],
  },
  {
    id: "p3",
    name: "Website Institucional Girls in STEM",
    status: "Concluído",
    startDate: "2022-11-01",
    endDate: "2023-01-30",
    members: ["2", "4"],
  },
  {
    id: "p4",
    name: "Workshop de Introdução à IA",
    status: "Pendente",
    startDate: "2024-01-01",
    members: ["3"],
  },
];

export interface News {
  id: string;
  title: string;
  author: string;
  publishDate: string;
  content: string;
}

export const mockNews: News[] = [
  {
    id: "n1",
    title: "Girls in STEM Lança Nova Plataforma de Mentoria",
    author: "Maria Santos",
    publishDate: "2023-08-20",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
  },
  {
    id: "n2",
    title: "Sucesso no Hackathon Anual 2023",
    author: "João Pereira",
    publishDate: "2023-07-15",
    content: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
  },
  {
    id: "n3",
    title: "Parceria com Universidades para Bolsas de Estudo",
    author: "Ana Clara",
    publishDate: "2023-06-01",
    content: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris...",
  },
];