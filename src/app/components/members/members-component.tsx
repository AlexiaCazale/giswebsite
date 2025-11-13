"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import SlideComponent, { ISlide } from "./slide-component";
import { supabase } from "@/integrations/supabase/client";
import { showError } from "@/utils/toast";

// Hardcoded Professor Cida data
const cidaMember: ISlide = {
  id: "cida-zem", // Unique ID for Cida
  name: "Profª Dra. Aparecia Zem Lopes",
  description: "Nossa Guia e Inspiração",
  imgUrl: "/members/cida.jpeg",
  alt: "Profª Cida Zem",
};

// Interface for Supabase member data (corrigida para corresponder à query)
interface SupabaseMember {
  id: string;
  name: string;
  function: string; // Corresponds to 'description' in ISlide
  image?: string; // Corresponds to 'imgUrl' in ISlide
}

export default function Member() {
  const [membersList, setMembersList] = useState<ISlide[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("members")
        .select("id, name, function, image")
        .order("display_order", { ascending: true });

      if (error) {
        showError("Erro ao buscar membros: " + error.message);
        setMembersList([cidaMember]); // Fallback to only Cida if fetch fails
      } else {
        const fetchedSlides: ISlide[] = data
          .filter((member: SupabaseMember) => member.name !== cidaMember.name) // Ensure Cida is not duplicated if she's in DB
          .map((member: SupabaseMember) => ({
            id: member.id,
            name: member.name,
            description: member.function,
            imgUrl: member.image || "/members/default.jpeg", // Use a default image if none is provided
            alt: member.name,
          }));
        setMembersList([cidaMember, ...fetchedSlides]);
      }
      setLoading(false);
    };

    fetchMembers();
  }, []);

  return (
    <React.Fragment>
      <div className="flex bg-[#f2e4db] w-[100%] h-[100%] xl:w-screen p-[30px] md:px-16" id="membros">
        <div className="hidden md:flex relative h-screen lg:w-1/3">
          <Image
            src={"/floral-9190055.svg"}
            alt="flower"
            fill
            className="h-[100%]"
            priority
          />
        </div>
        <div className="flex flex-col w-[100%] xl:w-2/3 justify-center gap-6">
          <div className="flex flex-col">
            <h1 className="text-center md:text-start">Membros</h1>
            <p className="mb-3 text-center md:text-start">
              Conheça o rosto de cada um que contribuiu com esse projeto.
            </p>
          </div>

          <div className="flex flex-col gap-10">
            <div className="flex flex-col xl:flex-row items-center gap-4 md:gap-10">
              <div className="bg-[#a45944] rounded-full p-1 w-[200px] h-[200px] sm:w-[250px] sm:h-[250px] md:w-[280px] md:h-[280px]">
                <Image
                  src={cidaMember.imgUrl}
                  alt={cidaMember.alt || cidaMember.name}
                  width={280}
                  height={280}
                  className="rounded-[50%] w-full h-full object-cover"
                  priority
                />
              </div>

              <div className="flex-col text-center xl:text-start max-w-lg">
                <p className="mt-2 font-bold text-lg md:text-xl">{cidaMember.name}</p>
                <span className="text-sm font-medium block mt-1">
                  {cidaMember.description}
                </span>
                <p className="mt-2 text-sm leading-relaxed">
                  Com sabedoria e dedicação, a Profª Cida não apenas orienta este projeto,
                  mas inspira cada um de nós a alcançar novos horizontes. Sua experiência
                  e paixão pelo ensino são o alicerce que sustenta nossa jornada científica.
                </p>
              </div>
            </div>
            {loading ? (
              <div className="flex justify-center items-center h-40">
                <p className="text-gray-600">Carregando membros...</p>
              </div>
            ) : (
              <SlideComponent slides={membersList.filter(member => member.id !== cidaMember.id)} />
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}