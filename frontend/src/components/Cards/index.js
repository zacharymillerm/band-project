import React, { useState } from "react";
import {
  BigArrowBlackButton,
  BlackButton,
  EventTagButton,
  LinkButton,
} from "../Buttons";
import { CardBadge, CardViewNumber, CaseCatalogCardBadge } from "../Badges";
import VideoPreview from "./UserCard/Preview/VideoPreview";
import {
  coveringPlay,
  greyDocument,
  greyDownload,
  whitePlay,
  starIcon1,
  positionIcon,
  // redTrash,
  // greyPencil,
  // greyArrow,
  // moveUp,
  // moveDown,
} from "../../assets";
// import "../../styles/components/cards/card.css";
import { useRouter } from "next/navigation";
import { handleDownload } from "../../constant/defaultLink";
import Image from "next/image";

const PendingCard = ({ item }) => {
  const navigate = useRouter();
  const handleLink = (url) => {
    navigate.push(url);
  };
  return (
    <div className="pendingCard">
      <Image src={item.img} alt="pendingImage" />
      <div className="pendingCardContent">
        <div>
          <h3 className="cardBigTitle" style={{ paddingTop: "4px" }}>
            {item.title}
          </h3>
          <h3 className="cardDescription" style={{ maxWidth: "355px" }}>
            {item.description}
          </h3>
        </div>
        <BlackButton title="ПОДРОБНЕЕ" onClick={() => handleLink(item?.url)} />
      </div>
    </div>
  );
};

const PublicationCard = ({ item }) => {
  const navigate = useRouter();
  const handleLink = () => {
    navigate.push(`site-one/${item.id}`);
  };

  return (
    <div className="publicationCard">
      <div style={{ position: "relative" }}>
        <video src={`${item.video}`} alt="publicationImage" />
        <CardViewNumber value={item.capacity} />
      </div>
      <div
        className="spaceBetween"
        style={{ padding: "clamp(20px, 4vw, 25px) 0 clamp(8px, 2vw, 12px) 0" }}
      >
        <h3 className="cardTitle">{item.name}</h3>
        <div
          className="alignCenter flexWrap itemEnd"
          style={{ float: "right" }}
        >
          <CardBadge title="Ресторан" />
          <CardBadge title="Ещё 6" />
        </div>
      </div>
      <p style={{ paddingBottom: "clamp(20px, 4vw, 25px)" }}>{item.address}</p>
      <BlackButton onClick={() => handleLink()} title="ПОДРОБНЕЕ" />
    </div>
  );
};

const TextBlogCard = ({ item }) => (
  <div className="blogCard textBlogCard">
    <Image className="textBlogCardImg" src={item.url} alt="textBlog" />
    <p>{item.content}</p>
    <p className="textBlogCardNumber">{item.viewNumber} подписчик</p>
    <div>
      <a
        href="https://t.me/zavodshow"
        rel="noreferrer"
        target="_blank"
        style={{ textDecoration: "none" }}
      >
        <BigArrowBlackButton title="ЧИТАТЬ В ТЕЛЕГРАМ" />
      </a>
    </div>
  </div>
);

