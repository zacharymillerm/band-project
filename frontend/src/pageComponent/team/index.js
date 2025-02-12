"use client";

import { useEffect, useState } from "react";
import useScrollToTop from "../../hooks/useScrollToTop";
import MasterSection from "./MasterSection";
import PlantHero from "./PlantHero";
import PlantShowSection from "./PlantShowSection";
import { getTeam } from "../../api/teamAPI";
import { teamPageInfo } from "../../constant/group";
import LoadingChicha from "@/components/LoadingChicha/LoadingChicha";


const Team = () => {
  useScrollToTop();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getTeam();
        if (result) {
          setData(result);
        }
      } catch (error) {
        console.error("Error fetching team data:", error);
      } finally {
        setLoading(false); 
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="displayCenter"><LoadingChicha /></div>; 
  }

  return (
    <>
      <section className="wrapper">
        <PlantHero team={teamPageInfo} avatar={data[0]?.avatar} />
        <div className="container">
          <PlantShowSection team={teamPageInfo[0]} />
          <MasterSection links={data[0]?.links} teamImg={data[0]?.teamPic} />
        </div>
      </section>
    </>
  );
};

export default Team;