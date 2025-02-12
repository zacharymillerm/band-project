"use client";

import { useState } from "react";
import { Typography } from "@mui/material";
import { CreatePageWrapper } from "../AdminSection";
import { TabButton } from "@/components/Buttons";
import { darkAdd } from "@/assets";
import { Input } from "@/components/Inputs";
import { insertParticipant, updateParticipant } from "@/api/participantAPI";
import LoadingProgress from "@/components/Loading/Loading";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

const inputinfo = [
  {
    title: "Данные участника",
    name: "name",
    type: "text",
    placeholder: "Введите фамилию и имя",
  },
  {
    title: "Ссылка",
    name: "link",
    type: "text",
    placeholder: "Введите ссылку",
  },
];

const NewParticipant = () => {
  const location = useRouter();
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  
  // Helper function to parse the initial data from URL parameters
  const getInitialData = () => {
    if (!searchParams.size) return null;
    
    let data = {};
    searchParams.forEach((value, key) => {
      try {
        // Try to parse JSON strings (for arrays)
        data[key] = JSON.parse(value);
      } catch {
        // If not JSON, use the value as is
        data[key] = value;
      }
    });
    return data;
  };

  // Get the data from URL parameters instead of localStorage
  const Data = getInitialData();

  const [formData, setFormData] = useState({
    name: Data?.name || "",
    link: Data?.link || "",
  });

  const navigate = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    let newFormData = new FormData();
    Object.keys(formData).forEach((key) => {
      newFormData.append(key, formData[key]);
    });

    const request = Data
      ? updateParticipant(Data?.id, newFormData)
      : insertParticipant(newFormData);

    request
      .then((data) => {
        if (data && data.error) {
          console.log(data.error);
        } else {
          navigate.push("/admin/rehearsalTable");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <CreatePageWrapper
      title="Введите данные участника здесь"
      handleSubmit={handleSubmit}
      link="/admin/rehearsalTable"
      content={
        <>
          <TabButton
            icon={darkAdd}
            title="Выбрать фото"
            onChange={handleImageChange}
          />
          {formData.image && (
            <Typography>Selected File: {formData.image.name}</Typography>
          )}
          <div>
            {inputinfo.map((item, index) => (
              <div key={index} style={{ marginBottom: "10px" }}>
                <label>{item.title}</label>
                <Input
                  value={formData[item.name]} // Dynamically fetch the correct field value
                  item={item}
                  handleChange={handleChange}
                  required={false}
                />
              </div>
            ))}
          </div>
          {loading && <LoadingProgress />}
        </>
      }
    />
  );
};

export default NewParticipant;
