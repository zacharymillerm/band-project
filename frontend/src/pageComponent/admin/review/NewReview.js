"use client";

import { useState } from "react";
import {
  Autocomplete,
  Box,
  Slider,
  TextField,
  Typography,
} from "@mui/material";
import { insertReview, updateReview } from "@/api/reviewAPI";
import { CreatePageWrapper } from "../AdminSection";
import { TabButton } from "@/components/Buttons";
import { Input, SelectBox, TextArea } from "@/components/Inputs";
import { darkAdd } from "@/assets";
import LoadingProgress from "@/components/Loading/Loading";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

const NewReview = () => {
  const navigate = useRouter();
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
    type: Data?.type || "Text",
    name: Data?.name || "",
    content: Data?.content || "",
    displayType: Data?.displayType || [],
  });
  const currency = {
    name: "type",
    option: ["Text", "Video"],
  };
  const inputinfo = [
    { title: "Имя", name: "name", type: "text", placeholder: "Введите имя" },
    {
      title: "Содержание",
      name: "content",
      type: "text",
      placeholder: "Введите содержание",
    },
  ];
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, files: e.target.files[0] });
  };

  const handleAvatarChange = (e) => {
    setFormData({...formData, avatar: e.target.files[0]});
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    let newFormData = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "displayType") {
        formData[key].forEach((item) =>
          newFormData.append("displayType[]", item)
        );
      } else {
        newFormData.append(key, formData[key]);
      }
    });

    console.log('newFormData:', newFormData);

    const request = Data
      ? updateReview(Data?.id, newFormData)
      : insertReview(newFormData);

    request
      .then((data) => {
        if (data && data.error) {
          console.log(data.error);
        } else {
          navigate.push("/admin/reviewTable");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const displayType = {
    title: "Разделы, где будет отображен отзыв",
    name: "displayType",
    type: "text",
    placeholder: "Выберите разделы",
    option: ["Технические услуги", "Продакшн", "3D"],
  };

  return (
    <CreatePageWrapper
      title="Введите данные вашего отзыва здесь"
      handleSubmit={handleSubmit}
      link="/admin/reviewTable"
      content={
        <>
          <div>
            <p className="x16">тип</p>
            <SelectBox
              value={formData.type}
              item={currency}
              handleSelect={handleChange}
            />
          </div>
          <TabButton
            icon={darkAdd}
            title={
              formData.type === "Text" ? "Выбрать изображение" : "Выбрать видео"
            }
            onChange={handleFileChange}
          />
          {formData.files && (
            <Typography> Выбрать видео: {formData.files.name}</Typography>
          )}

          <TabButton
            icon={darkAdd}
            title={"Выбрать аватар изображение"}
            onChange={handleAvatarChange}
          />
          {formData.avatar && (
            <Typography> Выбрать видео: {formData.avatar.name}</Typography>
          )}
          <Input
            value={formData.name}
            item={inputinfo[0]}
            handleChange={handleChange}
          />
          <TextArea
            name={inputinfo[1].name}
            placeholder={inputinfo[1].placeholder}
            onChange={handleChange}
            value={formData.content}
          />
          {/* <div>
            <p className='x16'>{displayType.title}</p>
            <SelectBox value={formData[displayType.name]} item={displayType} handleSelect={handleChange} />
          </div> */}
          <Box sx={{ width: "100%" }}>
            <Typography variant="h6">{displayType.title}</Typography>
            <Autocomplete
              multiple
              id="tags-outlined"
              options={displayType.option}
              getOptionLabel={(option) => option}
              filterSelectedOptions
              value={formData?.checkbox}
              onChange={(event, newValue) => {
                setFormData({ ...formData, displayType: newValue });
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder={displayType.placeholder}
                  className="InputText x14 alignCenter"
                  sx={{ backgroundColor: "white" }}
                />
              )}
            />
          </Box>

          {loading && <LoadingProgress />}
        </>
      }
    />
  );
};

export default NewReview;
