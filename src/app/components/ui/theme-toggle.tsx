"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSetTheme = (newTheme: string) => {
    setTheme(newTheme);
    handleClose();
  };

  React.useEffect(() => {
    console.log("Tema atual:", theme);
  }, [theme]);

  return (
    <>
      <IconButton
        onClick={handleClick}
        color="inherit"
        aria-controls={open ? 'theme-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        sx={{
          color: 'text.primary', // Ensure icon color adapts to theme
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.04)', // Subtle hover effect
          },
          dark: {
            color: 'text.primary',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
            },
          },
        }}
      >
        {theme === 'dark' ? (
          <DarkModeIcon className="h-[1.2rem] w-[1.2rem]" />
        ) : (
          <LightModeIcon className="h-[1.2rem] w-[1.2rem]" />
        )}
        <span className="sr-only">Toggle theme</span>
      </IconButton>
      <Menu
        id="theme-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'theme-button',
        }}
      >
        <MenuItem onClick={() => handleSetTheme("light")}>
          Claro
        </MenuItem>
        <MenuItem onClick={() => handleSetTheme("dark")}>
          Escuro
        </MenuItem>
        <MenuItem onClick={() => handleSetTheme("system")}>
          Sistema
        </MenuItem>
      </Menu>
    </>
  );
}