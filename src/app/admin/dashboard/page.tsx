"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import {
  Group as UsersIcon,
  Folder as FolderKanbanIcon,
  Newspaper as NewspaperIcon,
  Email as EmailIcon,
  ArrowOutward as ArrowUpRightIcon,
} from "@mui/icons-material";
import Link from "next/link";
import { ThemeProvider } from "@/app/components/ui/theme-provider";
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";
import { supabase } from "@/integrations/supabase/client";
import { showError } from "@/utils/toast";

// Interfaces para os dados
interface Member {
  name: string;
  function: string;
  image?: string;
}

// Definição de cores
const BACKGROUND_PAPER = "#3f485c";
const TEXT_PRIMARY = "#ffffffff";
const TEXT_SECONDARY = "#bebebeff";
const HOVER_BG = "#344054";
const PRIMARY_MAIN = "#da9bba";

const muiTheme = createTheme({
  typography: {
    fontFamily: '"Montserrat", sans-serif',
  },
  palette: {
    mode: "dark",
    primary: {
      main: PRIMARY_MAIN,
    },
    text: {
      primary: TEXT_PRIMARY,
      secondary: TEXT_SECONDARY,
    },
  },
});

const DashboardPage = () => {
  const [stats, setStats] = useState({
    totalMembers: 0,
    totalProjects: 0,
    totalNews: 0,
    unreadMessages: 0,
  });
  const [recentMembers, setRecentMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user) {
          showError("Usuário não autenticado.");
          setLoading(false);
          return;
        }

        // Fetch Membros
        const { count: membersCount, error: membersError } = await supabase
          .from("members")
          .select("*", { count: "exact", head: true })
          .eq("user_id", user.id);

        const { data: recentMembersData, error: recentMembersError } =
          await supabase
            .from("members")
            .select("name, function, image")
            .eq("user_id", user.id)
            .order("created_at", { ascending: false })
            .limit(3);

        // Fetch Projetos
        const { count: projectsCount, error: projectsError } = await supabase
          .from("projects")
          .select("*", { count: "exact", head: true })
          .eq("user_id", user.id);

        // Fetch Notícias
        const { count: newsCount, error: newsError } = await supabase
          .from("news")
          .select("*", { count: "exact", head: true })
          .eq("user_id", user.id);

        // Fetch Mensagens Não Lidas
        const { count: unreadMessagesCount, error: messagesError } =
          await supabase
            .from("contact_messages")
            .select("*", { count: "exact", head: true })
            .eq("is_read", false);

        if (
          membersError ||
          recentMembersError ||
          projectsError ||
          newsError ||
          messagesError
        ) {
          console.error(
            "Supabase error:",
            membersError ||
              recentMembersError ||
              projectsError ||
              newsError ||
              messagesError
          );
          showError("Erro ao buscar dados do dashboard.");
          return;
        }

        setStats({
          totalMembers: membersCount || 0,
          totalProjects: projectsCount || 0,
          totalNews: newsCount || 0,
          unreadMessages: unreadMessagesCount || 0,
        });

        setRecentMembers((recentMembersData as Member[]) || []);
      } catch (error) {
        showError("Ocorreu um erro inesperado ao carregar o dashboard.");
        console.error("Dashboard fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <ThemeProvider
      defaultTheme="system"
      storageKey="vite-ui-theme"
      attribute="class"
      enableSystem
    >
      <MuiThemeProvider theme={muiTheme}>
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "calc(100vh - 150px)",
            }}
          >
            <CircularProgress sx={{ color: TEXT_PRIMARY }} />
            <Typography variant="h6" sx={{ ml: 2 }}>
              Carregando dados...
            </Typography>
          </Box>
        ) : (
          <div className="flex flex-col gap-6">
            <div className="flex items-center">
              <Typography
                variant="h4"
                component="h1"
                fontWeight="bold"
                color="text.primary"
              >
                Dashboard
              </Typography>
            </div>
            <Typography variant="body1" color="text.primary" className="-mt-4">
              Bem-vindo ao painel administrativo do Girls in STEM
            </Typography>

            {/* Statistics Cards */}
            <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
              <Card sx={{ bgcolor: BACKGROUND_PAPER, color: TEXT_PRIMARY }}>
                <CardHeader
                  title={
                    <Typography variant="subtitle2" fontWeight="medium">
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
                    {stats.totalMembers}
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
                    {stats.totalProjects}
                  </Typography>
                </CardContent>
              </Card>
              <Card sx={{ bgcolor: BACKGROUND_PAPER, color: TEXT_PRIMARY }}>
                <CardHeader
                  title={
                    <Typography variant="subtitle2" fontWeight="medium">
                      Total de Notícias
                    </Typography>
                  }
                  action={
                    <NewspaperIcon
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
                    {stats.totalNews}
                  </Typography>
                </CardContent>
              </Card>
              <Card sx={{ bgcolor: BACKGROUND_PAPER, color: TEXT_PRIMARY }}>
                <CardHeader
                  title={
                    <Typography variant="subtitle2" fontWeight="medium">
                      Mensagens Não Lidas
                    </Typography>
                  }
                  action={
                    <EmailIcon sx={{ color: "hsl(var(--vibrant-purple))" }} />
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
                    {stats.unreadMessages}
                  </Typography>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-2">
              {/* Quick Actions */}
              <Card
                className="xl:col-span-1"
                sx={{ bgcolor: BACKGROUND_PAPER, color: TEXT_PRIMARY }}
              >
                <CardHeader
                  title={<Typography variant="h6">Ações Rápidas</Typography>}
                />
                <CardContent className="grid gap-4">
                  <Link
                    href="/admin/members"
                    className={`flex items-center gap-4 p-3 rounded-md hover:bg-[${HOVER_BG}] transition-colors`}
                  >
                    <UsersIcon sx={{ color: "hsl(var(--vibrant-blue))" }} />
                    <div>
                      <Typography variant="subtitle1" fontWeight="medium">
                        Gerenciar Membros
                      </Typography>
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
                    className={`flex items-center gap-4 p-3 rounded-md hover:bg-[${HOVER_BG}] transition-colors`}
                  >
                    <FolderKanbanIcon
                      sx={{ color: "hsl(var(--vibrant-orange))" }}
                    />
                    <div>
                      <Typography variant="subtitle1" fontWeight="medium">
                        Gerenciar Projetos
                      </Typography>
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
                    className={`flex items-center gap-4 p-3 rounded-md hover:bg-[${HOVER_BG}] transition-colors`}
                  >
                    <NewspaperIcon
                      sx={{ color: "hsl(var(--vibrant-green))" }}
                    />
                    <div>
                      <Typography variant="subtitle1" fontWeight="medium">
                        Gerenciar Notícias
                      </Typography>
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
                      sx={{ color: PRIMARY_MAIN }}
                    >
                      Ver todos
                    </Button>
                  }
                />
                <CardContent className="grid gap-6">
                  {recentMembers.length > 0 ? (
                    recentMembers.map((member, index) => (
                      <div className="flex items-center gap-4" key={index}>
                        <Avatar
                          src={member.image}
                          sx={{
                            width: 36,
                            height: 36,
                            bgcolor: PRIMARY_MAIN,
                            color: BACKGROUND_PAPER,
                          }}
                        >
                          {!member.image &&
                            member.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .substring(0, 2)
                              .toUpperCase()}
                        </Avatar>
                        <div className="grid gap-1">
                          <Typography
                            variant="subtitle2"
                            fontWeight="medium"
                            lineHeight="normal"
                          >
                            {member.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {member.function}
                          </Typography>
                        </div>
                      </div>
                    ))
                  ) : (
                    <Typography color="text.secondary">
                      Nenhum membro recente.
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </MuiThemeProvider>
    </ThemeProvider>
  );
};

export default DashboardPage;