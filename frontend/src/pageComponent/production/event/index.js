"use client";

import EventWorks from "./EventWorks";
import useScrollToTop from "@/hooks/useScrollToTop";
import HeroSample from "@/components/HeroSample/HeroSample";
import GallerySection from "@/pageComponent/home/GallerySection";
import WorkProcess from "../../services/visualization/WorkProcess";
import SwiperSection from "@/components/Swiper/Swiper";
import PendingSection from "@/pageComponent/home/PendingSection";
import ContactSection from "@/pageComponent/home/ContactSection";
import BlogSection from "@/pageComponent/home/BlogSection";
import { BigVideoBox } from "@/components/Boxes";

import { workProcessInfo3, heroSectionInfo } from "@/constant/group";
import { useEffect, useState } from "react";
import { getCasesByType } from "@/api/caseAPI";
import { productionEvent } from "@/assets";

const EventPage = () => {
  useScrollToTop();

  const [caseData, setCaseData] = useState({});
  useEffect(() => {
    getCasesByType("частное").then((data) => {
      data && setCaseData(data[0]);
    });
  }, []);
  useScrollToTop();

  return (
    <section className="wrapper events">
      <div className="container">
        <HeroSample heroSectionInfo={heroSectionInfo[3]} />
        <GallerySection title="Кейсы по событиям" galleryType="События" />
        <EventWorks />
        <WorkProcess
          arrowWidth="210px"
          title1="Cобытие"
          title2="Наш процесс работы"
          data={workProcessInfo3}
          fileName="event"
        />
      </div>
      <SwiperSection displayType="Продакшн" />
      <div className="container">
        <PendingSection />
        <BigVideoBox
          item={{
            titleCenter: false,
            title: "Видео с мероприятия",
            src: `${caseData?.video || productionEvent}`,
            videoTitle: caseData?.venue,
            videoDescription: caseData?.name,
          }}
        />
        <ContactSection title="Рассчитать продакшн" />
        <BlogSection />
      </div>
    </section>
  );
};

export default EventPage;
