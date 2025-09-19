import Masonry from "@/components/Masonry";
import PixelTransition from "@/components/PixelTransition";
import Image from "next/image";
import React from "react";

export default function Member() {
    let membersList = [
        {
            id: 0,
            name: "Letícia Garcia",
            imgUrl: "/members/leticia.jpeg",
        },
        {
            id: 1,
            name: "Aléxia Cazale",
            imgUrl: "/members/alexia.jpeg",
        },
        {
            id: 2,
            name: "Júlia Mazoti",
            imgUrl: "/members/julia.jpeg",
        },
        {
            id: 3,
            name: "Geovana Cristina",
            imgUrl: "/members/geovana.jpeg",
        },
        {
            id: 4,
            name: "Evelyn Cassinotte",
            imgUrl: "/members/evelyn.jpeg",
        },
        {
            id: 5,
            name: "Rayssa Maely",
            imgUrl: "/members/rayssa.jpeg",
        },
        {
            id: 6,
            name: "Yasmin Sanchez",
            imgUrl: "/members/yasmin.jpeg",
        },
        {
            id: 7,
            name: "Brenda Ananias",
            imgUrl: "/members/brenda.jpeg",
        },
        {
            id: 8,
            name: "Arthur Henrique",
            imgUrl: "/members/arthur.jpeg",
        },
        {
            id: 9,
            name: "Jorge Guilherme",
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
                    <div className="grid gap-2 grid-cols-[repeat(auto-fit,minmax(200px,1fr))]">
                        {membersList.map((member) => (
                            <PixelTransition
                                firstContent={
                                    <img
                                        src={member.imgUrl} alt={member.name}
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            borderRadius: "50%",
                                            objectFit: "cover"
                                        }}
                                    />
                                }
                                secondContent={
                                    <div
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            borderRadius: "50%",
                                            display: "grid",
                                            placeItems: "center",
                                            justifyContent: "center",
                                            textAlign: "center",
                                            backgroundColor: "#a45944"
                                        }}
                                    >
                                        <p style={{ fontWeight: 600, fontSize: "2rem", color: "#ffffff" }}>{member.name}</p>
                                    </div>
                                }
                                gridSize={12}
                                pixelColor='#ffffff'
                                animationStepDuration={0.4}
                                className="custom-pixel-card"
                            />
                        ))}
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}