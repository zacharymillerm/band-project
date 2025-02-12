"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { DefaultButton, MobileHeaderLink } from "@/components/Buttons";
import HeaderWrapper from "./HeaderWrapp";
import { adminUser, lightLogout, logo, hambuger } from "@/assets";
import { logout } from "@/api/authAPI";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { getUserInfo } from "@/api/adminAPI";
import MobileAdminHeader from "./MobileAdminHeader";
import Image from "next/image";
import Link from "next/link";

const AdminHeader = () => {
  const navigate = useRouter();
  const location = useRouter();
  const [isShrunk, setIsShrunk] = useState(false);
  const [isHambuger, setIsHambuger] = useState(false);
  const isMobile = useMediaQuery("(max-width: 1000px)");
  const [token, setToken] = useState(null);

  const adminLinkInfo = {
    admin: {
      title: "Страница администратора",
      link: "",
      smallLink: [
        { title: "кейсы", link: "/admin/eventTable" },
        { title: "каталог площадок", link: "/admin/sitesTable" },
        // { title: "каталог оборудования", link: "/admin/equipmentTable" },
        { title: "отзывы", link: "/admin/reviewTable" },
        { title: "блог", link: "/admin/factoryshowTable" },
        { title: "реп. база", link: "/admin/rehearsalTable" },
        { title: "3D-визуализация", link: "/admin/visualizationTable" },
        { title: "команда", link: "/admin/team" },
      ],
    },
    setting: {
      title: "Настройки аккаунта",
      link: "setting",
      smallLink: [
        { title: "данные аккаунта", link: "adminDataSection" },
        { title: "каталог пользователей", link: "adminDirectorySection" },
      ],
    },
    create: {
      title: "Создание пользователя",
      link: "create",
    },
    edit: {
      title: "Изменение данных пользователя",
      link: "edit",
    },
  };

  const [addLink, setAddLink] = useState(adminLinkInfo.admin);
  const [userInfo, setUserInfo] = useState({});

  const handleLogout = () => {
    logout().then(() => {
      navigate.push("/");
    });
  };

  const hambugerClick = () => {
    isHambuger ? setIsHambuger(false) : setIsHambuger(true);
  };

  const handleSetting = () => {
    navigate.push("/admin/setting");
  };

  // Initialize token on client side
  useEffect(() => {
    setToken(sessionStorage.getItem("token"));
  }, []);

  // Get user info when token changes
  useEffect(() => {
    if (token) {
      getUserInfo().then((data) => {
        data && setUserInfo(data);
      });
    }
  }, [token]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setIsShrunk(true);
      } else {
        setIsShrunk(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const currentPath = location?.pathname || "";
    const pathArray = currentPath.split("/").filter(Boolean);
    const lastPathSegment =
      pathArray.length > 0 ? pathArray[pathArray.length - 1] : null;

    if (lastPathSegment && adminLinkInfo[lastPathSegment]) {
      setAddLink(adminLinkInfo[lastPathSegment]);
    }
  }, [location.pathname]);

  return (
    <>
      {/* {userInfo.name && ( */}
        <HeaderWrapper
          content={
            <>
              <div
                className={`spaceBetween topHeader ${
                  isShrunk ? "scrolled" : ""
                }`}
              >
                <div className="alignCenter">
                  <Image
                    onClick={() => {
                      navigate.push("/");
                    }}
                    src={logo}
                    alt="Company Logo"
                    className="logo"
                  />
                  <div className="adminHeaderLink">
                    <Link href="/admin">Страница администратора</Link>
                    {(addLink.link === "create" || addLink.link === "edit") && (
                      <span className="adminHeaderSpan">
                        <span>&nbsp;&nbsp; / &nbsp;&nbsp;</span>
                        <Link href="/admin/setting">Настройки аккаунта</Link>
                      </span>
                    )}
                    {addLink.link !== "" && (
                      <span className="adminHeaderSpan">
                        <span>&nbsp;&nbsp; / &nbsp;&nbsp;</span>
                        <Link href={`/admin/${addLink.link}`}>
                          {addLink.title}
                        </Link>
                      </span>
                    )}
                  </div>
                </div>
                <div className="requestBtn alignCenter" style={{ gap: "15px" }}>
                  <div className="adminHeaderLink">
                    <span style={{ fontSize: "12px" }}>
                      {userInfo.name} {userInfo.lastname}
                    </span>
                  </div>
                  <Image
                    className="headerAvatar"
                    src={adminUser}
                    alt="Admin User Avatar"
                  />
                  <DefaultButton onClick={handleSetting} title="настройки" />
                  <Image
                    src={lightLogout}
                    alt="Logout Icon"
                    onClick={handleLogout}
                    style={{ cursor: "pointer" }}
                  />
                </div>
              </div>
              <hr />
              {addLink.smallLink && (
                <div className="container">
                  <div className="adminHeaderScrollLink">
                    {addLink.smallLink.map((item, index) => (
                      <MobileHeaderLink
                        key={index}
                        link={item.link}
                        content={item.title}
                      />
                    ))}
                  </div>
                </div>
              )}
              {addLink.smallLink && isMobile && isHambuger && (
                <MobileAdminHeader
                  item={adminLinkInfo.admin}
                  isHambuger={isHambuger}
                  setIsHambuger={setIsHambuger}
                />
              )}
              {isShrunk && <hr />}
              {addLink.smallLink && isMobile && (
                <Image
                  src={hambuger}
                  onClick={hambugerClick}
                  alt="hambuger"
                  className="adminHeaderHanbuger"
                />
              )}
            </>
          }
        />
      {/* )} */}
    </>
  );
};

export default AdminHeader;