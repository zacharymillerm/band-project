"use client";

import { useState } from "react";
import {
  Autocomplete,
  Box,
  Slider,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { insertSite, updateSite } from "@/api/siteAPI";
import { CreatePageWrapper } from "../AdminSection";
import { Input, SelectBox } from "@/components/Inputs";
import { TabButton } from "@/components/Buttons";
import { darkAdd } from "@/assets";
import LoadingProgress from "@/components/Loading/Loading";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

const NewSite = () => {
  
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
    site_type: Data?.site_type || [],
    capacity: Data?.capacity || "",
    address: Data?.address || "",
    link_page: Data?.link_page || "",
    tags: Data?.tags || [],
    siteTags: Data?.siteTags || [],
    equipment_type: Data?.equipment_type || [],
    blog_type: Data?.blog_type[0] || "",
    queue: Data?.queue || 0,
    cities: Data?.cities[0] || "",
    title: Data?.title || "",
    keyword: Data?.keyword || "",
    description: Data?.keyword || "",
  });

  const CustomSlider = styled(Slider)({
    color: "#1976d2",
    margin: 0,
    "& .MuiSlider-thumb": {
      backgroundColor: "#FFFFFF",
    },
    "& .MuiSlider-rail": {
      color: "var(--secondaryWhiteColor)",
      opacity: "1",
    },
    "& .MuiSlider-track": {
      color: "#FFFFFF",
      border: "none",
    },
  });

  const marks = [
    { value: 0, capacity: 0, label: "0" },
    { value: 1, capacity: 30, label: "30" },
    { value: 2, capacity: 50, label: "50" },
    { value: 3, capacity: 100, label: "100" },
    { value: 4, capacity: 150, label: "150" },
    { value: 5, capacity: 200, label: "200" },
    { value: 6, capacity: 300, label: "300" },
    { value: 7, capacity: 500, label: "500" },
    { value: 8, capacity: 700, label: "700" },
    { value: 9, capacity: 1000, label: "1000+" },
  ];

  const inputinfo = [
    {
      title: "Название площадки",
      name: "name",
      type: "text",
      placeholder: "Название",
    },
    {
      title: "ТИП ПЛОЩАДКИ",
      name: "site_type",
      placeholder: "ТИП",
      option: [
        "Рестораны",
        "Конференц-залы",
        "Загородные площадки",
        "Концертные залы",
      ],
    },
    // {
    //   title: "ЕМКОСТЬ",
    //   name: "capacity",
    //   type: "number",
    //   placeholder: "ВХОДНАЯ ЕМКОСТЬ",
    // },
    {
      title: "Ссылка на страницу площадки",
      name: "link_page",
      type: "text",
      placeholder: "Ссылка на площадку",
    },
    {
      title: "ГОРОД",
      name: "cities",
      type: "text",
      placeholder: "ГОРОД",
    },
    {
      title: "АДРЕС",
      name: "address",
      type: "text",
      placeholder: "АДРЕС",
    },
    {
      title: "ТИП КЕЙСА",
      name: "blog_type",
      placeholder: "ВХОДНАЯ ТИП",
      option: [
        "Все типы площадок",
        "Рестораны",
        "Конференц залы",
        "Загородные площадки",
        "Концертные залы"
      ],
    },
    {
      title: "Meta Title",
      name: "title",
      type: "text",
      placeholder: "Meta Title",
    },
    {
      title: "Meta Keyword",
      name: "keyword",
      type: "text",
      placeholder: "Meta Keyword",
    },
    {
      title: "Meta Description",
      name: "description",
      type: "text",
      placeholder: "Meta Description",
    },
  ];

  const tagCurrencies = [
    "Свет",
    "Звук",
    "Видео",
    "3Д",
    "Одежда сцены",
    "Репетиционная база",
  ];
  const typeEquipment = ["Парковка", "Гримёрные комнаты", "Проекторы и экраны"];
  const navigate = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "capacity" ? marks[value].capacity : value,
    });
  };

  const handleVideoChange = (e) => {
    setFormData({ ...formData, video: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    let newFormData = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "tags") {
        formData[key].forEach((item) => newFormData.append("tags[]", item));
      } else if (key === "cities") {
        newFormData.append("cities[]", formData[key]);
      } else if (key === "equipment_type") {
        formData[key].forEach((item) =>
          newFormData.append("equipment_type[]", item)
        );
      } else if (key === "site_type") {
        formData[key].forEach((item) =>
          newFormData.append("site_type[]", item)
        );
      } else if (key === "blog_type") {
        newFormData.append("blog_type[]", formData[key]);
      } else if (key === "siteTags") {
          newFormData.append("siteTags", JSON.stringify(siteTags))
      } else if (key === "video") {
        newFormData.append("video", formData[key]);
      
      } else {
        newFormData.append(key, formData[key]);
      }
    });

    const request = Data
      ? updateSite(Data?.id, newFormData)
      : insertSite(newFormData);

    request
      .then((data) => {
        if (data && data.error) {
          console.log(data.error);
        } else {
          navigate.push("/admin/sitesTable");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const [siteTags, setSiteTags] = useState([]);
  const [siteTagName, setSiteTagName] = useState('');
  const [siteTagCapacity, setSiteTagCapacity] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);  // For tracking the tag being edited

  const handleAddTag = () => {
    if (editingIndex !== null) { // If editing an existing tag
      const updatedTags = siteTags.map((tag, index) =>
        index === editingIndex
          ? { ...tag, name: siteTagName, capacity: siteTagCapacity }
          : tag
      );
      setSiteTags(updatedTags);
      setEditingIndex(null); // Clear editing index after updating
    } else { // Adding a new tag
      if (siteTagName && siteTagCapacity) {
        setSiteTags([...siteTags, { name: siteTagName, capacity: siteTagCapacity }]);
      }
    }
    setSiteTagName('');
    setSiteTagCapacity('');
  };

  const handleEditTag = (index) => {
    const tagToEdit = siteTags[index];
    setSiteTagName(tagToEdit.name);
    setSiteTagCapacity(tagToEdit.capacity);
    setEditingIndex(index); // Set the editing index
  };

  const handleDeleteTag = (index) => {
    const updatedTags = siteTags.filter((_, i) => i !== index);
    setSiteTags(updatedTags);
  };

  return (
    <CreatePageWrapper
      title="Введите данные новой площадки здесь"
      handleSubmit={handleSubmit}
      link="/admin/sitesTable"
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

          {inputinfo?.map((item, index) => {
            if (index === 5 || index === 6 || index === 7 || index === 8 ) {
              // Skip this index.
              return null;
            }

            if (index === 1) {
              // Special case for "site_type".
              return (
                <div key={index}>
                  <Typography variant="x16">{item.title}</Typography>
                  <Autocomplete
                    multiple
                    id="tags-outlined"
                    options={item.option}
                    getOptionLabel={(option) => option}
                    filterSelectedOptions
                    value={formData?.site_type}
                    onChange={(event, newValue) => {
                      setFormData({ ...formData, site_type: newValue });
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        placeholder="Click to Add more"
                        className="InputText x14 alignCenter"
                        sx={{ backgroundColor: "white" }}
                      />
                    )}
                  />
                </div>
              );
            }

            // Default case for other inputs.
            return (
              <div key={index}>
                <Typography className="x16" style={{ marginBottom: "12px" }}>
                  {item.title}
                </Typography>
                <Input
                  value={formData[item.name]}
                  item={item}
                  handleChange={handleChange}
                />
              </div>
            );
          })}

          <Box sx={{ width: "100%" }}>
            <Typography variant="x16" style={{ textTransform: "uppercase" }}>
              Теги площадки
            </Typography>
            <Autocomplete
              multiple
              id="tags-outlined"
              options={tagCurrencies}
              getOptionLabel={(option) => option}
              filterSelectedOptions
              value={formData?.tags}
              onChange={(event, newValue) => {
                setFormData({ ...formData, tags: newValue });
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Нажмите, чтобы добавить"
                  className="InputText x14 alignCenter"
                  sx={{ backgroundColor: "white" }}
                />
              )}
            />
          </Box>
          <div style={{ paddingBottom: "30px", width: "100%" }}>
            <div
              className="spaceBetween"
              style={{ color: "white", marginBottom: "10px" }}
            >
              <p style={{ textTransform: "uppercase" }}>Вместимость</p>
              {/* <p>{Data.capacity}</p> */}
            </div>
            <CustomSlider
              aria-label="Restricted values"
              valueLabelDisplay="auto"
              name="capacity"
              step={null}
              marks={marks}
              min={0}
              max={9}
              onChange={handleChange}
              value={
                formData.capacity
                  ? marks.findIndex(
                      (mark) => mark.capacity === formData.capacity
                    )
                  : 0
              }
            />
            <div className="spaceBetween slideNumber">
              <p>0</p>
              <p>30</p>
              <p>50</p>
              <p>100</p>
              <p>150</p>
              <p>200</p>
              <p>300</p>
              <p>500</p>
              <p>700</p>
              <p>1000</p>
              {/* {marks.map((item, index) => (
                  <p key={index} className="slideNumber">
                    {item.label}
                  </p>
                ))} */}
            </div>
          </div>
          <Box sx={{ width: "100%" }}>
            <Typography style={{ textTransform: "uppercase" }}>
              Виды оснащения
            </Typography>
            <Autocomplete
              multiple
              id="tags-outlined"
              options={typeEquipment}
              getOptionLabel={(option) => option}
              filterSelectedOptions
              value={formData?.equipment_type}
              onChange={(event, newValue) => {
                setFormData({ ...formData, equipment_type: newValue });
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Нажмите, чтобы добавить"
                  className="InputText x14 alignCenter"
                  sx={{ backgroundColor: "white" }}
                />
              )}
            />
          </Box>
          <Box sx={{ width: "100%" }}>
            <Typography>{inputinfo[5].title}</Typography>
            <SelectBox
              value={formData[inputinfo[5].name]}
              item={inputinfo[5]}
              handleSelect={handleChange}
            />
          </Box>

          <div className="">
            <div>
              <h2>Дополнительные мини-теги</h2>
              <div className="spaceAround X16" style={{ marginBottom: "16px" }}>
                <input
                  className="InputText x16 alignCenter"
                  style={{ marginRight: "12px", width: "50%" }}
                  type="text"
                  placeholder="Название тега"
                  value={siteTagName}
                  onChange={(e) => setSiteTagName(e.target.value)}
                />
                
                <input
                  className="InputText x16 alignCenter"
                  style={{ marginLeft: "12px", width: "50%" }}
                  type="number"
                  placeholder="Содержание тега"
                  value={siteTagCapacity}
                  onChange={(e) => setSiteTagCapacity(e.target.value)}
                />
              </div>
              <button type="button" className="defaultButton" onClick={handleAddTag} style={{ marginBottom:"12px" }}>
                {editingIndex !== null ? 'Сохранить изменения' : 'Добавить тег'}
              </button>
            </div>
            {siteTags.length > 0 ? (
              <ul className="x14" style={{ marginBottom: "12px" }}>
                {siteTags.map((tag, index) => (
                  <li key={index} style={{ display: 'flex', alignItems: 'center', margin: '8px 0' }}>
                    <input
                      className="InputText x16 alignCenter"
                      style={{ marginRight: "12px", width: "50%" }}
                      type="text"
                      value={tag.name}
                      readOnly // Making input read-only to display value
                    />
                    <input
                      className="InputText x16 alignCenter"
                      style={{ marginLeft: "12px", width: "50%" }}
                      type="number"
                      value={tag.capacity}
                      readOnly // Making input read-only to display value
                    />
                    <button type="button" className="defaultButton" onClick={() => handleEditTag(index)} style={{ marginLeft: "8px" }}>Редактировать</button>
                    <button type="button" onClick={() => handleDeleteTag(index)} style={{ marginLeft: "8px" }}>X</button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="x16">Теги сайта пока не добавлены.</p>
            )}
          </div>

          <div>
            <p className="x16" style={{ marginBottom: "12px" }}>
              {inputinfo[6].title}
            </p>
            <Input
              value={formData[inputinfo[6].name]}
              item={inputinfo[6]}
              handleChange={handleChange}
            />
          </div>

          <div>
            <p className="x16" style={{ marginBottom: "12px" }}>
              {inputinfo[7].title}
            </p>
            <Input
              value={formData[inputinfo[7].name]}
              item={inputinfo[7]}
              handleChange={handleChange}
            />
          </div>

          <div>
            <p className="x16" style={{ marginBottom: "12px" }}>
              {inputinfo[8].title}
            </p>
            <Input
              value={formData[inputinfo[8].name]}
              item={inputinfo[8]}
              handleChange={handleChange}
            />
          </div>
          {loading && <LoadingProgress />}
        </>
      }
    />
  );
};

export default NewSite;
