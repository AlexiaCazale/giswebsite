import Image from "next/image";
import React from "react";

export default function Projects() {
    return (
        <React.Fragment>
            <div className="flex bg-[#2f3e43] justify-between h-screen w-screen px-16">
                <div className="flex flex-col w-[100%] justify-center">
                    <h1 className="text-[#f4f0e5]">Projetos</h1>
                </div>
                <div className="relative h-screen w-1/2">
                    <Image
                        src="/floral-9190052.svg"
                        alt="flower"
                       fill
                        className="h-[100%]"
                        priority />
                </div>
            </div>
        </React.Fragment>
    )
}