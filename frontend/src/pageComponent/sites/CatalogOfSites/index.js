"use client";

import { useEffect, useState } from "react";
import { HeroTopButton } from "@/components/Buttons";
import { SearchInputBasic } from "@/components/Inputs";
import { getSite } from "@/api/siteAPI";
import useScrollToTop from "@/hooks/useScrollToTop";
import DetailSection from "../../cases/CaseCatalog/DetailSection";

const CatalogOfSites = ({ progress, type, catalogInfo }) => {
  useScrollToTop();
  const [sites, setSites] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(sites);
  const [activeType, setActiveType] = useState("");

  const handleSearchClick = (type) => {
    setActiveType(type);
    if (type === "") {
      setFilteredData(sites);
    } else {
      const filtered = sites.filter((item) =>
        item.site_type.some(
          (site_type) => site_type.toLowerCase() === type.toLowerCase()
        )
      );
      setFilteredData(filtered);
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    const filtered = sites.filter(
      (item) =>
        item.name.toLowerCase().includes(value) ||
        item.cities.some((cities) => cities.toLowerCase().includes(value))
    );
    setFilteredData(filtered);
  };

  useEffect(() => {
    getSite().then((data) => {
      data && setSites(data);
      setFilteredData(data);
    });
  }, []);
  return (
    <section className="wrapper">
      <div className="container">
        <div className="sectionWrapper section2">
          <div className="sectionHeader">
            <div className="alignCenter" style={{ gap: "27px" }}>
              <h1
                className="x30"
                style={{ color: `var(--secondaryWhiteColor)` }}
              >
                Площадки
              </h1>
              <h1 className="x30" style={{ color: `#B0B0B0` }}>
                {sites?.length}
              </h1>
            </div>
            <SearchInputBasic
              onChange={handleSearch}
              placeholder={catalogInfo.placeholder}
            />
            <div className="flexWrap" style={{ marginTop: "20px" }}>
              {catalogInfo.buttonTitle.map((item, index) => (
                <div
                  key={index}
                  style={{ marginTop: "5px", marginRight: "5px" }}
                >
                  <HeroTopButton
                    key={index}
                    title={item.title}
                    type={item.type}
                    isActive={activeType === item.type}
                    handleSearchClick={handleSearchClick}
                  />
                </div>
              ))}
            </div>
          </div>
          <DetailSection
            progress={progress}
            type={type}
            data={filteredData}
            fieldInfo={catalogInfo.selectBoxInfo}
            checkText={catalogInfo.checkText}
            activeType={activeType}
          />
        </div>
      </div>
    </section>
  );
};

export default CatalogOfSites;
