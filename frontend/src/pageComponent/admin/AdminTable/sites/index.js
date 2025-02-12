"use client";

import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { ChichaBox } from "@/components/ChichaBox";
import { BlackButton } from "@/components/Buttons";
import { DataTable } from "@/components/Tables";
import { useRouter } from "next/navigation";
import { getUserInfo } from "@/api/adminAPI";
import { greyArrow, greyPencil, moveDown, moveUp, redTrash } from "@/assets";
import { deleteSite, getSite } from "@/api/siteAPI";
import { swapId } from "@/api/caseAPI";
import Image from "next/image";

const SitesTable = ({ id }) => {
  const navigate = useRouter();
  const [userInfo, setUserInfo] = useState(null);
  const [sites, setSites] = useState([]);

  const createMediaColumn = (field, headerName) => ({
    field,
    headerName,
    flex: 1,
    renderCell: (params) => {
      const src = field === "images" ? `${params.value[0]}` : `${params.value}`;
      const style =
        field === "video"
          ? { width: 70, height: 50, marginRight: 8, objectFit: "cover" }
          : { width: 50, height: 50, objectFit: "cover" };

      return field === "video" ? (
        <video src={src} alt="media" style={style} controls />
      ) : (
        <Image src={src} alt="media" style={style} />
      );
    },
  });

  const moveRow = (tableData, setTableData, fromIndex, toIndex) => {
    if (toIndex >= 0 && toIndex < tableData?.length) {
      const firstId = tableData[fromIndex].id;
      const secondId = tableData[toIndex].id;
      const formData = {
        firstBlogId: firstId,
        secondBlogId: secondId,
      };
      swapId(formData, 'sites').then(() => {
        getSite().then((data) => {
          let temp = addId(data);
          setSites(temp);
          setTableData(data)
        });
      });
    }
  };

  const handleSiteDelete = (index) => {
    deleteSite(index).then((data) => {
      let temp = addId(data);
      setSites(temp);
    });
  };

  const handleNewCreate = (url) => {
    navigate.push(url);
  };

  const addId = (data) => {
    let temp = [];
    data?.map(
      (item, index) => ((temp[index] = item), (temp[index]._id = index + 1))
    );
    return temp;
  };
  const createActionColumn = (
    type,
    tableData,
    setTableData,
    handleDelete,
    link,
    scrollSpy
  ) => ({
    field: "action",
    headerName: "Действие",
    flex: 2,
    renderCell: (params) => {
      const rowIndex = tableData.findIndex((row) => row.id === params.row.id);

      const handlePreview = () => {
        if (link) {
          navigate.push(link);
          setTimeout(() => {
            const section = document.getElementById(scrollSpy);
            if (section) {
              const sectionY =
                section.getBoundingClientRect().top + window.pageYOffset - 200;
              window.scrollTo({ top: sectionY, behavior: "smooth" });
            }
          }, 300);
        } else {
          navigate.push(`/${type}-one/${params.row.id}`);
        }
      };

      const handleUpdate = () => {
        let url = `/admin/${type}`;
        let Data = params.row;
        const queryParams = new URLSearchParams();
        
        // Convert the Data object to query parameters
        Object.keys(Data).forEach(key => {
          // Handle arrays specially
          if (Array.isArray(Data[key])) {
            queryParams.append(key, JSON.stringify(Data[key]));
          } else {
            queryParams.append(key, Data[key]);
          }
        });

        // Navigate with query parameters
        navigate.push(`${url}?${queryParams.toString()}`);
      };

      return (
        <div
          className="spaceAround adminDirectoryEdit"
          style={{ height: "100%", width: "100%" }}
        >
          {type !== "three" && (
            <Image
              onClick={() => handlePreview()}
              src={greyArrow}
              alt="greyArrow"
            />
          )}
          {userInfo?.editing !== 0 && (
            <Image
              onClick={() => handleUpdate()}
              src={greyPencil}
              alt="greyPencil"
            />
          )}
          {userInfo?.deleting !== 0 && (
            <Image
              onClick={() => handleDelete(params.row.id)}
              src={redTrash}
              alt="redTrash"
            />
          )}
          <Image
            onClick={() =>
              moveRow(tableData, setTableData, rowIndex, rowIndex - 1)
            }
            src={moveUp}
            alt="moveUp"
          />
          <Image
            onClick={() =>
              moveRow(tableData, setTableData, rowIndex, rowIndex + 1)
            }
            src={moveDown}
            alt="moveDown"
          />
        </div>
      );
    },
  });

  const siteColums = [
    { field: "_id", headerName: "ID", flex: 0.5 },
    { field: "name", headerName: "Имя", flex: 1 },
    // { field: "queue", headerName: "Очередь", flex: 1 },
    { field: "site_type", headerName: "Тип", flex: 1 },
    { field: "capacity", headerName: "Вместимость", flex: 1 },
    { field: "address", headerName: "Адрес", flex: 1 },
    { field: "link_page", headerName: "Ссылка Страница", flex: 1 },
    createMediaColumn("video", "Сайт"),
    createActionColumn("site", sites, setSites, handleSiteDelete),
  ];

  useEffect(() => {
    getSite().then((data) => {
      let temp = addId(data);
      setSites(temp);
    });

    getUserInfo().then((data) => {
      setUserInfo(data);
    });
  }, []);

  return (
    <div className="wrapper">
      <div className="section1">
        <ChichaBox
          content={
            <Box id={id}>
              <div className="sectionHeader" style={{ marginBottom: "20px" }}>
                <p className="sectionTitle">Каталог площадок</p>
              </div>
              <br />
              <DataTable id={id} columns={siteColums} data={sites} />
              {userInfo?.adding !== 0 && (
                <BlackButton
                  onClick={() => handleNewCreate("/admin/site")}
                  title={`Добавить`}
                />
              )}
            </Box>
          }
        />
      </div>
    </div>
  );
};

export default SitesTable;
