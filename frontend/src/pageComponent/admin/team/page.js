"use client";

import { useState, useEffect } from "react";
import { CreatePageWrapper } from "../AdminSection";
import { TabButton } from "@/components/Buttons";
import { darkAdd } from "@/assets";
import { Typography } from "@mui/material";
import { Input } from "@/components/Inputs";
import { insertTeam } from "@/api/teamAPI";
import LoadingProgress from "@/components/Loading/Loading";
import { useRouter } from "next/navigation";
import { getTeam } from "@/api/teamAPI";


const NewTeam = () => {
  const [formData, setFormData] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getTeam().then((data) => {
      setFormData({
        links: data[0].links,
      });
    });
  }, []);
  // Helper function to parse the initial data from URL parameters
  
  const inputinfo = [
    {
      title: "ссылок",
      name: "links",
      type: "text",
      placeholder: "Введите ссылок",
    },
  ];
  const navigate = useRouter();

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAvatarChange = (e) => {
    setFormData({ ...formData, avatar: e.target.files[0] });
  };

  const handleTeamPicChange = (e) => {
    setFormData({ ...formData, teamPic: e.target.files[0] });
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const dataToSubmit = { ...formData }; // Only `links` is included
    // Call API to insert team
    let newFormData = new FormData();
    Object.keys(formData).forEach((key) => {
      const value = formData[key];
      newFormData.append(key, value);
    });
    insertTeam(newFormData)
      .then((data) => {
        if (data?.error) {
          console.error("Error submitting data:", data.error);
        }
         else {
          navigate.push("/admin/team");
        }
      })
      .catch((err) => console.error("Error occurred:", err))
      .finally(() => setLoading(false));
  };

  return (
    
    <CreatePageWrapper
      title="Команда"
      handleSubmit={handleSubmit}
      link="/admin/team"
      content={
        <>
          <TabButton
            icon={darkAdd}
            title="изображение гендиректора"
            onChange={handleAvatarChange}
          />
          {formData.avatar && (
            <Typography>Selected File: {formData.avatar.name}</Typography>
          )}
          <TabButton
            icon={darkAdd}
            title="изображение команды"
            onChange={handleTeamPicChange}
          />
          {formData.teamPic && (
            <Typography>Selected File: {formData.teamPic.name}</Typography>
          )}
          {inputinfo.map((item, index) => (
            <div key={index}>
              <p className="x16">{item.title}</p>
              <Input
                value={formData.links}
                item={{
                  title: "Ссылки",
                  name: "links",
                  type: "text",
                  placeholder: "Введите ссылку",
                }}
                handleChange={handleChange}
              />
            </div>
          ))}
          {loading && <LoadingProgress />}
        </>
      }
    />
  );
};

export default NewTeam;
