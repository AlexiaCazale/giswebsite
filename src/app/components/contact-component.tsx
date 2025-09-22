import Button from "@mui/material/Button";
import { createTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Image from "next/image";
import React from "react";

export default function Contact() {

    return (
        <React.Fragment>
            <div className="flex flex-col justify-center items-center h-screen w-screen px-16">
                <h1 className="text-[#f4f0e5]">Entre em contato</h1>
                <div className="flex flex-col gap-8 item-center justify-center">
                    <div className="flex flex-col gap-4">
                        <TextField
                            required
                            id="standard-required"
                            label="Nome"
                            placeholder="Digite seu nome"
                            variant="outlined"
                            color="primary"
                        />
                        <TextField
                            required
                            id="standard-required"
                            label="E-mail"
                            placeholder="Digite seu e-mail"
                            variant="outlined"
                            color="primary"
                        />
                        <TextField
                            required
                            id="standard-required"
                            label="Mensagem"
                            placeholder="Escreva sua mensagem"
                            variant="outlined"
                            color="primary"
                        />
                        <Button variant="contained">Enviar</Button>
                    </div>
                    <Image src={"/flower-7105322.svg"} alt={"flor"} width={700} height={700} />
                </div>
            </div>
        </React.Fragment>
    )
}