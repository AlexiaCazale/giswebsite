"use client";

import React, { useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Box,
  Paper,
  CircularProgress,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { showSuccess, showError } from "@/utils/toast";
import { useRouter } from "next/navigation";
import { supabase } from "@/integrations/supabase/client";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setLoginError(null); // Limpa erros anteriores

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      if (error.message === "Invalid login credentials") {
        setLoginError(
          "E-mail ou senha inválidos. Por favor, verifique e tente novamente."
        );
      } else {
        setLoginError(
          "Ocorreu um erro ao tentar fazer login. Tente novamente mais tarde."
        );
      }
      showError("Falha no login");
    } else {
      showSuccess("Login realizado com sucesso!");
      router.push("/admin/dashboard");
    }
    setLoading(false);
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-login-bg-page p-4 bg-[url(/textile-9546497.svg)] bg-cover bg-center ">
      <div className="absolute inset-0 bg-black/20 z-0" />

      <Paper
        elevation={3}
        sx={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: 400,
          borderRadius: "2rem",
          p: 4,
          bgcolor: "#181c2c",
          color: "#ffffff",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          textTransform={"uppercase"}
          variant="h5"
          fontWeight="bold"
          sx={{ mb: 2 }}
        >
          {"< Girls In STEM />"}
        </Typography>

        <Typography variant="h6" sx={{ mb: 3 }}>
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
            sx={{
              mb: 2,
              "& .MuiInputBase-input": {
                color: "#c7c5b0",
              },
              "& .MuiInputLabel-root": {
                color: "rgba(255, 255, 255, 0.9)",
              },
              "& .MuiInput-underline:before": {
                borderBottomColor: "#c7c5b0",
              },
              "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                borderBottomColor: "#c7c5b0",
              },
              "& .MuiInput-underline:after": {
                borderBottomColor: "#c7c5b0",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#c7c5b0",
              },
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Senha"
            type={showPassword ? "text" : "password"}
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="standard"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                    sx={{ color: "rgba(255, 255, 255, 0.7)" }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              mb: 1,
              "& .MuiInputBase-input": {
                color: "#c7c5b0",
              },
              "& .MuiInputLabel-root": {
                color: "rgba(255, 255, 255, 0.9)",
              },
              "& .MuiInput-underline:before": {
                borderBottomColor: "#c7c5b0",
              },
              "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                borderBottomColor: "#c7c5b0",
              },
              "& .MuiInput-underline:after": {
                borderBottomColor: "#c7c5b0",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#c7c5b0",
              },
            }}
          />
          {loginError && (
            <Typography
              color="error"
              variant="body2"
              sx={{ mt: 2, textAlign: "center" }}
            >
              {loginError}
            </Typography>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading} // Desabilitar botão durante o carregamento
            sx={{
              py: 1.5,
              fontSize: "1rem",
              bgcolor: "#3f485c",
              color: "#ffffff",
              "&:hover": {
                bgcolor: "#3f485c",
                opacity: 0.9,
              },
              borderRadius: "2rem",
              mt: 3,
            }}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Entrar"
            )}
          </Button>
        </Box>
      </Paper>
    </div>
  );
};

export default LoginPage;