"use client";

import { Svideo03 } from "@/assets";
import { BigVideoBox } from "@/components/Boxes";
import HeroSample from "@/components/HeroSample/HeroSample";
import SwiperSection from "@/components/Swiper/Swiper";
import { equipmentsCardInfo, heroSectionInfo } from "@/constant/group";
import BlogSection from "@/pageComponent/home/BlogSection";
import ContactSection from "@/pageComponent/home/ContactSection";
import GallerySection from "@/pageComponent/home/GallerySection";
import EquipmentCard from "../light/EquipmentCard";
// import EquipmentCategorySection from "../Light/EquipmentCategorySection";
import useScrollToTop from "@/hooks/useScrollToTop";

const VideoPage = () => {
  useScrollToTop();

  return (
    <section className="wrapper technical">
      <div className="container">
        <HeroSample heroSectionInfo={heroSectionInfo[7]} />
        <GallerySection title="Наши кейсы по видео" galleryType="Видео" />
        <EquipmentCard data={equipmentsCardInfo.video} title="Видео" />
        <BigVideoBox
          item={{
            src: Svideo03,
            videoTitle: "Видео-драйв",
            videoDescription: "Фэндом-концерт Райна Гослинга",
          }}
        />
        {/* <EquipmentCategorySection type="видео" /> */}
      </div>
      <SwiperSection displayType="Технические услуги" />
      <div className="container">
        <ContactSection title="Рассчитать видео" />
        <BlogSection />
      </div>
    </section>
  );
};

export default VideoPage;
