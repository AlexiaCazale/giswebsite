"use client";

import React from "react";
import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import {
  Group as UsersIcon,
  Folder as FolderKanbanIcon,
  BarChart as BarChart2Icon,
  CheckCircleOutline as CheckCircleIcon,
  Newspaper as NewspaperIcon,
  ArrowOutward as ArrowUpRightIcon,
} from "@mui/icons-material";
import Link from "next/link";
// Importação de layout e provedor de tema
import AdminLayout from "@/app/components/admin/AdminLayout";
import { ThemeProvider } from "@/app/components/ui/theme-provider";

// 1. Importe o createTheme e o ThemeProvider do MUI
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";

// Definição manual das cores para manter a estética do tema escuro suave (match AdminLayout)
const BACKGROUND_PAPER = "#3f485c"; // Fundo de Cards (match AdminLayout: BACKGROUND_PAPER)
const TEXT_PRIMARY = "#ffffffff"; // Cor do texto principal (match AdminLayout: TEXT_PRIMARY)
const TEXT_SECONDARY = "#bebebeff"; // Cor do texto secundário
const HOVER_BG = "#344054"; // Fundo do hover para uso no Tailwind (match AdminLayout: HOVER_BG)
const PRIMARY_MAIN = "#da9bba"; // Verde (match AdminLayout: PRIMARY_MAIN)


// 2. Crie um tema local que define a fonte padrão
const muiTheme = createTheme({
  typography: {
    fontFamily: '"Montserrat", sans-serif',
  },
  palette: {
    // Definir as cores no palette ajuda a tipografia MUI
    mode: 'dark',
    primary: {
        main: PRIMARY_MAIN,
    },
    text: {
        primary: TEXT_PRIMARY,
        secondary: TEXT_SECONDARY,
    }
  }
});