const VideoBlogCard = ({ item }) => {
  const [open, setOpen] = useState(false);
  console.log('VideoBlogCard', item);

  const handleOpen = () => {
    setOpen(true);
  };

  const getFileType = (url) => {
    const extension = url.split('.').pop().toLowerCase();
    const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "webp"];
    const videoExtensions = ["mp4", "avi", "mov", "wmv", "flv", "mkv", "webm"];

    if (imageExtensions.includes(extension)) {
        return "image";
    } else if (videoExtensions.includes(extension)) {
        return "video";
    } else {
        return "unknown";
    }
  }
  return (
    <>
      <div className="blogCard videoBlogCard">
        <h3>{item.title}</h3>
        {item.video && getFileType(item.video) === 'video' && <div style={{ position: "relative" }}>
          <video
            style={{
              width: "100%",
              height: "clamp(168px, 15vw,201px)",
              borderRadius: "5px",
            }}
          >
            <source src={`${item.video}`} type="video/mp4" />
          </video>
          <Image
            src={whitePlay}
            onClick={handleOpen}
            alt="whitePlay"
            className="whitePlayImg"
          />
        </div>}
        {item.video && getFileType(item.video) === 'image' && <div style={{ position: "relative" }}>
          <Image
            width={500} // Default width
            height={300} // Default height
            style={{ maxHeight: "clamp(168px, 15vw,201px)", width: "100%", height: "100%" }}
            src={item.video}
            alt={item.video}
            unoptimized={true}
          />
        </div>}
        <p className="videoBlogCardDescription">{item.description}</p>
        <div>
          <a
            href={item?.links}
            rel="noreferrer"
            target="_blank"
            style={{ textDecoration: "none", color: `var(--primaryBgColor)` }}
          >
            <LinkButton title="ЧИТАТЬ ПОСТ" />
          </a>
        </div>
      </div>
      <VideoPreview open={open} setOpen={setOpen} avatar={`${item.video}`} />
    </>
  );
};

const EventWorksCard = ({ item, handleMoveToCase }) => (
  <div className="eventWorksCard">
    <Image
      src={item.img}
      style={{ cursor: "pointer" }}
      onClick={handleMoveToCase}
      alt="eventWorksImage"
    />
    <h3
      className="eventTitle"
      onClick={handleMoveToCase}
      style={{ padding: "clamp(20px, 2vw, 24px) 0", cursor: "pointer" }}
    >
      {item.title}
    </h3>
    <div className="itemCenter" style={{ gap: "5px" }}>
      {item.tags.map((title, index) => (
        <EventTagButton
          handleMoveToCase={handleMoveToCase}
          key={index}
          title={title}
        />
      ))}
    </div>
  </div>
);

