"use client";

import { useEffect, useState } from "react";
import {
  Autocomplete,
  Box,
  FormControl,
  FormControlLabel,
  // FormGroup,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  Alert,
  Snackbar,
  Tooltip
} from "@mui/material";
import DatePicker from "react-datepicker";
import { insertCase, updateCase } from "@/api/caseAPI";
import { getSite } from "@/api/siteAPI";
import MultipleValueTextInput from "react-multivalue-text-input";
import { Dropzone, FileMosaic } from "@files-ui/react";
import { getThrees } from "@/api/threeAPI";
import { CreatePageWrapper } from "../AdminSection";
import { TabButton } from "@/components/Buttons";
import { darkAdd } from "@/assets";
import { Input, SelectBox, TextArea } from "@/components/Inputs";
import LoadingProgress from "@/components/Loading/Loading";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

const NewCase = () => {
  const [site, setSite] = useState([]);
  const [dData, setDdata] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const navigate = useRouter();

  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

  useEffect(() => {
    getSite().then((data) => {
      setSite(data);
    });
    getThrees().then((data) => {
      setDdata(data);
    });
  }, []);

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
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
    console.log(data);
    return data;
  };

  // Get the data from URL parameters instead of localStorage
  const Data = getInitialData();
  const [formData, setFormData] = useState({
    cities: Data?.cities || [],
    name: Data?.name || "",
    blog_type: Data?.blog_type[0] || "частное",
    startDate: Data?.startDate || "",
    endDate: Data?.endDate || "",
    guests: Data?.guests || "",
    venue: Data?.venue || "",
    d_id: Data?.d_id || "",
    features: Data?.features || "",
    site: Data?.site || "",
    // equipment: Data?.equipment || [],
    // equipment_type: Data?.equipment_type || [],
    video: {name: Data?.video} || {},
    site_type: Data?.site_type || [],
    images: Data?.images || [],
    eventTitle: Data?.eventTitle || "",
    title: Data?.title || "",
    keyword: Data?.keyword || "",
    description: Data?.keyword || "",
  });

  const [cities, setCities] = useState(Data?.cities || []);

  const handleItemAdded = (item) => {
    setCities([...cities, item]);
  };

  const handleItemDeleted = (item) => {
    setCities(cities.filter((city) => city !== item));
  };

  const handleOneCty = (e) => {
    setCities([e.target.value]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === "blog_type") {
      setCities([]);
    }
  };

  const handleVideoChange = (e) => {
    setFormData({ ...formData, video: e.target.files[0] });
  };

  const updateFiles = (incomingFiles) => {
    setFormData({ ...formData, images: incomingFiles });
  };

  const handleChangeDate = (date) => {
    const formattedDate = date
      .toLocaleDateString("ru-RU", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
      .replace(" г.", "");
    setSelectedDate(date);
    setFormData({ ...formData, startDate: formattedDate });
  };

  const handleChangeEndDate = (date) => {
    const formattedDate = date
      .toLocaleDateString("ru-RU", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
      .replace(" г.", "");
    setSelectedEndDate(date);
    setFormData({ ...formData, endDate: formattedDate });
  };

  const handleSiteChange = (event) => {
    setFormData({
      ...formData,
      site: event.target.value, // Update the site value in formData
    });
  };

  const handle3DChange = (event) => {
    setFormData({
      ...formData,
      d_id: event.target.value,
    });
  };

  const inputinfo = [
    {
      title: "Название",
      name: "name",
      type: "text",
      placeholder: "Введите название",
    },
    {
      title: "Тип кейса",
      name: "blog_type",
      type: "text",
      placeholder: "Частное",
      option: ["Все виды мероприятия", "Частное", "Тур", "Корпоративное", "Городское"],
    },
    {
      title: 'Место проведения(Хедлайнер при выборе типа кейса "Тур")',
      name: "venue",
      type: "text",
      placeholder: "Введите данные места проведения",
    },
    {
      title: "Количество гостей",
      name: "guests",
      type: "text",
      placeholder: "Введите количество гостей",
    },
    {
      title: "Описание(особенности)",
      name: "features",
      type: "text",
      placeholder: "Введите описание(Рекомендуется не более 500 символов.)",
    },
    {
      title: "Meta Title",
      name: "title",
      type: "text",
      placeholder: "Заголовок страницы для поисковых систем. Рекомендуется не более 250 символов.",
    },
    {
      title: "Meta Keyword",
      name: "keyword",
      type: "text",
      placeholder: "Список ключевых слов через запятую для поисковых систем.",
    },
    {
      title: "Meta Description",
      name: "description",
      type: "text",
      placeholder: "Краткое описание страницы для поисковых систем. Рекомендуется не более 250 символов.",
    },
    {
      title: "Город",
      name: "city",
      type: "text",
      placeholder: "Введите город",
    },
    {
      title: "Хедлайнер",
      name: "eventTitle",
      type: "text",
      placeholder: "Введите хедлайнера",
    },
  ];

  const typeSite = [
    "Все типы площадок",
    "Рестораны",
    "Конференц-залы",
    "Загородные площадки",
    "Концертные залы",
  ];

  const optionsWhatWeDid = [
    "Свет",
    "Звук",
    "Видео",
    "Одежда сцены",
    "3д-визуализация",
    "Репетиционная база"
  ]

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    let newFormData = new FormData();

    // Helper function to handle array fields
    const appendArray = (key, array) => {
      array.forEach((item) => newFormData.append(key, item));
    };

    // General formData population
    Object.keys(formData).forEach((key) => {
      const value = formData[key];

      if (
        key === "tags" ||
        key === "equipment" ||
        key === "site_type" ||
        key === "equipment_type"
      ) {
        appendArray(`${key}[]`, value);
      } else if (key === "blog_type") {
        newFormData.append("blog_type[]", value);
      } else if (key === "images") {
        value.forEach((file) => newFormData.append("images[]", file.file));
      } else if (key === "checkbox" || key === "cities") {
        appendArray(`${key}[]`, key === "cities" ? cities : value);
      } else {
        newFormData.append(key, value);
      }
    });

    // **Validation: Ensure all required fields**
    const validations = [
      {
        condition: !newFormData.get("video"),
        message: "Перед отправкой выберите видеофайл.",
      },
      {
        condition: formData.images.length === 0,
        message: "Пожалуйста, загрузите хотя бы одно изображение.",
      },
      {
        condition: cities.length === 0,
        message: "Пожалуйста, выберите хотя бы один город.",
      },
      // {
      //   condition: site.length <= 0,
      //   message: "Прежде всего, пожалуйста, создайте сайт.",
      //   // navigateTo: "/admin/site",
      // },
      // { condition: !formData.site, message: "Пожалуйста, выберите сайт." },
      // {
      //   condition: dData.length <= 0,
      //   message: "Прежде всего, пожалуйста, создайте сайт.",
      //   // navigateTo: "/admin/three",
      // },
      // {
      //   condition: !formData.d_id,
      //   message: "Пожалуйста, выберите 3D-визуализацию.",
      // },
      {
        condition:
          formData.title.length > 250 ||
          formData.keyword.length > 250 ,
        message: "Длина заголовка и ключевых слов не должна превышать 250 символов."
      },
      {
        condition:
          formData.description.length > 500,
        message: "Описание не должно превышать 500 символов."
      }
    ];

    for (const validation of validations) {
      if (validation.condition) {
        console.log('validation:', validation);
        setLoading(false);
        setAlertMessage(validation.message);
        setAlertOpen(true);
        if (validation.navigateTo) {
          navigate.push(validation.navigateTo);
        }
        return;
      }
    }

    // Handle the request for insertion or update
    const request = Data
      ? updateCase(Data?.id, newFormData)
      : insertCase(newFormData);
    request
      .then((data) => {
        if (data?.error) {
          if (data.error === 400 && data.message === "Name already exists") {
            setAlertMessage(
              "Ошибка: Имя блога уже существует. Пожалуйста, выберите другое имя."
            );
            setAlertOpen(true);
          } else {
            console.log(data.error);
          }
        } else {
          navigate.push("/admin/eventTable");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <CreatePageWrapper
      title="Введите данные нового кейса события здесь"
      handleSubmit={handleSubmit}
      link="/admin/eventTable"
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

          <Dropzone onChange={updateFiles} value={formData.images} localization={"RU-ru"} label="Выбрать изображения" footer={false}>
            {formData.images.map((file, index) => (
              <FileMosaic key={index} {...{
                name: file.name || `${index+1}.png`,
                imageUrl: file.file || file
              }} preview darkMode />
            ))}
          </Dropzone>

          <div>
            <p className="x16" style={{ marginBottom: "12px" }}>
              {inputinfo[0].title}
            </p>
            <Input
              value={formData[inputinfo[0].name]}
              item={inputinfo[0]}
              handleChange={handleChange}
            />
          </div>

          <div>
            <p className="x16">{inputinfo[1].title}</p>
            <SelectBox
              value={formData[inputinfo[1].name]}
              item={inputinfo[1]}
              handleSelect={handleChange}
            />
          </div>

          <div>
            <p className="x16" style={{ marginBottom: "12px" }}>
              Город проведения
            </p>
            {formData[inputinfo[1].name] === "Тур" ? (
              <MultipleValueTextInput
                className="InputText x14 alignCenter"
                onItemAdded={handleItemAdded}
                onItemDeleted={handleItemDeleted}
                name="city-input"
                placeholder="Введите названия городов, разделяя их ЗАПЯТОЙ или нажимая клавишу ENTER."
                values={cities}
              />
            ) : (
              <Input
                value={formData[inputinfo[8].name]}
                item={inputinfo[8]}
                handleChange={handleOneCty}
              />
            )}
          </div>

          <div>
            <p className="x16" style={{ marginBottom: "12px" }}>
              {formData.type === "тур" ? "Участник" : 'Место проведения(Хедлайнер при выборе типа кейса "Тур")'}
            </p>
            <Input
              value={formData[inputinfo[2].name]}
              item={inputinfo[2]}
              handleChange={handleChange}
              required={false}
            />
          </div>
          <div>
            <p className="x16" style={{ marginBottom: "12px" }}>
              Время проведения :{" "}
            </p>
            <div className="alignCenter ">
              <DatePicker
                name="date"
                className="datePicker InputText x14 alignCenter"
                selected={selectedDate}
                onChange={handleChangeDate}
                value={formData.startDate}
                dateFormat="yyyy/MM/dd"
                required
              />
              &nbsp;~&nbsp;
              <DatePicker
                name="date"
                className="datePicker InputText x14 alignCenter"
                selected={selectedEndDate}
                onChange={handleChangeEndDate}
                value={formData.endDate}
                dateFormat="yyyy/MM/dd"
                required
              />
            </div>
          </div>

          <div>
            <p className="x16" style={{ marginBottom: "12px" }}>
              {formData.type === "тур" ? "Вместимость людей" : 'Гости(Общая протяженность при выборе типа кейса "Тур")'}
            </p>
            <Input
              value={formData[inputinfo[3].name]}
              item={inputinfo[3]}
              handleChange={handleChange}
            />
          </div>

          <div>
            <p className="x16" style={{ marginBottom: "12px" }}>
              Хедлайнер
            </p>
            <Input
              value={formData[inputinfo[9].name]}
              item={inputinfo[9]}
              handleChange={handleChange}
              required={false}
            />
          </div>

          <div>
            <p className="x16" style={{ marginBottom: "12px" }}>
              {inputinfo[4].title}
            </p>
            <TextArea
              name={inputinfo[4].name}
              value={formData[inputinfo[4].name]}
              onChange={handleChange}
              placeholder={inputinfo[4].placeholder}
            />
          </div>

          <Box sx={{ width: "100%" }}>
            <p className="x16" style={{ marginBottom: "12px" }}>
              Что мы делали
            </p>
            <Autocomplete
              multiple
              id="tags-outlined"
              options={optionsWhatWeDid}
              getOptionLabel={(option) => option}
              filterSelectedOptions
              value={formData?.site_type}
              onChange={(event, newValue) => {
                setFormData({ ...formData, site_type: newValue });
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Выберите соответствующие пункты"
                  className="InputText x14 alignCenter"
                  sx={{ backgroundColor: "white" }}
                />
              )}
            />
          </Box>

          <div>
            <p className="x16" style={{ marginBottom: "12px" }}>
              {inputinfo[5].title}
            </p>
            <Input
              value={formData[inputinfo[5].name]}
              item={inputinfo[5]}
              handleChange={handleChange}
            />
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

          <Box>
            <FormControl>
              <p className="x16" style={{ marginBottom: "12px" }}>
                Выбор площадки
              </p>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={formData.site}
                onChange={handleSiteChange}
              >
                {site?.map((item, index) => (
                  <FormControlLabel
                    key={index}
                    value={item.id}
                    control={
                      <Radio
                        sx={{
                          "& .MuiSvgIcon-root": {
                            fontSize: "20px",
                            color: "#CFCFCF",
                          },
                        }}
                      />
                    }
                    label={
                      <div
                        className="alignCenter"
                      >
                        <Tooltip title={<span className="tooltip">{item.name}</span>}>
                          <video
                            src={`${item.video}`}
                            alt={item.name}
                            style={{ width: 80, height: 80, marginRight: 8 }}
                            controls
                          >
                            Ваш браузер не поддерживает тег видео.
                          </video>
                        </Tooltip>
                      </div>
                    }
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Box>
          <Box>
            <FormControl>
              <p className="x16" style={{ marginBottom: "12px" }}>
                3D визуализация
              </p>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={formData.d_id}
                onChange={handle3DChange}
              >
                {dData?.map((item, index) => (
                  <FormControlLabel
                    key={index}
                    value={item.id}
                    control={
                      <Radio
                        sx={{
                          "& .MuiSvgIcon-root": {
                            fontSize: "20px",
                            color: "#CFCFCF",
                          },
                        }}
                      />
                    }
                    label={
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <Tooltip title={<span className="tooltip">{item.title1}</span>}>
                        <video
                          src={`${item.video}`}
                          alt={index}
                          style={{ width: 80, height: 80, marginRight: 8 }}
                          controls
                        >
                          Your browser does not support the video tag.
                        </video>
                        </Tooltip>
                      </div>
                    }
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Box>
          {loading && <LoadingProgress />}

          <Snackbar
            open={alertOpen}
            autoHideDuration={6000}
            onClose={handleCloseAlert}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert
              onClose={handleCloseAlert}
              severity="primary"
              sx={{ width: "100%" }}
            >
              {alertMessage}
            </Alert>
          </Snackbar>
        </>
      }
    />
  );
};

export default NewCase;
