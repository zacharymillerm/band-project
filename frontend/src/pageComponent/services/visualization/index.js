"use client";

import WorkProcess from "./WorkProcess";
import SwiperSection from "@/components/Swiper/Swiper";
import ExampleCase from "./ExampleCase";
import { heroSectionInfo, workProcessInfo } from "@/constant/group";
import ContactSection from "@/pageComponent/home/ContactSection";
import BlogSection from "@/pageComponent/home/BlogSection";
import { BigVideoBox } from "@/components/Boxes";
import { samplePDF, stage3d, visualization3d } from "@/assets";
import useScrollToTop from "@/hooks/useScrollToTop";
import HeroSample from "@/components/HeroSample/HeroSample";

const VisualizationPage = () => {
  useScrollToTop();
  return (
    <div className="wrapper visualization">
      <div className="container ">
        <HeroSample heroSectionInfo={heroSectionInfo[0]} />
        <BigVideoBox
          item={{
            title: "Cцена",
            subTitle:
              "Смоделируем несколько вариантов оформления сцены и выберем наиболее подходящий под требования",
            src: visualization3d,
          }}
        />
        <WorkProcess
          title1="3D-визуализация"
          title2="Наш процесс работы"
          data={workProcessInfo}
          fileName="document.pdf"
          url={samplePDF}
        />
        <ExampleCase />
      </div>
      <SwiperSection displayType="3D" />
      <div className="container ">
        <ContactSection title="Заказать расчёт 3D" />
        <BlogSection />
      </div>
    </div>
  );
};

export default VisualizationPage;
