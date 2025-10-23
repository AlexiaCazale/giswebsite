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

// 2. Crie seu tema MUI global aqui
// Adicionado palette para definir o fundo e a cor padrão do texto.
const muiTheme = createTheme({
  typography: {
    fontFamily: '"Montserrat", sans-serif',
  },
  palette: {
    mode: "dark", // Isso configura o MUI para um tema escuro
    background: {
      default: "#181c2c",
      paper: "#181c2c",
    },
    primary: {
      main: "#4caf50", // Exemplo de cor primária
    },
    text: {
      primary: "#ffffff",
      secondary: "#b0b0b0",
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
      <NextThemesProvider forcedTheme="light" attribute="class">
        <MuiThemeProvider theme={muiTheme}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
              backgroundColor: "#181c2c", // 👈 Adicionado background na tela de loading
              color: "white",
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
      <NextThemesProvider forcedTheme="light" attribute="class">
        <MuiThemeProvider theme={muiTheme}>
          {/* Adicionado background na Box/div que envolve a tela de login */}
          <Box sx={{ minHeight: '100vh', bgcolor: '#181c2c', color: 'white' }}>
            {children}
          </Box>
        </MuiThemeProvider>
      </NextThemesProvider>
    );
  }

  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{ textAlign: "center", bgcolor: "#181c2c", height: "100%" }}
    >
      <Toolbar sx={{ bgcolor: "#181c2c" }}>
        <Typography
          variant="h6"
          sx={{
            my: 2,
            color: "white",
          }}
        >
          Girls in STEM
        </Typography>
      </Toolbar>
      <Divider sx={{ borderColor: "sidebar.border" }} />
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
                "&.Mui-selected": {
                  bgcolor: "#0e111cff", // Ligeiramente mais escuro para indicar seleção
                  color: "white",
                  "&:hover": {
                    bgcolor: "#0e111cff",
                  },
                  "& .MuiListItemIcon-root": {
                    color: "white",
                  },
                },
                "&:hover": {
                  bgcolor: "#0e111cff",
                  "& .MuiListItemIcon-root": {
                    color: "white",
                  },
                },
                color: "white",
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
      forcedTheme="light"
      attribute="class"
      enableSystem={false}
    >
      <MuiThemeProvider theme={muiTheme}>
        <Box sx={{ display: "flex", bgcolor: "#181c2c", minHeight: '100vh' }}> {/* 👈 Adicionado background no box raiz */}
          <AppBar
            position="fixed"
            sx={{
              width: { sm: `calc(100% - ${drawerWidth}px)` },
              ml: { sm: `${drawerWidth}px` },
              bgcolor: "#181c2c", // 👈 Corrigido o bgcolor do AppBar
              color: "white",
              boxShadow: "none",
              borderBottom: "1px solid hsl(var(--border))",
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
                  color: "white", // Ajustado para ser branco
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.04)",
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
                  bgcolor: "#181c2c",
                  borderColor: "sidebar.border",
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
              bgcolor: "#181c2c", // 👈 Adicionado background na área principal
              color: "white",
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