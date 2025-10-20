"use client";

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  TextField,
  Typography,
  Box,
  Paper, // Usar Paper para o painel de login
}
  from "@mui/material";
import { showSuccess, showError } from "@/utils/toast";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulação de login: Em um aplicativo real, você faria uma chamada de API aqui.

    // email: girlsinstemfatec@gmail.com
    // password:  GirlsInStem!F@tec24
    if (email === "teste@teste.com" && password === "123") {
      showSuccess("Login realizado com sucesso!");
      router.push("/admin/dashboard"); // Redireciona para o painel administrativo
    } else {
      showError("Credenciais inválidas. Tente novamente.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-login-bg-page p-4">
      <Paper
        elevation={3} // Adiciona uma sombra sutil
        sx={{
          width: '100%',
          maxWidth: 400,
          borderRadius: '1rem', // Bordas arredondadas
          p: 4, // Padding interno
          bgcolor: 'background.paper', // Fundo branco para o painel
          color: 'text.primary', // Cor do texto padrão
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" fontWeight="bold" sx={{ mb: 4 }}>
          Girls In STEM
        </Typography>

        <Typography variant="h6" sx={{ mb: 3 }}>
          Login your account
        </Typography>

        <Box component="form" onSubmit={handleLogin} sx={{ mt: 2, width: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Username"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant="standard"
            sx={{ mb: 2 }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="standard"
            sx={{ mb: 1 }}
          />
          {/* O link "forget password?" foi removido daqui */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              py: 1.5,
              fontSize: '1rem',
              bgcolor: 'login-button-bg.DEFAULT',
              color: 'login-button-bg.foreground',
              '&:hover': {
                bgcolor: 'login-button-bg.DEFAULT',
                opacity: 0.9,
              },
              borderRadius: '0.5rem',
              mt: 3, // Adiciona margem superior para compensar a remoção do link
            }}
          >
            Login
          </Button>
        </Box>
        {/* O botão "Create Account" foi removido daqui */}
      </Paper>
    </div>
  );
};

export default LoginPage;