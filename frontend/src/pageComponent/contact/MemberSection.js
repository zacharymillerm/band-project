import Image from "next/image";
import { miniClock, miniMail, miniPhone, miniTelegram } from "../../assets";
import { teamOfficeInfo } from "../../constant/group";

const MemberSection = () => (
  <div className="contactAddress meberSquare">
    {teamOfficeInfo.map((item, index) => (
      <div key={index} className="flexWrap itemCenter memberInfo">
        <div className="smallHalfWidth memberType">
          {item.title ? (
            <div>
              {item.title === "" ? (
                <h1 className="x16_2" style={{ marginBottom: "15px" }}>
                  {item.title}
                </h1>
              ) : (
                <h2 className="x16_2" style={{ marginBottom: "15px" }}>
                  {item.title}
                </h2>
              )}
              <p className="x15_1">{item.description}</p>
            </div>
          ) : (
            item.flag !== 1 && <p className="x12Font">{item.description}</p>
          )}
          {item.flag === 1 && (
            <div>
              <p className="x12Font">{item.description[0]}</p>
              <p className="x12Font" style={{ marginTop: "10px" }}>
                {item.description[1]}
              </p>
            </div>
          )}
        </div>
        <div className="smallHalfWidth memberData">
          {item.title ? (
            <>
              <p className="mobileShow"> &nbsp; &nbsp;</p>
              <div className="alignCenter">
                <Image src={miniPhone} alt="icon" />
                &nbsp; &nbsp;
                <span className="x15_1">{item.content[0]?.value}</span>
              </div>
              <div className="alignCenter">
                <Image src={miniClock} alt="icon" />
                &nbsp; &nbsp;
                <span className="x15_1">
                  Пн-Сб: &nbsp;{item.content[1]?.value}
                </span>
              </div>
            </>
          ) : (
            <>
              {item.flag !== 1 && (
                <>
                  <div className="alignCenter">
                    <Image src={miniPhone} alt="icon" />
                    &nbsp; &nbsp;
                    <span className="x14_3">{item.content[0]?.value}</span>
                  </div>
                  <div
                    className="alignCenter"
                    style={{ display: item.content[1] ? "block" : "none" }}
                  >
                    <Image src={miniMail} alt="icon" />
                    &nbsp; &nbsp;
                    <span className="x14_3">{item.content[1]?.value}</span>
                  </div>
                </>
              )}
              <div
                className="alignCenter"
                style={{ display: item.content[2] ? "block" : "none" }}
              >
                <Image src={miniTelegram} alt="icon" />
                &nbsp; &nbsp;
                <span className="x14_3">{item.content[2]?.value}</span>
              </div>
            </>
          )}
          {item.flag === 1 && (
            <div>
              <div className="alignCenter">
                <Image src={miniPhone} alt="icon" />
                &nbsp; &nbsp;
                <span className="x14_3">{item.content[0]?.value}</span>
              </div>
              <div
                className="alignCenter"
                style={{
                  display: item.content[1] ? "block" : "none",
                  marginTop: "15px",
                }}
              >
                <Image src={miniPhone} alt="icon" />
                &nbsp; &nbsp;
                <span className="x14_3">{item.content[1]?.value}</span>
              </div>
            </div>
          )}
        </div>
        {index === 3 && <hr className="thirdLine" />}
      </div>
    ))}
  </div>
);

export default MemberSection;
