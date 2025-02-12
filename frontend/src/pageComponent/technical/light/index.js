"use client";

import { Svideo01 } from "@/assets";
import { BigVideoBox } from "@/components/Boxes";
import HeroSample from "@/components/HeroSample/HeroSample";
import SwiperSection from "@/components/Swiper/Swiper";
import { equipmentsCardInfo, heroSectionInfo } from "@/constant/group";
import useScrollToTop from "@/hooks/useScrollToTop";
import BlogSection from "@/pageComponent/home/BlogSection";
import ContactSection from "@/pageComponent/home/ContactSection";
import GallerySection from "@/pageComponent/home/GallerySection";
import EquipmentCard from "./EquipmentCard";
// import EquipmentCategorySection from "./EquipmentCategorySection";

const LightPage = () => {
  useScrollToTop();

  return (
    <section className="wrapper technical">
      <div className="container">
        <HeroSample heroSectionInfo={heroSectionInfo[5]} />
        <GallerySection title="Наши кейсы по свету" galleryType="Свет" />
        <EquipmentCard data={equipmentsCardInfo.light} title="Cвет" />
        <BigVideoBox
          item={{
            src: Svideo01,
            videoTitle: "Cветовой Меч",
            videoDescription: "Световой концерт",
          }}
        />
        {/* <EquipmentCategorySection type="свет" type1="light" /> */}
      </div>
      <SwiperSection displayType="Технические услуги" />
      <div className="container">
        <ContactSection title="Рассчитать cвет" />
        <BlogSection />
      </div>
    </section>
  );
};

export default LightPage;
