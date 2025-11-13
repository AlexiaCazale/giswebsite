"use client";

import React from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useTheme } from "next-themes";

interface MuiThemeProviderWrapperProps {
  children: React.ReactNode;
}

const MuiThemeProviderWrapper: React.FC<MuiThemeProviderWrapperProps> = ({ children }) => {
  const { theme: nextTheme } = useTheme();

  const muiTheme = React.useMemo(() => {
    return createTheme({
      palette: {
        mode: nextTheme === 'dark' ? 'dark' : 'light',
        // Using CSS variables directly for palette colors
        primary: {
          main: 'hsl(var(--primary))', // Use the primary color from globals.css
          contrastText: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          main: 'hsl(var(--secondary))', // Use the secondary color from globals.css
          contrastText: 'hsl(var(--secondary-foreground))',
        },
        error: {
          main: 'hsl(var(--destructive))',
          contrastText: 'hsl(var(--destructive-foreground))',
        },
        background: {
          default: 'hsl(var(--background))',
          paper: 'hsl(var(--card))', // Use --card for paper background
        },
        text: {
          primary: 'hsl(var(--foreground))', // Use --foreground for primary text
          secondary: 'hsl(var(--muted-foreground))', // Use --muted-foreground for secondary text
        },
        // You can add more palette colors if needed, referencing your CSS variables
      },
      components: {
        MuiButton: {
          styleOverrides: {
            containedPrimary: {
              backgroundColor: 'hsl(var(--admin-active-bg))', // Admin active pink
              color: 'hsl(var(--admin-active-foreground))',
              '&:hover': {
                backgroundColor: 'hsl(var(--admin-active-bg) / 0.9)', // Slightly darker pink on hover
              },
            },
            // Ensure other button variants also respect the theme
            containedSecondary: {
              backgroundColor: 'hsl(var(--secondary))',
              color: 'hsl(var(--secondary-foreground))',
              '&:hover': {
                backgroundColor: 'hsl(var(--secondary) / 0.9)',
              },
            },
            text: {
              color: 'hsl(var(--foreground))',
              '&:hover': {
                backgroundColor: 'hsl(var(--accent) / 0.1)',
              },
            },
            outlined: {
              borderColor: 'hsl(var(--border))',
              color: 'hsl(var(--foreground))',
              '&:hover': {
                backgroundColor: 'hsl(var(--accent) / 0.1)',
              },
            },
          },
        },
        MuiCard: {
          styleOverrides: {
            root: {
              backgroundColor: 'hsl(var(--card))', // Ensure Card uses --card background
              color: 'hsl(var(--card-foreground))', // Ensure Card uses --card-foreground text
              borderColor: 'hsl(var(--border))', // Optional: add border color
            },
          },
        },
        MuiPaper: { // For Dialogs, Menus, etc.
          styleOverrides: {
            root: {
              backgroundColor: 'hsl(var(--popover))', // Use --popover for paper background
              color: 'hsl(var(--popover-foreground))', // Use --popover-foreground for paper text
            },
          },
        },
        MuiTableCell: {
          styleOverrides: {
            root: {
              borderColor: 'hsl(var(--border))', // Table cell borders
              color: 'hsl(var(--foreground))', // Table cell text color
            },
            head: {
              color: 'hsl(var(--muted-foreground))', // Table header text color
            },
          },
        },
        MuiTableContainer: {
          styleOverrides: {
            root: {
              backgroundColor: 'hsl(var(--card))', // Table container background
            },
          },
        },
        MuiInputLabel: {
          styleOverrides: {
            root: {
              color: 'hsl(var(--muted-foreground))', // Label color
              '&.Mui-focused': {
                color: 'hsl(var(--primary))', // Focused label color
              },
            },
          },
        },
        MuiOutlinedInput: {
          styleOverrides: {
            root: {
              '& fieldset': {
                borderColor: 'hsl(var(--input))', // Default border color
              },
              '&:hover fieldset': {
                borderColor: 'hsl(var(--input))', // Hover border color
              },
              '&.Mui-focused fieldset': {
                borderColor: 'hsl(var(--ring))', // Focused border color
              },
              color: 'hsl(var(--foreground))', // Input text color
            },
          },
        },
        MuiSelect: {
          styleOverrides: {
            icon: {
              color: 'hsl(var(--muted-foreground))', // Select arrow icon color
            },
          },
        },
        MuiChip: {
          styleOverrides: {
            root: {
              // Default chip styles, can be overridden by sx prop
            },
          },
        },
        MuiLinearProgress: {
          styleOverrides: {
            root: {
              backgroundColor: 'hsl(var(--muted))', // Background of the progress bar
            },
            bar: {
              backgroundColor: 'hsl(var(--admin-active-bg))', // Progress bar color
            },
          },
        },
        MuiAvatar: {
          styleOverrides: {
            root: {
              backgroundColor: 'hsl(var(--muted))', // Avatar background
              color: 'hsl(var(--muted-foreground))', // Avatar text color
            },
          },
        },
        MuiIconButton: {
          styleOverrides: {
            root: {
              color: 'hsl(var(--foreground))', // Default icon button color
              '&:hover': {
                backgroundColor: 'hsl(var(--accent) / 0.1)',
              },
            },
          },
        },
      },
    });
  }, [nextTheme]);

  return (
    <MuiThemeProvider theme={muiTheme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};

export default MuiThemeProviderWrapper;