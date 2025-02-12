import Image from "next/image";
import { checkIcon, inveteChicha1, inveteChicha2 } from "../../assets";
import { ArrowBlackButton } from "../Buttons";

const ChichaSmallBox = (props) => {
  const onClick = (url) => {
    window.open(url, "_blank");
  };
  return (
    <>
      <div style={{ color: "var(--secondaryWhiteColor)" }}>
        <div className="inviteSec">
          <div className="inviteTitle">
            <Image src={checkIcon} alt="checkIcon" />
            <p className="x30">{props.title}</p>
          </div>
          <div className="inviteSecBtnT">
            <ArrowBlackButton
              onClick={() => onClick(props?.links && props.links)}
              title={props.btnTitle}
            />
            <p className="x18Font_4">{props.text}</p>
          </div>
          <Image alt="inviteImage" className="inviteImg1" src={inveteChicha1} />
          <Image alt="inviteImage" className="inviteImg2" src={inveteChicha2} />
        </div>
      </div>
    </>
  );
};

export default ChichaSmallBox;
