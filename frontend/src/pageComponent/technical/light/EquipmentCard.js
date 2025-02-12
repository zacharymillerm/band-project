import { BlackButton } from "@/components/Buttons";
import { gradiantBgInfo } from "@/constant/group";
import { Link } from "react-scroll";

const EquipmentCard = ({ data, title }) => {
  return (
    <div className="sectionWrapper pendingSquare section1">
      <div className="flexWrapBetween alignCenter">
        <h2 className="sectionTitle">{title}</h2>
        <h2
          className="sectionTitle"
          style={{ color: `var(--secondaryWhiteHover)` }}
        >
          Этапы работы
        </h2>
        <div className="chichaShow">
          <Link to="contactSection" offset={-200} spy={true} smooth={true}>
            <BlackButton title="заказать консультацию" />
          </Link>
        </div>
      </div>
      <hr
        style={{
          borderColor: "#CFCFCF",
          width: "100%",
          margin: "clamp(20px, 3vw, 40px) 0",
        }}
      />
      <div className="flexWrapAround" style={{ gap: "10px" }}>
        {data.map((item, index) => (
          <div
            key={index}
            className="creationItem"
            style={{
              background: gradiantBgInfo[index],
              marginLeft: index === 0 && 0,
            }}
          >
            <h3 className="creationTitle">{item.title}</h3>
            {item.content.map((text, idx) => (
              <p key={idx} className="creationSmallText">
                {text}
              </p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EquipmentCard;
