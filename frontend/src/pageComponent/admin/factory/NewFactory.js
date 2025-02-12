"use client";

import { useState } from "react";
import { Slider, Typography } from "@mui/material";
import { insertFactory, updateFactory } from "@/api/facAPI";
import { CreatePageWrapper } from "../AdminSection";
import { TabButton } from "@/components/Buttons";
import { darkAdd } from "@/assets";
import { Input, TextArea } from "@/components/Inputs";
import LoadingProgress from "@/components/Loading/Loading";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

const NewFactory = () => {
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
    title: Data?.title || "",
    description: Data?.description || "",
    queue: Data?.queue || 0,
    links: Data?.links || "",
  });
  const inputinfo = [
    {
      title: "Заголовок",
      name: "title",
      type: "text",
      placeholder: "Введите Заголовок",
    },
    {
      title: "Описание",
      name: "description",
      type: "text",
      placeholder: "Введите Описание",
    },
    {
      title: "ссылок",
      name: "links",
      type: "text",
      placeholder: "Введите ссылку",
    },
  ];
  const navigate = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleVideoChange = (e) => {
    setFormData({ ...formData, video: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    let newFormData = new FormData();
    Object.keys(formData).forEach((key) => {
      newFormData.append(key, formData[key]);
    });

    const request = Data
      ? updateFactory(Data?.id, newFormData)
      : insertFactory(newFormData);

    request
      .then((data) => {
        if (data && data.error) {
          console.log(data.error);
        } else {
          navigate.push("/admin/factoryshowTable");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getFileType = (url) => {
    const extension = url.split('.').pop().toLowerCase();
    const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "webp"];
    const videoExtensions = ["mp4", "avi", "mov", "wmv", "flv", "mkv", "webm"];

    if (imageExtensions.includes(extension)) {
        return "image";
    } else if (videoExtensions.includes(extension)) {
        return "video";
    } else {
        return "unknown";
    }
  }
  return (
    <CreatePageWrapper
      title="Введите свой #ЗаводШоу подробности здесь"
      handleSubmit={handleSubmit}
      link="/admin/factoryshowTable"
      content={
        <>
          <TabButton
            icon={darkAdd}
            title="Выберите видео или изображение"
            onChange={handleVideoChange}
          />
          {formData.video && (
            <Typography> Выбрать {`${getFileType(formData.video.name) == 'video' ? "видео" : "изображение"}`}: {formData.video.name}</Typography>
          )}
          <Input
            value={formData.title}
            item={inputinfo[0]}
            handleChange={handleChange}
          />
          <TextArea
            name={inputinfo[1].name}
            placeholder={inputinfo[1].placeholder}
            onChange={handleChange}
            value={formData.description}
          />
          {/* <div>
            <p className="x16" style={{ marginBottom: "12px" }}>
              Очередь
            </p>
            <Slider
              min={0}
              max={100}
              value={formData.queue}
              name="queue"
              onChange={handleChange}
              valueLabelDisplay="auto"
            />
          </div> */}
          <Input
            value={formData.links}
            item={inputinfo[2]}
            handleChange={handleChange}
          />

          {loading && <LoadingProgress />}
        </>
      }
    />
  );
};

export default NewFactory;
