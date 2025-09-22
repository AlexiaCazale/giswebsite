"use client";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
// export const metadata: Metadata = {
//   title: "Girls In STEM",
//   description: "By Aléxia Cazale",
// };

const theme = createTheme({
  palette: {
    primary: {
      light: "#fff",
      main: "#fff",
      dark: "#fff",
      contrastText: "#fff",
    },
    // secondary: {
    //   light: "#ff7961",
    //   main: "#f44336",
    //   dark: "#ba000d",
    //   contrastText: "#000",
    // },
  },
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="pt-br">
      <body>
        <ThemeProvider theme={theme}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
