import Image from "next/image";
import { darkSmallUser, whiteUser } from "@/assets";

const PermissionBadge = ({ title }) => (
  <div>
    <span className="permissionBadge">{title}</span>
  </div>
);

const CardViewNumber = ({ value }) => (
  <div className="cardViewNumber spaceAround">
    <Image src={darkSmallUser} alt="smallUser" />
    <p>от&nbsp;{value}</p>
  </div>
);

const CardBadge = ({ title }) => <div className="cardBadge">{title}</div>;

const CaseCatalogCardBadge = ({ type, label }) => {
  return (
    <>
      {type === "platform" ? (
        <button
          className="caseCatalogCardBadgeButton"
          style={{ display: "flex", gap: "10px" }}
        >
          <Image src={whiteUser} alt="whiteUser" /> {label}
        </button>
      ) : type === "equipment" ? (
        <button
          className="caseCatalogCardBadgeButton"
          style={{ backgroundColor: "#EFEFEF", color: "#686868" }}
        >
          {label}
        </button>
      ) : (
        <button className="caseCatalogCardBadgeButton">{label}</button>
      )}
    </>
  );
};

const UserCardNumber = ({ value, text }) => (
  <div style={{ display: "flex", gap: "14px" }}>
    <div className="userCardNumber spaceAround">
      {/* <Image src={darkSmallUser} alt="smallUser" /> */}
      <p>{value}</p>
    </div>
    <p className="userCardText">{text}</p>
  </div>
);

export {
  PermissionBadge,
  CardViewNumber,
  CardBadge,
  CaseCatalogCardBadge,
  UserCardNumber,
};