const DashboardPage = () => {
  return (
    <ThemeProvider
      defaultTheme="system"
      storageKey="vite-ui-theme"
      attribute="class"
      enableSystem
    >
      {/* 3. Envolva o conteúdo da sua página com o MuiThemeProvider */}
      <MuiThemeProvider theme={muiTheme}>
        <div className="flex flex-col gap-6">
          <div className="flex items-center">
            <Typography
              variant="h4"
              component="h1"
              fontWeight="bold"
              // Usando a cor de texto do tema
              color="text.primary" 
            >
              Dashboard
            </Typography>
          </div>
          <Typography
            variant="body1"
            // Usando a cor de texto do tema
            color="text.primary" 
            className="-mt-4"
          >
            Bem-vindo ao painel administrativo do Girls in STEM
          </Typography>

          {/* Statistics Cards */}
          <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
            <Card
              sx={{
                // Corrigido para o novo azul escuro suave
                bgcolor: BACKGROUND_PAPER,
                color: TEXT_PRIMARY,
              }}
            >
              <CardHeader
                title={
                  <Typography
                    variant="subtitle2"
                    fontWeight="medium"
                  >
                    Total de Membros
                  </Typography>
                }
                action={
                  <UsersIcon sx={{ color: "hsl(var(--vibrant-blue))" }} />
                }
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  pb: 1,
                }}
              />
              <CardContent>
                <Typography variant="h5" fontWeight="bold">
                  24
                </Typography>
                {/* Corrigido para a nova cor de texto */}
                <Typography variant="caption" color="text.secondary"> 
                  +20.1% desde o mês passado
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{ bgcolor: BACKGROUND_PAPER, color: TEXT_PRIMARY }}>
              <CardHeader
                title={
                  <Typography variant="subtitle2" fontWeight="medium">
                    Total de Projetos
                  </Typography>
                }
                action={
                  <FolderKanbanIcon
                    sx={{ color: "hsl(var(--vibrant-orange))" }}
                  />
                }
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  pb: 1,
                }}
              />
              <CardContent>
                <Typography variant="h5" fontWeight="bold">
                  12
                </Typography>
                {/* Corrigido para a nova cor de texto */}
                <Typography variant="caption" color="text.secondary"> 
                  +18.5% desde o mês passado
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{ bgcolor: BACKGROUND_PAPER, color: TEXT_PRIMARY }}>
              <CardHeader
                title={
                  <Typography variant="subtitle2" fontWeight="medium">
                    Projetos Ativos
                  </Typography>
                }
                action={
                  <BarChart2Icon
                    sx={{ color: "hsl(var(--vibrant-purple))" }}
                  />
                }
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  pb: 1,
                }}
              />
              <CardContent>
                <Typography variant="h5" fontWeight="bold">
                  8
                </Typography>
                {/* Corrigido para a nova cor de texto */}
                <Typography variant="caption" color="text.secondary">
                  +5.2% desde o mês passado
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{ bgcolor: BACKGROUND_PAPER, color: TEXT_PRIMARY }}>
              <CardHeader
                title={
                  <Typography variant="subtitle2" fontWeight="medium">
                    Projetos Concluídos
                  </Typography>
                }
                action={
                  <CheckCircleIcon
                    sx={{ color: "hsl(var(--vibrant-green))" }}
                  />
                }
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  pb: 1,
                }}
              />
              <CardContent>
                <Typography variant="h5" fontWeight="bold">
                  4
                </Typography>
                {/* Corrigido para a nova cor de texto */}
                <Typography variant="caption" color="text.secondary">
                  +10.0% desde o mês passado
                </Typography>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
            {/* Quick Actions */}
            <Card
              className="xl:col-span-1"
              // Corrigido para o novo azul escuro suave
              sx={{ bgcolor: BACKGROUND_PAPER, color: TEXT_PRIMARY }}
            >
              <CardHeader
                title={<Typography variant="h6">Ações Rápidas</Typography>}
              />
              <CardContent className="grid gap-4">
                <Link
                  href="/admin/members"
                  // Corrigido para o novo hover suave
                  className={`flex items-center gap-4 p-3 rounded-md hover:bg-[${HOVER_BG}] transition-colors`}
                >
                  <UsersIcon sx={{ color: "hsl(var(--vibrant-blue))" }} />
                  <div>
                    <Typography variant="subtitle1" fontWeight="medium">
                      Gerenciar Membros
                    </Typography>
                    {/* Corrigido para a nova cor de texto secundário */}
                    <Typography variant="body2" color="text.secondary">
                      Ver todos os membros
                    </Typography>
                  </div>
                  <ArrowUpRightIcon
                    className="ml-auto"
                    sx={{ color: "text.secondary" }}
                  />
                </Link>
                <Link
                  href="/admin/projects"
                  // Corrigido para o novo hover suave
                  className={`flex items-center gap-4 p-3 rounded-md hover:bg-[${HOVER_BG}] transition-colors`}
                >
                  <FolderKanbanIcon
                    sx={{ color: "hsl(var(--vibrant-orange))" }}
                  />
                  <div>
                    <Typography variant="subtitle1" fontWeight="medium">
                      Gerenciar Projetos
                    </Typography>
                    {/* Corrigido para a nova cor de texto secundário */}
                    <Typography variant="body2" color="text.secondary">
                      Ver todos os projetos
                    </Typography>
                  </div>
                  <ArrowUpRightIcon
                    className="ml-auto"
                    sx={{ color: "text.secondary" }}
                  />
                </Link>
                <Link
                  href="/admin/news"
                  // Corrigido para o novo hover suave
                  className={`flex items-center gap-4 p-3 rounded-md hover:bg-[${HOVER_BG}] transition-colors`}
                >
                  <NewspaperIcon sx={{ color: "hsl(var(--vibrant-green))" }} />
                  <div>
                    <Typography variant="subtitle1" fontWeight="medium">
                      Gerenciar Notícias
                    </Typography>
                    {/* Corrigido para a nova cor de texto secundário */}
                    <Typography variant="body2" color="text.secondary">
                      Ver todas as notícias
                    </Typography>
                  </div>
                  <ArrowUpRightIcon
                    className="ml-auto"
                    sx={{ color: "text.secondary" }}
                  />
                </Link>
              </CardContent>
            </Card>

            {/* Recent Members */}
            <Card sx={{ bgcolor: BACKGROUND_PAPER, color: TEXT_PRIMARY }}>
              <CardHeader
                title={<Typography variant="h6">Membros Recentes</Typography>}
                action={
                  <Button
                    component={Link}
                    href="/admin/members"
                    size="small"
                    // Corrigido para a cor primária verde
                    sx={{ color: PRIMARY_MAIN }} 
                  >
                    Ver todos
                  </Button>
                }
              />
              <CardContent className="grid gap-6">
                <div className="flex items-center gap-4">
                  <Avatar sx={{ width: 36, height: 36, bgcolor: PRIMARY_MAIN, color: BACKGROUND_PAPER }}>AS</Avatar>
                  <div className="grid gap-1">
                    <Typography
                      variant="subtitle2"
                      fontWeight="medium"
                      lineHeight="normal"
                    >
                      Ana Silva
                    </Typography>
                    {/* Corrigido para a nova cor de texto secundário */}
                    <Typography variant="body2" color="text.secondary">
                      Desenvolvedora
                    </Typography>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Avatar sx={{ width: 36, height: 36, bgcolor: PRIMARY_MAIN, color: BACKGROUND_PAPER }}>MS</Avatar>
                  <div className="grid gap-1">
                    <Typography
                      variant="subtitle2"
                      fontWeight="medium"
                      lineHeight="normal"
                    >
                      Maria Santos
                    </Typography>
                    {/* Corrigido para a nova cor de texto secundário */}
                    <Typography variant="body2" color="text.secondary">
                      Designer
                    </Typography>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Avatar sx={{ width: 36, height: 36, bgcolor: PRIMARY_MAIN, color: BACKGROUND_PAPER }}>JC</Avatar>
                  <div className="grid gap-1">
                    <Typography
                      variant="subtitle2"
                      fontWeight="medium"
                      lineHeight="normal"
                    >
                      Julia Costa
                    </Typography>
                    {/* Corrigido para a nova cor de texto secundário */}
                    <Typography variant="body2" color="text.secondary">
                      Engenheira
                    </Typography>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Projects */}
            <Card sx={{ bgcolor: BACKGROUND_PAPER, color: TEXT_PRIMARY }}>
              <CardHeader
                title={<Typography variant="h6">Projetos Recentes</Typography>}
                action={
                  <Button
                    component={Link}
                    href="/admin/projects"
                    size="small"
                    // Corrigido para a cor primária verde
                    sx={{ color: PRIMARY_MAIN }}
                  >
                    Ver todos
                  </Button>
                }
              />
              <CardContent className="grid gap-6">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <Typography variant="subtitle1" fontWeight="medium">
                      App de Educação STEM
                    </Typography>
                    <Chip
                      label="Em andamento"
                      size="small"
                      sx={{
                        bgcolor: "hsl(var(--vibrant-blue) / 0.2)",
                        color: "hsl(var(--vibrant-blue))",
                      }}
                    />
                  </div>
                  <LinearProgress
                    variant="determinate"
                    value={75}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      "& .MuiLinearProgress-bar": {
                        bgcolor: "hsl(var(--vibrant-blue))",
                      },
                    }}
                  />
                  {/* Corrigido para a nova cor de texto secundário */}
                  <Typography variant="body2" color="text.secondary">
                    75% completo
                  </Typography>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <Typography variant="subtitle1" fontWeight="medium">
                      Workshop de Programação
                    </Typography>
                    <Chip
                      label="Em andamento"
                      size="small"
                      sx={{
                        bgcolor: "hsl(var(--vibrant-orange) / 0.2)",
                        color: "hsl(var(--vibrant-orange))",
                      }}
                    />
                  </div>
                  <LinearProgress
                    variant="determinate"
                    value={45}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      "& .MuiLinearProgress-bar": {
                        bgcolor: "hsl(var(--vibrant-orange))",
                      },
                    }}
                  />
                  {/* Corrigido para a nova cor de texto secundário */}
                  <Typography variant="body2" color="text.secondary">
                    45% completo
                  </Typography>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <Typography variant="subtitle1" fontWeight="medium">
                      Hackathon 2024
                    </Typography>
                    <Chip
                      label="Concluído"
                      size="small"
                      sx={{
                        bgcolor: "hsl(var(--vibrant-green) / 0.2)",
                        color: "hsl(var(--vibrant-green))",
                      }}
                    />
                  </div>
                  <LinearProgress
                    variant="determinate"
                    value={100}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      "& .MuiLinearProgress-bar": {
                        bgcolor: "hsl(var(--vibrant-green))",
                      },
                    }}
                  />
                  {/* Corrigido para a nova cor de texto secundário */}
                  <Typography variant="body2" color="text.secondary">
                    100% completo
                  </Typography>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </MuiThemeProvider>
    </ThemeProvider>
  );
};

export default DashboardPage;
