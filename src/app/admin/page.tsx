"use client";

import React, { useState } from "react";
import { Button, TextField, Typography, Box, Paper } from "@mui/material";
import { showSuccess, showError } from "@/utils/toast";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (email === "teste@teste.com" && password === "123") {
      showSuccess("Login realizado com sucesso!");
      localStorage.setItem("auth_token", "seu_token_simulado_aqui");
      router.push("/admin/dashboard");
    } else {
      showError("Credenciais inválidas. Tente novamente.");
    }
  };

  return (
    // 1. Adicione 'relative' aqui no div principal
    <div className="relative min-h-screen flex items-center justify-center bg-login-bg-page p-4 bg-[url(/heart-8908350.svg)] bg-cover bg-center ">
      <div className="absolute inset-0 bg-black/50 z-0" />

      <Paper
        elevation={3}
        sx={{
          fontFamily: "Montserrat, sans-serif",
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: 400,
          borderRadius: "2rem",
          p: 4,
          bgcolor: "#8E67A1", // A cor do painel continua sólida
          color: "#ffffff",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          fontFamily="Montserrat, sans-serif"
          textTransform={"uppercase"}
          variant="h5"
          fontWeight="bold"
          sx={{ mb: 2 }}
        >
          {"< Girls In STEM />"}
        </Typography>

        <Typography
          fontFamily="Montserrat, sans-serif"
          variant="h6"
          sx={{ mb: 3 }}
        >
          Acesse a área administrativa
        </Typography>

        <Box component="form" onSubmit={handleLogin} sx={{ width: "100%" }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="E-mail"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant="standard"
            sx={{ mb: 2, fontFamily: "Montserrat, sans-serif" }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Senha"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="standard"
            sx={{ mb: 1, fontFamily: "Montserrat, sans-serif" }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              py: 1.5,
              fontSize: "1rem",
              bgcolor: "#FAD4E1",
              fontFamily: "Montserrat, sans-serif",
              color: "#000000",
              "&:hover": {
                bgcolor: "#EF9FCF",
                opacity: 0.9,
              },
              borderRadius: "2rem",
              mt: 3,
            }}
          >
            Entrar
          </Button>
        </Box>
      </Paper>
    </div>
  );
};

export default LoginPage;
