"use client";

import * as React from "react";
import Link from "next/link";
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  IconButton,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Folder as FolderIcon,
  Newspaper as NewspaperIcon,
  Group as GroupIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";
import { useIsMobile } from "../hooks/use-mobile";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

// 1. Importe os provedores de tema
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";
// Ajuste o caminho se necessário, baseado no seu arquivo DashboardPage
import { ThemeProvider as NextThemesProvider } from "../components/ui/theme-provider";

const drawerWidth = 240;

// Definição das cores para TEMA ESCURO MAIS CLARO/SUAVE (Manual)
const BACKGROUND_DEFAULT = "#2b2f3d"; // Um azul escuro mais suave para o fundo principal
const BACKGROUND_PAPER = "#2b2f3d"; // Um azul escuro ligeiramente mais escuro para Drawer/AppBar
const TEXT_PRIMARY = "#e0e0e0"; // Texto principal (branco/cinza muito claro)
const TEXT_SECONDARY = "#a0a0a0"; // Texto secundário/Ícones normais (cinza médio)
const PRIMARY_MAIN = "#ffffffff"; // Um verde mais vibrante para a cor primária
const SELECTED_BG = "#1e202aff"; // Fundo do item selecionado no Drawer (azul escuro um pouco mais claro)
const HOVER_BG = "#1e202aff"; // Fundo do item em hover no Drawer (azul escuro)
const BORDER_COLOR = "#3c485c"; // Cor da borda/divisor (azul acinzentado)

// 2. Crie seu tema MUI global aqui - TEMA ESCURO MAIS SUAVE 🎨
const muiTheme = createTheme({
  typography: {
    fontFamily: '"Montserrat", sans-serif',
  },
  palette: {
    mode: "dark", // Mantemos "dark" para componentes MUI internos
    background: {
      default: BACKGROUND_DEFAULT,
      paper: BACKGROUND_PAPER,
    },
    primary: {
      main: PRIMARY_MAIN,
    },
    text: {
      primary: TEXT_PRIMARY,
      secondary: TEXT_SECONDARY,
    },
  },
});


