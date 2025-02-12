"use client";

import { useState } from "react";
import { Typography } from "@mui/material";
import { insertThree, updateThree } from "@/api/threeAPI";
import { CreatePageWrapper } from "../AdminSection";
import { TabButton } from "@/components/Buttons";
import { darkAdd } from "@/assets";
import { Input, TextArea } from "@/components/Inputs";
import LoadingProgress from "@/components/Loading/Loading";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

const NewThree = () => {
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
    title1: Data?.title1 || "",
    content1: Data?.content1 || "",
    // title2: Data?.title2 || "",
    // content2: Data?.content2 || "",
    links: Data?.links || "",
  });
  const navigate = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleVideoChange = (e) => {
    setFormData({ ...formData, video: e.target.files[0] });
  };

  const inputinfo = [
    {
      title: "Название",
      name: "title1",
      type: "text",
      placeholder: "ВХОДНАЯ Название1",
    },
    {
      title: "Содержание",
      name: "content1",
      type: "text",
      placeholder: "ВХОДНАЯ Содержание",
    },
    // {
    //   title: "Название2",
    //   name: "title2",
    //   type: "text",
    //   placeholder: "ВХОДНАЯ Название2",
    // },
    // {
    //   title: "Содержание2",
    //   name: "content2",
    //   type: "text",
    //   placeholder: "ВХОДНАЯ Содержание2",
    // },
    // {
    //   title: "ссылок",
    //   name: "links",
    //   type: "text",
    //   placeholder: "ВХОДНАЯ ссылок",
    // },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    let newFormData = new FormData();
    Object.keys(formData).forEach((key) => {
      newFormData.append(key, formData[key]);
    });

    const request = Data
      ? updateThree(Data?.id, newFormData)
      : insertThree(newFormData);

    request
      .then((data) => {
        if (data && data.error) {
          console.log(data.error);
        } else {
          navigate.push("/admin/visualizationTable");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <CreatePageWrapper
      title="Введите здесь данные вашей 3D-визуализации"
      handleSubmit={handleSubmit}
      link="/admin/visualizationTable"
      content={
        <>
          <TabButton
            icon={darkAdd}
            title="Выбрать видео"
            onChange={handleVideoChange}
          />
          {formData.video && (
            <Typography> Выбрать видео: {formData.video.name}</Typography>
          )}
          {inputinfo?.map((item, index) =>
            index % 2 === 0 ? (
              <div key={index}>
                <p className="x16">{item.title}</p>
                <Input
                  value={formData[item.name]}
                  item={item}
                  handleChange={handleChange}
                />
              </div>
            ) : (
              <div key={index}>
                <p className="x16">{item.title}</p>
                <TextArea
                  name={item.name}
                  placeholder={item.placeholder}
                  onChange={handleChange}
                  value={formData[item.name]}
                />
              </div>
            )
          )}
          {loading && <LoadingProgress />}
        </>
      }
    />
  );
};

export default NewThree;
