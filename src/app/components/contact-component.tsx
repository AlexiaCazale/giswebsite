import Button from "@mui/material/Button";
import { createTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Image from "next/image";
import React from "react";

export default function Contact() {
  return (
    <React.Fragment>
      <div className="flex flex-col justify-center items-center h-[100%] w-[100%] xl:h-screen xl:w-screen gap-4 p-[30px] md:px-16">
        <h1 className="text-[#f4f0e5] text-center md:text-start">
          Entre em contato
        </h1>
        <div className="flex flex-col gap-8 item-center justify-center">
          <div className="flex flex-col gap-4">
            <TextField
              required
              id="standard-required"
              label="Nome"
              placeholder="Digite seu nome"
              variant="outlined"
              color="primary"
              sx={{
                "& .MuiOutlinedInput-root": {
                  color: "white",
                  "& fieldset": {
                    borderColor: "white", // cor da borda normal
                  },
                  "&:hover fieldset": {
                    borderColor: "white", // cor ao passar o mouse
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "white", // cor do label mesmo sem foco
                },
              }}
            />
            <TextField
              required
              id="standard-required"
              label="E-mail"
              placeholder="Digite seu e-mail"
              variant="outlined"
              color="primary"
              sx={{
                "& .MuiOutlinedInput-root": {
                  color: "white",
                  "& fieldset": {
                    borderColor: "white", // cor da borda normal
                  },
                  "&:hover fieldset": {
                    borderColor: "white", // cor ao passar o mouse
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "white", // cor do label mesmo sem foco
                },
              }}
            />
            <TextField
              required
              id="standard-required"
              label="Mensagem"
              placeholder="Escreva sua mensagem"
              variant="outlined"
              color="primary"
              sx={{
                "& .MuiOutlinedInput-root": {
                  color: "white",
                  "& fieldset": {
                    borderColor: "white", // cor da borda normal
                  },
                  "&:hover fieldset": {
                    borderColor: "white", // cor ao passar o mouse
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "white", // cor do label mesmo sem foco
                },
              }}
            />
            <Button
              variant="contained"
               sx={{
                color: "#000",
                fontWeight: 600, // Adiciona o peso da fonte
                "&:hover": {
                  color: "#000",
                  fontWeight: 600, // Mantém o mesmo peso no hover
                },
              }}
            >
              Enviar
            </Button>
          </div>
          <Image
            src={"/flower-7105322.svg"}
            alt={"flor"}
            width={700}
            height={700}
          />
        </div>
      </div>
    </React.Fragment>
  );
}
