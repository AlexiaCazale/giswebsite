"use client";

import * as React from "react";
import { supabase } from "@/integrations/supabase/client";
import { showError } from "@/utils/toast";
import DynamicSlider, { SlideItem } from "../shared/DynamicSlider";

// Interface para Notícias
interface NewsItem {
  id: string;
  title: string;
  author: string;
  link_url?: string;
  image?: string;
  created_at: string;
  user_id: string;
}

export default function NewsPage() {
  const [newsList, setNewsList] = React.useState<NewsItem[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("news")
        .select("id, title, author, link_url, image, created_at")
        .order("created_at", { ascending: false });

      if (error) {
        showError("Erro ao buscar notícias: " + error.message);
        setNewsList([]);
      } else {
        setNewsList(data as NewsItem[]);
      }
      setLoading(false);
    };

    fetchNews();
  }, []);

  // Map news to the format expected by DynamicSlider
  const slides: SlideItem[] = newsList.map(news => ({
    id: news.id,
    title: news.title,
    linkUrl: news.link_url || "#",
    imageUrl: news.image,
  }));

  return (
    <React.Fragment>
      <div
        className="relative flex flex-col min-h-screen w-full p-8 md:p-16 justify-center items-center bg-[#3f485c]"
        id="noticias"
      >
        <div className="absolute inset-0 bg-black/20 z-0" />

        <div className="flex flex-col relative text-center mb-12 gap-2">
          <h1 className="text-4xl font-bold text-white">Notícias</h1>
          <p className="text-center text-white md:text-start">Saiba onde foi nossa última aparição.</p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <p className="text-white">Carregando notícias...</p>
          </div>
        ) : newsList.length === 0 ? (
          <div className="flex justify-center items-center h-40">
            <p className="text-white">Nenhuma notícia encontrada.</p>
          </div>
        ) : (
          <DynamicSlider slides={slides} showButton={true} />
        )}
      </div>
    </React.Fragment>
  );
}