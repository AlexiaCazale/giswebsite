import Masonry from "@/components/Masonry";
import PixelTransition from "@/components/PixelTransition";
import Image from "next/image";
import React from "react";

export default function Member() {
    let membersList = [
        {
            id: 0,
            name: "Letícia Garcia",
            description: "Estudante",
            imgUrl: "/members/leticia.jpeg",
        },
        {
            id: 1,
            name: "Aléxia Cazale",
            description: "Estudante",
            imgUrl: "/members/alexia.jpeg",
        },
        {
            id: 2,
            name: "Júlia Mazoti",
            description: "Estudante",
            imgUrl: "/members/julia.jpeg",
        },
        {
            id: 3,
            name: "Geovana Cristina",
            description: "Estudante",
            imgUrl: "/members/geovana.jpeg",
        },
        {
            id: 4,
            name: "Evelyn Cassinotte",
            description: "Estudante",
            imgUrl: "/members/evelyn.jpeg",
        },
        {
            id: 5,
            name: "Rayssa Maely",
            description: "Estudante",
            imgUrl: "/members/rayssa.jpeg",
        },
        {
            id: 6,
            name: "Yasmin Sanchez",
            description: "Estudante",
            imgUrl: "/members/yasmin.jpeg",
        },
        {
            id: 7,
            name: "Brenda Ananias",
            description: "Estudante",
            imgUrl: "/members/brenda.jpeg",
        },
        {
            id: 8,
            name: "Arthur Henrique",
            description: "Estudante",
            imgUrl: "/members/arthur.jpeg",
        },
        {
            id: 9,
            name: "Jorge Guilherme",
            description: "Estudante",
            imgUrl: "/members/jorge.jpeg",
        },
    ];

    return (
        <React.Fragment>
            <div className="flex bg-[#f2e4db] h-screen w-screen px-16">
                <div className="relative h-screen w-1/2">
                    <Image
                        src={"/floral-9190055.svg"}
                        alt="flower"
                        fill
                        className="h-[100%]"
                        priority />
                </div>
                <div className="flex flex-col w-[100%] justify-center gap-6">
                    <h1>Membros</h1>
                    <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(200px,1fr))]">
                        {membersList.map((member) => (
                            <div key={member.id} className="flex flex-col gap-2 items-center justify-center">
                                <div className="bg-[#a45944] rounded-[50%]">
                                    <Image src={member.imgUrl} alt={member.name} width={150} height={150} className="rounded-[50%] w-[150px] h-[150px] object-cover  border-l-8 border-[#a45944]" />
                                </div>
                                <p><strong>{member.name}</strong></p>
                                <span>{member.description}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}