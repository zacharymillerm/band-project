import React from "react";
import {
  BlackButtonBorderWhite,
  DefaultButton,
  HeroTopButton,
  HeroTopWhiteButton,
  ScrollSpyButton,
  SmallHeroLinkButton,
} from "../Buttons";
import Image from "next/image";
// import "../../styles/components/herosample.css";

const HeroSample = (props) => {
  const { heroSectionInfo } = props;

  return (
    <section>
      <div className="herotopBtn flexWrap section2">
        <HeroTopButton title={heroSectionInfo.heroTopButton} />
        {heroSectionInfo?.heroTopWhiteBtn?.map((title, index) => (
          <div key={index} className="heroWhiteTopbtn">
            <HeroTopWhiteButton title={title} />
          </div>
        ))}
      </div>

      <section
        className="sectionWrapper section2 heroBg"
        style={{ paddingTop: "clamp(30px, 4vw, 50px)" }}
      >
        <Image src={heroSectionInfo.bgUrl} alt="bgUrl" />
        {heroSectionInfo.text ? (
          <div className="spaceEnd">
            <h1 className="heroTitle heroTitleWidth" style={{ marginTop: "25px" }}>
              {heroSectionInfo.title.split("&&").map((text, index) => (
                <React.Fragment key={index}>
                  {text}
                  <br />
                </React.Fragment>
              ))}
            </h1>
            <div className="heroTextWidth">
              <p
                className="cardTitle"
                style={{ color: "var(--secondaryWhiteColor)" }}
              >
                {heroSectionInfo.text[0]}
              </p>
              <p
                className="cardDescription"
                style={{ color: "var(--secondaryWhiteColor)" }}
              >
                {heroSectionInfo.text[1]}
              </p>
            </div>
          </div>
        ) : (
          <h1 className="heroTitle">
            {heroSectionInfo.title.split("&&").map((text, index) => (
              <React.Fragment key={index}>
                {text}
                <br />
              </React.Fragment>
            ))}
          </h1>
        )}
        <div className="spaceBetween heroLinkWrap">
          {heroSectionInfo.flag === 1 ? (
            <div className="heroLinkLeft">
              <ScrollSpyButton
                to="contactSection"
                content={
                  <DefaultButton title={heroSectionInfo.defaultBtn.title} />
                }
              />
            </div>
          ) : (
            <div className="heroLinkLeft heroLinkLeft1">
              <ScrollSpyButton
                to="contactSection"
                content={
                  <DefaultButton title={heroSectionInfo.defaultBtn.title} />
                }
              />
              <ScrollSpyButton
                to="rentalCost"
                content={
                  <BlackButtonBorderWhite title={heroSectionInfo.defaultDarkBtn.title} />
                }
              />
            </div>
          )}
          <div className="heroLinkRight chichaShow">
            {heroSectionInfo.heroLinkTitle.map((item, index) => (
              <div key={index} style={{ marginTop: "3px" }}>
                <SmallHeroLinkButton title={item.title} />
              </div>
            ))}
          </div>
          <div className="heroLinkRight chichaHidden">
            {heroSectionInfo.mobileHeroLinkTitle.map((item, index) => (
              <div key={index} style={{ marginTop: "3px" }}>
                <SmallHeroLinkButton title={item.title} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </section>
  );
};

export default HeroSample;
