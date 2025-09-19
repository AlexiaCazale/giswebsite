import Image from "next/image";
import styles from "./page.module.css";
import Welcome from "./components/welcome-component";
import About from "./components/about-component";
import FatecJahu from "./components/fatec-jahu-component";
import SearchResult from "./components/search-results-component";
import Projects from "./components/projects-component";
import Member from "./components/members-component";
import Contact from "./components/contact-component";
import FooterComponent from "./components/footer-component";
import HeaderComponent from "./components/header-component";

export default function Home() {
  return (
    <div className="bg-[#1a1a1a]">
      <HeaderComponent/>
      <Welcome/>
      <About/>
      <FatecJahu/>
      <SearchResult/>
      <Projects/> 
      {/* Notícios */}
      <Member/>
      <Contact/>
      <FooterComponent/>
    </div>
  );
}