const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  return { isAuthenticated, isLoading };
};

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const isMobile = useIsMobile();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  const LOGIN_PATH = "/admin";
  const isLoginPage = pathname === LOGIN_PATH;

  useEffect(() => {
    // if (isLoading) return;
    // if (!isAuthenticated && !isLoginPage) {
    //   router.push(LOGIN_PATH);
    // }
    if (isAuthenticated && isLoginPage) {
      router.push("/admin/dashboard");
    }
  }, [isAuthenticated, isLoading, isLoginPage, router]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/admin/dashboard" },
    { text: "Projetos", icon: <FolderIcon />, path: "/admin/projects" },
    { text: "Notícias", icon: <NewspaperIcon />, path: "/admin/news" },
    { text: "Membros", icon: <GroupIcon />, path: "/admin/members" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    router.push("/");
  };

  // 3. Use os provedores reais em vez do wrapper
  if (isLoading) {
    return (
      <NextThemesProvider forcedTheme="dark" attribute="class"> {/* Força tema escuro no loading */}
        <MuiThemeProvider theme={muiTheme}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
              // Usando o novo background suave
              backgroundColor: BACKGROUND_DEFAULT,
              color: TEXT_PRIMARY,
            }}
          >
            <p>Verificando autenticação...</p>
          </div>
        </MuiThemeProvider>
      </NextThemesProvider>
    );
  }

  if (isLoginPage) {
    return (
      <NextThemesProvider forcedTheme="dark" attribute="class"> {/* Força tema escuro no login */}
        <MuiThemeProvider theme={muiTheme}>
          {/* Usando o novo background suave */}
          <Box sx={{ minHeight: '100vh', bgcolor: BACKGROUND_DEFAULT, color: TEXT_PRIMARY }}>
            {children}
          </Box>
        </MuiThemeProvider>
      </NextThemesProvider>
    );
  }

  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      // Usando o novo background suave para o Drawer
      sx={{ textAlign: "center", bgcolor: BACKGROUND_PAPER, height: "100%" }}
    >
      <Toolbar sx={{ bgcolor: BACKGROUND_PAPER }}>
        <Typography
          variant="h6"
          sx={{
            my: 2,
            // Cor do texto do título
            color: TEXT_PRIMARY,
          }}
        >
          Girls in STEM
        </Typography>
      </Toolbar>
      {/* Cor do divisor */}
      <Divider sx={{ borderColor: BORDER_COLOR }} />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              component={Link}
              href={item.path}
              selected={pathname === item.path}
              sx={{
                py: 1.5,
                px: 2,
                // Cor do texto normal
                color: TEXT_PRIMARY,
                "& .MuiListItemIcon-root": {
                  color: TEXT_SECONDARY, // Ícone normal
                },
                "&.Mui-selected": {
                  // Fundo do item selecionado
                  bgcolor: SELECTED_BG,
                  color: PRIMARY_MAIN, // Texto selecionado na cor primária
                  "&:hover": {
                    bgcolor: SELECTED_BG,
                  },
                  "& .MuiListItemIcon-root": {
                    color: PRIMARY_MAIN, // Ícone selecionado na cor primária
                  },
                },
                "&:hover": {
                  // Fundo ao passar o mouse
                  bgcolor: HOVER_BG,
                  "& .MuiListItemIcon-root": {
                    color: TEXT_PRIMARY,
                  },
                },
              }}
            >
              <ListItemIcon sx={{ color: "inherit", bgcolor: "inherit" }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    // 4. Envolva todo o layout nos provedores
    <NextThemesProvider
      forcedTheme="dark" // Garante que o NextThemesProvider também esteja em modo escuro
      attribute="class"
      enableSystem={false}
    >
      <MuiThemeProvider theme={muiTheme}>
        {/* Usando o novo background suave */}
        <Box sx={{ display: "flex", minHeight: '100vh' }}>
          <AppBar
            position="fixed"
            color="default" // Usa theme.palette.background.paper
            sx={{
              width: { sm: `calc(100% - ${drawerWidth}px)` },
              ml: { sm: `${drawerWidth}px` },
              // Remova a linha 'bgcolor: BACKGROUND_PAPER' se usar color="default"
              color: TEXT_PRIMARY,
              boxShadow: "none",
              borderBottom: `1px solid ${BORDER_COLOR}`,
            }}
          >
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: "none" } }}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ flexGrow: 1 }}
              >
                {navItems.find((item) => pathname.startsWith(item.path))?.text ||
                  "Admin"}
              </Typography>

              {/* ThemeToggle foi removido */}

              <IconButton
                color="inherit"
                aria-label="logout"
                onClick={handleLogout}
                sx={{
                  ml: 1,
                  // Cor do ícone de Logout
                  color: TEXT_PRIMARY,
                  "&:hover": {
                    backgroundColor: "#1c2635",
                  },
                }}
              >
                <LogoutIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <Box
            component="nav"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            aria-label="mailbox folders"
          >
            <Drawer
              variant={isMobile ? "temporary" : "permanent"}
              open={isMobile ? mobileOpen : true}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true,
              }}
              sx={{
                "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  width: drawerWidth,
                  // Cor do Drawer mais suave
                  bgcolor: BACKGROUND_PAPER,
                  borderColor: BORDER_COLOR,
                },
              }}
            >
              {drawer}
            </Drawer>
          </Box>
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 3,
              width: { sm: `calc(100% - ${drawerWidth}px)` },
              mt: { xs: "56px", sm: "64px" },
              // Cor da Área Principal mais suave
              bgcolor: BACKGROUND_DEFAULT,
              color: TEXT_PRIMARY,
            }}
          >
            {children}
          </Box>
        </Box>
      </MuiThemeProvider>
    </NextThemesProvider>
  );
};

export default AdminLayout;