const RentalCostCard = ({ cost }) => (
  <div className="rentalBox">
    <p className="sectionTitle" style={{ color: "var(--primaryBgColor)" }}>
      от {cost?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") || "10 000"}{" "}
      руб
    </p>
    <p className="rentalSmallText">за один репетиционный час</p>
  </div>
);

const RentalCostDocCard = ({ item, docFile }) => {
  return (
    <div className="rentalCostDocCard">
      <Image src={greyDocument} alt="greyDocument" />
      <p className="docuText">{item.text}</p>
      <div
        className="alignCenter"
        style={{ cursor: "pointer" }}
        onClick={() => docFile && handleDownload(docFile, `${item.text}.zip`)}
      >
        <Image src={greyDownload} alt="greyDownload" />
        <p className="docuSizeText">&nbsp;&nbsp;{item.size}</p>
      </div>
    </div>
  );
};

const ChichaBoxVideoCard = ({ video, width, height, onClick }) => (
  <div className="auditoriumLeft" style={{ width: width, height: height }}>
    <video
      className="auditoriumLeft"
      style={{ width: "100%", height: height }}
      src={video}
    />
    <Image
      src={coveringPlay}
      alt="coveringPlay"
      className="absoluteCenter coveringPlay"
      onClick={onClick}
    />
  </div>
);

const ChichaBoxRightCard = ({ content, width, height }) => (
  <div
    className="auditoriumRight alignCenter"
    style={{ width: width, height: height }}
  >
    <div style={{ width: "100%" }}>{content}</div>
  </div>
);

const CaseCatalogCard = ({ type, item, onClick }) => {
  return (
    <div className="caseCatalogCard">
      {type !== "equipment" ? (
        <video
          src={
            type === "case"
              ? `${item?.video}`
              : type === "platform"
              ? `${item?.video}`
              : ""
          }
          style={{ width: "100%", height: "175px", objectFit: "cover" }}
          onClick={onClick}
        />
      ) : (
        <div
          className="itemCenter"
          style={{
            width: "100%",
            height: "175px",
            backgroundColor: "white",
            borderRadius: "5px",
          }}
        >
          <Image
            src={`${item?.images.length > 0 && item.images[0]}`}
            style={{ maxWidth: "100%", maxHeight: "175px", objectFit: "cover" }}
            onClick={onClick}
            alt="img"
          />
        </div>
      )}
      {type === "case" ? (
        <div>
          <div
            style={{
              position: "absolute",
              top: 5,
              right: 3,
              textAlign: "right",
            }}
          >
            {<CaseCatalogCardBadge label={item?.startDate} />} <br />
            {
              <CaseCatalogCardBadge
                label={
                  item?.type === "тур"
                    ? `${item?.cities.length} городов`
                    : item?.cities.length > 0 && item.cities[0]
                }
              />
            }
          </div>
          <div className="caseCatalogParagraph alignCenter flexWrapBetween">
            <p className="x16" style={{ color: "white" }}>
              {item?.name}
            </p>
            <p className="x14" style={{ color: "#B5B5B5" }}>
              {item?.blog_type}
            </p>
          </div>
          <div
            className="x12 alignCenter"
            style={{ color: "white", gap: "5px" }}
          >
            <Image
              src={item?.type === "тур" ? starIcon1 : positionIcon}
              alt="caseCatalogIcon"
            />
            {item.venue && <p>{item.venue}</p>}
          </div>
        </div>
      ) : type === "platform" ? (
        <div>
          <div
            style={{
              position: "absolute",
              top: 5,
              right: 3,
              textAlign: "right",
            }}
          >
            <CaseCatalogCardBadge type={type} label={item?.capacity} />
          </div>
          <div className="caseCatalogParagraph alignCenter flexWrapBetween">
            <p className="x16" style={{ color: "white" }}>
              {item?.name}
            </p>
            <p className="x14" style={{ color: "#B5B5B5" }}>
              {item?.site_type[0]}
            </p>
          </div>
          <div
            className="x12 alignCenter"
            style={{ color: "white", gap: "5px" }}
          >
            <Image src={positionIcon} alt="caseCatalogIcon" />
            <p>
              <span style={{ fontWeight: "bold", fontSize: "13px" }}>
                {item?.cities[0]}
              </span>
              , &nbsp;{item?.address}
            </p>
          </div>
        </div>
      ) : type === "equipment" ? (
        <div>
          <div
            style={{
              position: "absolute",
              top: 5,
              right: 3,
              textAlign: "right",
            }}
          >
            <CaseCatalogCardBadge type="equipment" label={item?.brand} />
          </div>
          <div className="caseCatalogParagraph alignCenter flexWrapBetween">
            <p className="x16" style={{ color: "white" }}>
              {item?.name}
            </p>
            <p className="x14" style={{ color: "#B5B5B5" }}>
              {item?.equipment_type}
            </p>
          </div>
          <div
            className="x12 alignCenter"
            style={{ color: "white", gap: "5px" }}
          >
            <p>{item?.categoryType}</p>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

const BigEquipmentImageCard = ({ url }) => (
  <div className="bigEquipmentImageWrappper itemCenter">
    <Image src={url} alt="cameraImg1" />
  </div>
);

const SmallEquipmentImageCard = ({ url }) => (
  <div className="smallEquipmentImageWrappper itemCenter">
    <Image src={url} alt="smailCameraImg1" />
  </div>
);

const EquipmentImageCaptionCard = ({ title, text }) => (
  <div style={{ width: "40%" }}>
    <p className="x16Font_4" style={{ marginBottom: "10px" }}>
      {title}
    </p>
    <p className="x18Font_4 ">{text}</p>
  </div>
);

const AdminPermissionCard = ({ content }) => (
  <div className="adminPermissionCard">
    <p>Доступно:</p>
    {content}
  </div>
);

export {
  PendingCard,
  PublicationCard,
  TextBlogCard,
  VideoBlogCard,
  EventWorksCard,
  RentalCostCard,
  RentalCostDocCard,
  ChichaBoxVideoCard,
  ChichaBoxRightCard,
  CaseCatalogCard,
  BigEquipmentImageCard,
  SmallEquipmentImageCard,
  EquipmentImageCaptionCard,
  AdminPermissionCard,
};
