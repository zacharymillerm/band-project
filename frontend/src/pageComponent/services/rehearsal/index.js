"use client";

import { useEffect, useState } from "react";
import { heroSectionInfo } from "@/constant/group";
import HeroSample from "@/components/HeroSample/HeroSample";
import Auditorium from "./Auditorium";
import Scene from "./Scene";
import Electricity from "./Electricity";
import UserList from "./UserList";
import ContactSection from "@/pageComponent/home/ContactSection";
import BlogSection from "@/pageComponent/home/BlogSection";
import RentalCost from "./RentalCost";
import useScrollToTop from "@/hooks/useScrollToTop";
import { getShowParticipant } from "@/api/participantAPI";

const RehearsalPage = () => {
  const [participant, setParticipant] = useState([]);
  useEffect(() => {
    getShowParticipant(8).then((data) => {
      data && setParticipant(data);
    });
  }, []);

  useScrollToTop();

  return (
    <div className="wrapper">
      <div className="container">
        <HeroSample heroSectionInfo={heroSectionInfo[1]} />
        <div
          className="sectionWrapper"
          style={{ display: "grid", gap: "clamp(20px, 2vw, 40px)" }}
        >
          <Auditorium />
          <Scene />
          <Electricity />
        </div>
        <UserList
          title="На этой базе репетировали"
          userListInfo={participant}
        />
        <RentalCost />
        <ContactSection title="Заказать расчёт аренды" />
        <BlogSection />
      </div>
    </div>
  );
};

export default RehearsalPage;
