"use client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Image from "next/image";
import styles from "./page.module.css";
import About from "./components/about/about-component";
import FatecJahu from "./components/fatec-jahu/fatec-jahu-component";
import SearchResult from "./components/search-results/search-results-component";
import Member from "./components/members/members-component";
import Contact from "./components/contact/contact-component";
import FooterComponent from "./components/footer-component";
import HeaderComponent from "./components/header-component";
import { ParallaxProvider } from "react-scroll-parallax";
import Projects from "./components/projects/projects-component";
import Welcome from "./components/welcome/welcome-component";
import News from "./components/news/new-component";

export default function Home() {
  return (
    <ParallaxProvider>
      <div className="bg-[#1a1a1a]">
        <HeaderComponent />
        <Welcome />
        <About />
        <FatecJahu />
        <Projects />
        <News />
        <SearchResult />
        <Member />
        <Contact />
        <FooterComponent />
      </div>
    </ParallaxProvider>
  );
}
