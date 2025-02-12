"use client";

import React, { useState, useEffect, useRef } from "react";
import { logo, search, darkVK, darkTelegram, hambuger } from "@/assets";
import { CircleButton, DefaultButton, RectButton } from "@/components/Buttons";
import HeaderLink from "./HeaderLink/HeaderLink";
import MobileHeaderLink from "./HeaderLink/MobileHeaderLink";
import { getSearchData } from "../api/searchAPI";
import HeaderWrapper from "./HeaderWrapp";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { ToPhone } from "../components/ToText";
import { useRouter } from "next/navigation";
import Image from "next/image";

const DEBOUNCE_DELAY = 500;

const Header = () => {
  const navigate = useRouter();
  const [isVisible, setIsVisible] = useState(true);
  const componentRef = useRef(null);
  const [isHambuger, setIsHambuger] = useState(false);
  const isMobile = useMediaQuery("(max-width: 850px)");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const [isShrunk, setIsShrunk] = useState(false);
  const debounceTimeout = useRef(null); // Ref to track timeout for debouncing

  const handleClickOutSide = (event) => {
    if (componentRef.current && !componentRef.current.contains(event.target)) {
      setIsVisible(false);
    }
  };

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
    document.addEventListener("mousedown", handleClickOutSide);

    return () => {
      document.removeEventListener("mousedown", handleClickOutSide);
    };
  }, []);

  // Handle hamburger menu click
  const handleClick = () => {
    isHambuger === false ? setIsHambuger(true) : setIsHambuger(false);
  };

  // Handle change in the search input
  const handleChange = (e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);

    // Clear previous debounce timeout and set a new one
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    // Set new timeout to call search after DEBOUNCE_DELAY
    debounceTimeout.current = setTimeout(() => {
      handleSearch(newSearchTerm);
    }, DEBOUNCE_DELAY);
  };

  // Perform search API call based on the search term
  const handleSearch = (searchTerm) => {
    if (searchTerm.trim() === "") {
      setSearchResult([]);
      return;
    }

    getSearchData(searchTerm).then((data) => {
      if (data?.length > 0) {
        setSearchResult(data);
        setIsVisible(true);
      } else {
        setSearchResult([]);
        setIsVisible(false);
      }
    });
  };

  // Handle search result click
  const headerSearchClick = (link, scrollSpy) => {
    navigate.push(link);
    if (scrollSpy) {
      setTimeout(() => {
        const section = document.getElementById(scrollSpy);
        if (section) {
          const sectionY =
            section.getBoundingClientRect().top + window.pageYOffset - 200;
          window.scrollTo({ top: sectionY, behavior: "smooth" });
        }
      }, 300);
    }
    setIsVisible(false);
  };

  const BottomHeader = () => (
    <div className="spaceBetween">
      {!isMobile && (
        <>
          <HeaderLink />
          <RectButton
            onClick={() => navigate.push("/development")}
            title="Наш мерч →"
          />
        </>
      )}
    </div>
  );

  const goContactus = () => {
    let section = document.getElementById("contactSection");
    if (!section) {
      navigate.push("/contact");
      setTimeout(() => {
        section = document.getElementById("contactSection");
        if (section) {
          const sectionY =
            section.getBoundingClientRect().top + window.pageYOffset - 200;
          window.scrollTo({ top: sectionY, behavior: "smooth" });
        }
      }, 500);
    } else {
      const sectionY =
        section.getBoundingClientRect().top + window.pageYOffset - 200;
      window.scrollTo({ top: sectionY, behavior: "smooth" });
    }
  };

  // Handle key press for Enter key on search input
  // const handleKeyDown = (e) => {
  //   if (e.key === "Enter") {
  //     handleSearch(searchTerm);
  //   }
  // };

  return (
    <HeaderWrapper
      content={
        <>
          <div
            className={`spaceBetween topHeader ${isShrunk ? "scrolled" : ""}`}
          >
            <Image
              onClick={() => navigate.push("/")}
              src={logo}
              alt="logo"
              className="logo"
            />
            <div className="headerInput">
              <div className="alignCenter">
                <Image
                  src={search}
                  alt="search"
                  className="searchIcon"
                  onClick={() => handleSearch(searchTerm)}
                />
                <input
                  placeholder="ПОИСК"
                  // onKeyDown={handleKeyDown}
                  value={searchTerm}
                  onChange={handleChange}
                  style={{}}
                />
              </div>
              {isVisible && searchResult.length > 0 && (
                <div ref={componentRef} className="headerSearchPosition">
                  {searchResult.map((item, index) => {
                    const regex = new RegExp(`(${searchTerm})`, "gi");
                    const parts = item.value.split(regex);
                    return (
                      <React.Fragment key={index}>
                        <div
                          className="x12_3"
                          onClick={() =>
                            headerSearchClick(item.link, item.scrollSpy)
                          }
                          style={{ width: "475px", overflow: "hidden" }}
                        >
                          {parts.map((part, idx) =>
                            part.toLowerCase() === searchTerm.toLowerCase() ? (
                              <span key={idx} style={{ fontWeight: 700 }}>
                                {part}
                              </span>
                            ) : part[0] === " " &&
                              part[part.length - 1] === " " ? (
                              `\u00A0${part}\u00A0`
                            ) : part[0] === " " ? (
                              `\u00A0${part}`
                            ) : part[part.length - 1] === " " ? (
                              `${part}\u00A0`
                            ) : (
                              part
                            )
                          )}
                        </div>
                        <div
                          style={{ padding: "0 16px", boxSizing: "border-box" }}
                        >
                          <hr style={{ borderColor: "#CFCFCF" }} />
                        </div>
                      </React.Fragment>
                    );
                  })}
                </div>
              )}
            </div>
            <ToPhone className="phoneNumber" phoneNumber="+7 (495) 720-12-82" />
            <div className="circleBtnWrapper">
              <a href="https://t.me/zavodshow" rel="noreferrer" target="_blank">
                <CircleButton scale="0.698" icon={darkTelegram} />
              </a>
              <a
                href="https://vk.com/zavodshow"
                rel="noreferrer"
                target="_blank"
              >
                <CircleButton scale="0.698" icon={darkVK} />
              </a>
            </div>
            <div className="requestBtn">
              <DefaultButton
                onClick={() => goContactus()}
                title="ОСТАВИТЬ ЗАЯВКУ"
              />
            </div>
            <Image
              className="hambugerImg"
              src={hambuger}
              onClick={handleClick}
              alt="hambuger"
            />
          </div>
          <hr />
          <BottomHeader />
          {!isMobile && isShrunk && <hr />}
          {isHambuger && isMobile && <MobileHeaderLink />}
        </>
      }
    />
  );
};

export default Header;
