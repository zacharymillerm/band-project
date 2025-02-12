"use client";

import HeroSection from "./HeroSection";
import GallerySection from "./GallerySection";
import PendingSection from "./PendingSection";
import PortfolioSection from "./PortfolioSection";
import ContactSection from "./ContactSection";
import BlogSection from "./BlogSection";
import AboutSection from "./AboutSection";
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="wrapper">
      <div className="container">
        <HeroSection />
        <GallerySection title="Кейсы из портфолио" galleryType="Главная" />
      </div>
      <AboutSection />
      <div className="container">
        <PendingSection />
        <PortfolioSection />
        <ContactSection title="У вас есть вопросы?" />
        <BlogSection />
      </div>
    </div>
  );
};

export default Home;
