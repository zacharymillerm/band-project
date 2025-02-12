"use client";

import { showdevelopment, Svideo06 } from "@/assets";
import { BigVideoBox } from "@/components/Boxes";
import HeroSample from "@/components/HeroSample/HeroSample";
import { heroSectionInfo, workProcessInfo2 } from "@/constant/group";
import PendingSection from "@/pageComponent/home/PendingSection";
import WorkProcess from "../visualization/WorkProcess";
import ShowCreation from "./ShowCreation";
import UserList from "../rehearsal/UserList";
import ContactSection from "@/pageComponent/home/ContactSection";
import BlogSection from "@/pageComponent/home/BlogSection";
import ShowConcept from "./showconcept";
import useScrollToTop from "@/hooks/useScrollToTop";
import { useEffect, useState } from "react";
import { getShowParticipant } from "@/api/participantAPI";

const ShowDevelopmentPage = () => {
  useScrollToTop();
  const [participant, setParticipant] = useState([]);
  useEffect(() => {
    getShowParticipant(4).then((data) => {
      data && setParticipant(data);
    });
  }, []);

  return (
    <div className="wrapper">
      <div className="container">
        <HeroSample heroSectionInfo={heroSectionInfo[2]} />
        <ShowCreation />
        <ShowConcept />
        <PendingSection />
        <BigVideoBox
          item={{
            titleCenter: true,
            videoTitle: "Пример 3D-визуализации для шоу",
            src: showdevelopment,
          }}
        />
        <WorkProcess
          arrowWidth="115px"
          title1="Подготовка, реализация и проведение шоу"
          data={workProcessInfo2}
          fileName="development"
        />
        <BigVideoBox
          item={{
            titleCenter: true,
            title: "Пример реальной установки сцены",
            src: Svideo06,
            videoTitle: "Тайм-лапс возведение сцены",
            videoDescription: "Перед концертом Кипелова",
          }}
        />
        <UserList
          title="Создавали шоу вместе с нами"
          userListInfo={participant}
        />
        <ContactSection title="Заказать расчёт шоу" />
        <BlogSection />
      </div>
    </div>
  );
};

export default ShowDevelopmentPage;
