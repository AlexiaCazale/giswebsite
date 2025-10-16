"use client";

import * as React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
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
} from "@mui/icons-material";
import { useIsMobile } from "@/app/hooks/use-mobile";
import { ThemeToggle } from "../ui/theme-toggle";

const drawerWidth = 240;

const AdminLayout = () => {
  const isMobile = useIsMobile();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/admin/dashboard" },
    { text: "Projetos", icon: <FolderIcon />, path: "/admin/projects" },
    { text: "Notícias", icon: <NewspaperIcon />, path: "/admin/news" },
    { text: "Membros", icon: <GroupIcon />, path: "/admin/members" },
  ];

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
              to={item.path}
              selected={location.pathname === item.path || (location.pathname === "/admin" && item.path === "/admin/dashboard")}
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
            {navItems.find(item => location.pathname.startsWith(item.path))?.text || "Admin"}
          </Typography>
          <ThemeToggle />
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          variant={isMobile ? "temporary" : "permanent"}
          open={isMobile ? mobileOpen : true}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
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
          mt: { xs: '56px', sm: '64px' }, // Adjust content margin-top for app bar height
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminLayout;