"use client";

import React, { useEffect, useState } from "react";
import { Typography, Snackbar, Alert } from "@mui/material";
import { NewEventSelectBox } from "@/components/Inputs";
import { NewCaseTypeButton, NewCaseSave } from "@/components/Buttons";
import { bestCaseInfo } from "../AdminTable/bestCase";
import { getCases, updateTagCase } from "@/api/caseAPI";
import { useRouter } from "next/navigation";

const NewEvent = () => {
  const navigate = useRouter();
  const location = useRouter();
  const { isEditing = false, initialData = {} } = location.state || {};
  const [cases, setCases] = useState([]);
  const [data, setData] = useState({
    id: initialData?.id || "",
    name: initialData?.name || "",
    tags: initialData?.tags || [],
  });

  const [alert, setAlert] = useState({
    open: false,
    severity: "success",
    message: "",
  });

  const handleSelTypes = (selectedType) => {
    setData((prev) => {
      const isSelected = prev.tags.includes(selectedType);
      return {
        ...prev,
        tags: isSelected
          ? prev.tags.filter((tags) => tags !== selectedType)
          : [...prev.tags, selectedType],
      };
    });
  };

  const handleSubmit = async () => {
    updateTagCase(data.id, data).then((data) => {
      if (data && data.error) {
        console.log("data.error", data.error);
      } else {
        navigate.push("/admin/eventTable");
      }
    });
  };

  const handleCloseAlert = () => {
    setAlert((prev) => ({ ...prev, open: false }));
  };

  const handleSelectChange = (event) => {
    const selectedName = event.target.value;
    const selectedCase = cases.find(
      (caseItem) => caseItem.name === selectedName
    );
    const selectedId = selectedCase ? selectedCase.id : null;
    setData((prevData) => ({
      ...prevData,
      name: selectedName,
      tags: selectedCase.tags || [],
      id: selectedId,
    }));
  };

  useEffect(() => {
    getCases()
      .then((data) => {
        setCases(data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="adminWrapper">
      <div className="adminDirectorySection">
        <p className="adminDirectoryTitle">Новый кейс</p>
        <div className="newCaseTop">
          <Typography className="x16" style={{ marginBottom: "12px" }}>
            Название кейса
          </Typography>
          <NewEventSelectBox
            cases={cases}
            value={data.name}
            onChange={handleSelectChange}
          />
        </div>
        <p className="newCaseType">Выберите тип кейса</p>
        <div className="alignCenter flexWrap">
          {bestCaseInfo?.map((item, index) => (
            <NewCaseTypeButton
              key={index}
              title={item.title}
              className={data.tags.includes(item.title) ? "selBestCase" : ""}
              onClick={() => handleSelTypes(item.title)}
            />
          ))}
        </div>
        <NewCaseSave
          title={isEditing ? "ОБНОВЛЕНИЕ ДЕЛА" : "СОХРАНИТЬ КЕЙС"}
          onClick={handleSubmit}
        />
      </div>

      <Snackbar
        open={alert.open}
        autoHideDuration={3000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseAlert}
          severity={alert.severity}
          sx={{ width: "100%" }}
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default NewEvent;
