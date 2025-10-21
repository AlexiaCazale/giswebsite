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
import AdminLayout from "@/app/components/admin/AdminLayout";
import { ThemeProvider } from "@/app/components/ui/theme-provider";

// 1. Importe o createTheme e o ThemeProvider do MUI
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";

// 2. Crie um tema local que define a fonte padrão
const muiTheme = createTheme({
  typography: {
    fontFamily: '"Montserrat", sans-serif',
  },
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
              // A prop fontFamily foi removida daqui
            >
              Dashboard
            </Typography>
          </div>
          <Typography
            variant="body1"
            color="textSecondary"
            className="-mt-4"
            // A prop fontFamily foi removida daqui
          >
            Bem-vindo ao painel administrativo do Girls in STEM
          </Typography>

          {/* Statistics Cards */}
          <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
            <Card
              sx={{
                bgcolor: "background.paper",
                color: "text.primary",
                // A prop fontFamily foi removida do sx
              }}
            >
              <CardHeader
                title={
                  <Typography
                    variant="subtitle2"
                    fontWeight="medium"
                    // A prop fontFamily foi removida daqui
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
                <Typography variant="caption" color="textSecondary">
                  +20.1% desde o mês passado
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{ bgcolor: "background.paper", color: "text.primary" }}>
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
                <Typography variant="caption" color="textSecondary">
                  +18.5% desde o mês passado
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{ bgcolor: "background.paper", color: "text.primary" }}>
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
                <Typography variant="caption" color="textSecondary">
                  +5.2% desde o mês passado
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{ bgcolor: "background.paper", color: "text.primary" }}>
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
                <Typography variant="caption" color="textSecondary">
                  +10.0% desde o mês passado
                </Typography>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
            {/* Quick Actions */}
            <Card
              className="xl:col-span-1"
              sx={{ bgcolor: "background.paper", color: "text.primary" }}
            >
              <CardHeader
                title={<Typography variant="h6">Ações Rápidas</Typography>}
              />
              <CardContent className="grid gap-4">
                <Link
                  href="/admin/members"
                  className="flex items-center gap-4 p-3 rounded-md hover:bg-muted/50 transition-colors"
                >
                  <UsersIcon sx={{ color: "hsl(var(--vibrant-blue))" }} />
                  <div>
                    <Typography variant="subtitle1" fontWeight="medium">
                      Gerenciar Membros
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
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
                  className="flex items-center gap-4 p-3 rounded-md hover:bg-muted/50 transition-colors"
                >
                  <FolderKanbanIcon
                    sx={{ color: "hsl(var(--vibrant-orange))" }}
                  />
                  <div>
                    <Typography variant="subtitle1" fontWeight="medium">
                      Gerenciar Projetos
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
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
                  className="flex items-center gap-4 p-3 rounded-md hover:bg-muted/50 transition-colors"
                >
                  <NewspaperIcon sx={{ color: "hsl(var(--vibrant-green))" }} />
                  <div>
                    <Typography variant="subtitle1" fontWeight="medium">
                      Gerenciar Notícias
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
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
            <Card sx={{ bgcolor: "background.paper", color: "text.primary" }}>
              <CardHeader
                title={<Typography variant="h6">Membros Recentes</Typography>}
                action={
                  <Button
                    component={Link}
                    href="/admin/members"
                    size="small"
                    sx={{ color: "hsl(var(--admin-active-bg))" }}
                  >
                    Ver todos
                  </Button>
                }
              />
              <CardContent className="grid gap-6">
                <div className="flex items-center gap-4">
                  <Avatar sx={{ width: 36, height: 36 }}>AS</Avatar>
                  <div className="grid gap-1">
                    <Typography
                      variant="subtitle2"
                      fontWeight="medium"
                      lineHeight="normal"
                    >
                      Ana Silva
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Desenvolvedora
                    </Typography>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Avatar sx={{ width: 36, height: 36 }}>MS</Avatar>
                  <div className="grid gap-1">
                    <Typography
                      variant="subtitle2"
                      fontWeight="medium"
                      lineHeight="normal"
                    >
                      Maria Santos
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Designer
                    </Typography>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Avatar sx={{ width: 36, height: 36 }}>JC</Avatar>
                  <div className="grid gap-1">
                    <Typography
                      variant="subtitle2"
                      fontWeight="medium"
                      lineHeight="normal"
                    >
                      Julia Costa
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Engenheira
                    </Typography>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Projects */}
            <Card sx={{ bgcolor: "background.paper", color: "text.primary" }}>
              <CardHeader
                title={<Typography variant="h6">Projetos Recentes</Typography>}
                action={
                  <Button
                    component={Link}
                    href="/admin/projects"
                    size="small"
                    sx={{ color: "hsl(var(--admin-active-bg))" }}
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
                  <Typography variant="body2" color="textSecondary">
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
                  <Typography variant="body2" color="textSecondary">
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
                  <Typography variant="body2" color="textSecondary">
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