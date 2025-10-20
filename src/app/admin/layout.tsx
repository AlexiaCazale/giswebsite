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
import { ThemeToggle } from "../components/ui/theme-toggle";
import { usePathname } from "next/navigation";
import MuiThemeProviderWrapper from "../components/ui/MuiThemeProviderWrapper";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const drawerWidth = 240;

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
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

  const LOGIN_PATH = '/admin';
  const isLoginPage = pathname === LOGIN_PATH;

  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated && !isLoginPage) {
      router.push(LOGIN_PATH);
    }

    if (isAuthenticated && isLoginPage) {
      router.push('/admin/dashboard');
    }
  }, [isAuthenticated, isLoading, isLoginPage, router]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/admin/dashboard" }, // Dashboard is now at /admin/dashboard
    { text: "Projetos", icon: <FolderIcon />, path: "/admin/projects" },
    { text: "Notícias", icon: <NewspaperIcon />, path: "/admin/news" },
    { text: "Membros", icon: <GroupIcon />, path: "/admin/members" },
  ];

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    router.push("/");
  };

  if (isLoading) {
    return <MuiThemeProviderWrapper>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <p>Verificando autenticação...</p>
      </div>
    </MuiThemeProviderWrapper>;
  }

  if (isLoginPage) {
    return <MuiThemeProviderWrapper>{children}</MuiThemeProviderWrapper>;
  }

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center", bgcolor: 'sidebar.DEFAULT', height: '100%' }}>
      <Toolbar sx={{ bgcolor: 'sidebar.DEFAULT' }}>
        <Typography variant="h6" sx={{ my: 2, color: 'sidebar.primary-foreground' }}>
          Girls in STEM
        </Typography>
      </Toolbar>
      <Divider sx={{ borderColor: 'sidebar.border' }} />
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
                  bgcolor: 'admin-active.DEFAULT',
                  color: 'admin-active.foreground',
                  "&:hover": {
                    bgcolor: 'admin-active.DEFAULT',
                  },
                  "& .MuiListItemIcon-root": {
                    color: 'admin-active.foreground',
                  },
                },
                "&:hover": {
                  bgcolor: 'sidebar.accent',
                  "& .MuiListItemIcon-root": {
                    color: 'sidebar.accent-foreground',
                  },
                },
                color: 'sidebar.foreground',
              }}
            >
              <ListItemIcon sx={{ color: 'inherit' }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <MuiThemeProviderWrapper>
      <Box sx={{ display: "flex" }}>
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
            bgcolor: 'background.paper',
            color: 'text.primary',
            boxShadow: 'none',
            borderBottom: '1px solid hsl(var(--border))',
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
            <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
              {navItems.find(item => pathname.startsWith(item.path))?.text || "Admin"}
            </Typography>
            <ThemeToggle />
            <IconButton
              color="inherit"
              aria-label="logout"
              onClick={handleLogout}
              sx={{
                ml: 1, // Adiciona um pouco de margem à esquerda do botão de logout
                color: 'text.primary',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.04)',
                },
                dark: {
                  color: 'text.primary',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  },
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
                bgcolor: 'sidebar.DEFAULT',
                borderColor: 'sidebar.border',
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
            mt: { xs: '56px', sm: '64px' },
          }}
        >
          {children}
        </Box>
      </Box>
    </MuiThemeProviderWrapper>
  );
};

export default AdminLayout;