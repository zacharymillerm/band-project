"use client";

import { Svideo04 } from "@/assets";
import { BigVideoBox } from "@/components/Boxes";
import HeroSample from "@/components/HeroSample/HeroSample";
import SwiperSection from "@/components/Swiper/Swiper";
import { equipmentsCardInfo, heroSectionInfo } from "@/constant/group";
import BlogSection from "@/pageComponent/home/BlogSection";
import ContactSection from "@/pageComponent/home/ContactSection";
import GallerySection from "@/pageComponent/home/GallerySection";
import useScrollToTop from "@/hooks/useScrollToTop";
import EquipmentCard from "../light/EquipmentCard";
import Covering from "./Covering";
import Kabuki from "./Kabuki";
import SlidingCurtain from "./SlidingCurtain";

import TransCurtain from "./TransCurtail";
// import "@/styles/pages/stageclothes.css";

const StageClothesPage = () => {
  useScrollToTop();

  return (
    <section className="wrapper technical">
      <div className="container">
        <HeroSample heroSectionInfo={heroSectionInfo[8]} />
        <GallerySection
          title="Наши кейсы по одежде сцены"
          galleryType="Одежда сцены"
        />
        <EquipmentCard data={equipmentsCardInfo.stage} title="Одежда сцены" />
        <BigVideoBox
          item={{
            src: Svideo04,
            videoTitle: "Тайм-лапс возведение сцены",
            videoDescription: "Перед концертом Кипелова",
          }}
        />
        <Covering />
        <SlidingCurtain />
        <TransCurtain />
        <Kabuki />
      </div>
      <SwiperSection displayType="Технические услуги" />
      <div className="container">
        <ContactSection title="Рассчитать одежду сцены" />
        <BlogSection />
      </div>
    </section>
  );
};

export default StageClothesPage;
