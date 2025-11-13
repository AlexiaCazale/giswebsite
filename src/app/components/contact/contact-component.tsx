"use client";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Image from "next/image";
import React, { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { showError, showSuccess } from "@/utils/toast";
import { CircularProgress } from "@mui/material";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      showError("Por favor, preencha todos os campos.");
      return;
    }
    setLoading(true);
    const { error } = await supabase
      .from("contact_messages")
      .insert([{ name, email, message }]);
    
    setLoading(false);
    if (error) {
      showError("Erro ao enviar mensagem: " + error.message);
    } else {
      showSuccess("Mensagem enviada com sucesso! Entraremos em contato em breve.");
      setName("");
      setEmail("");
      setMessage("");
    }
  };

  return (
    <React.Fragment>
      <div className="flex flex-col justify-center items-center h-[100%] w-[100%] xl:h-screen xl:w-screen gap-4 p-[30px] md:px-16" id="contato">
        <h1 className="text-[#f4f0e5] text-center md:text-start">
          Entre em contato
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-8 item-center justify-center">
          <div className="flex flex-col gap-4">
            <TextField
              required
              id="name"
              label="Nome"
              placeholder="Digite seu nome"
              variant="outlined"
              color="primary"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
              sx={{
                "& .MuiOutlinedInput-root": {
                  color: "white",
                  "& fieldset": {
                    borderColor: "white",
                  },
                  "&:hover fieldset": {
                    borderColor: "white",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "white",
                },
              }}
            />
            <TextField
              required
              id="email"
              label="E-mail"
              type="email"
              placeholder="Digite seu e-mail"
              variant="outlined"
              color="primary"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              sx={{
                "& .MuiOutlinedInput-root": {
                  color: "white",
                  "& fieldset": {
                    borderColor: "white",
                  },
                  "&:hover fieldset": {
                    borderColor: "white",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "white",
                },
              }}
            />
            <TextField
              required
              id="message"
              label="Mensagem"
              placeholder="Escreva sua mensagem"
              variant="outlined"
              color="primary"
              multiline
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={loading}
              sx={{
                "& .MuiOutlinedInput-root": {
                  color: "white",
                  "& fieldset": {
                    borderColor: "white",
                  },
                  "&:hover fieldset": {
                    borderColor: "white",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "white",
                },
              }}
            />
            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              sx={{
                color: "#000",
                fontWeight: 600,
                "&:hover": {
                  color: "#000",
                  fontWeight: 600,
                },
              }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : "Enviar"}
            </Button>
          </div>
          <Image
            src={"/flower-7105322.svg"}
            alt={"flor"}
            width={700}
            height={700}
          />
        </form>
      </div>
    </React.Fragment>
  );
}