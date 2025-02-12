"use client";

import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { ChichaBox } from "@/components/ChichaBox";
import { BlackButton } from "@/components/Buttons";
import { DataTable } from "@/components/Tables";
import { getUserInfo } from "@/api/adminAPI";
import { greyArrow, greyPencil, moveDown, moveUp, redTrash } from "@/assets";
import { getTeam } from "@/api/teamAPI";
import { swapId } from "@/api/caseAPI";
import { useRouter } from "next/navigation";
import Image from "next/image";

const NewTeamTable = ({ id }) => {
  const navigate = useRouter();
  const [userInfo, setUserInfo] = useState(null);
  const [team, setTeam] = useState([]);

  const moveRow = (tableData, setTableData, fromIndex, toIndex) => {
    if (toIndex >= 0 && toIndex < tableData?.length) {
      const firstId = tableData[fromIndex].id;
      const secondId = tableData[toIndex].id;
      const formData = {
        firstBlogId: firstId,
        secondBlogId: secondId,
      };
      swapId(formData, 'team').then(() => {
        getTeam().then((data) => {
          let temp = addId(data);
          setTeam(temp);
          setTableData(data)
        });
      });
    }
  };

  const handleNewCreate = (url) => {
    // navigate.push(url);
    getTeam().then((data) => {
      let Data = data[0];
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
        ;
      !Data ? navigate.push(url) : navigate.push(`${url}?${queryParams.toString()}`);
    });
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

  const teamColumns = [
    { field: "_id", headerName: "ID", flex: 0.5 },
    { field: "links", headerName: "Ссылка", flex: 5 },
    // { field: "tag2", headerName: "Тег2", flex: 1 },
    // { field: "tag3", headerName: "Тег3", flex: 1 },
    // { field: "tag4", headerName: "Тег4", flex: 1 },
    // { field: "tag5", headerName: "Тег5", flex: 1 },
    // { field: "tag6", headerName: "Тег6", flex: 1 },
    // { field: "tag7", headerName: "Тег7", flex: 1 },
    // { field: "tag8", headerName: "Тег8", flex: 1 },
    createActionColumn("team", team, setTeam, () => {
      console.log("handleTeamDelete");
    }),
  ];

  useEffect(() => {
    getTeam().then((data) => {
      let temp = addId(data);
      setTeam(temp);
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
                <p className="sectionTitle">Команда</p>
              </div>
              <br />
              <DataTable id={id} columns={teamColumns} data={team} />
              {
                userInfo?.adding !== 0 && (
                  <BlackButton
                    onClick={() => handleNewCreate("/admin/team")}
                    title={`Поменять ссылку`}
                  />
                )
                // <BlackButton onClick={() => handleUpdate()} title={`Поменять ссылку`} />
              }
            </Box>
          }
        />
      </div>
    </div>
  );
};

export default NewTeamTable;
