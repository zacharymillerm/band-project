import Image from "next/image";
import { caseSolutionChiCha } from "@/assets";
// import "@styles/pages/cases/caseEvent.css";

const CaseCards = ({ solution, feature }) => {
  // Filter out invalid solution items
  const validSolutions = solution?.filter(
    (item) =>
      item.content?.trim() && // Ensure content is not empty
      item.images?.length > 0 && // Ensure images exist
      item.images.some((img) => img.image?.trim()) // At least one image has a valid image field
  );

  return (
    <div className="container">
      <div className="section caseEvent1">
        <div style={{ display: "grid", gap: "clamp(20px,2vw,24px)" }}>
          <p className="x30">Особенность кейса</p>
          <p className="x20Font">{feature}</p>
        </div>

        {validSolutions?.length > 0 && (
          <div style={{ display: "grid", gap: "clamp(20px, 2vw, 24px)" }}>
            <p className="x30 caseChiCha">
              <Image
                className="firstImage"
                src={caseSolutionChiCha}
                alt="CaseSolutionChiCha"
                style={{
                  width: "31px",
                  height: "39px",
                  paddingRight: "16.29px",
                }}
              />
              Решение кейса
              <Image
                className="secondImage"
                src={caseSolutionChiCha}
                alt="CaseSolutionChiCha"
                style={{ width: "31px", height: "39px", paddingLeft: "13px" }}
              />
            </p>
            <div
              className="flexWrap"
              style={{ display: "grid", gap: "clamp(68px,7vw,85px)" }}
            >
              {validSolutions.map((item, index) => (
                <div
                  key={index}
                  style={{ display: "grid", gap: "clamp(30px,3vw,40px)" }}
                >
                  <p className="x20Font">{item.content}</p>
                  <div
                    className="flexWrap"
                    style={{
                      width: "100%",
                      gap: "clamp(10px,1.3vw,20px)",
                    }}
                  >
                    {item.images
                      .filter((img) => img.image?.trim())
                      .map((image, idx) => (
                        <div
                          className="caseCardImg"
                          key={idx}
                          style={{
                            width:
                              index % 2 === 0
                                ? idx % 4 === 0
                                  ? "39.3%"
                                  : idx % 4 === 1
                                  ? "58.7%"
                                  : idx % 4 === 2
                                  ? "58.7%"
                                  : "39.3%"
                                : idx % 4 === 0
                                ? "58.7%"
                                : idx % 4 === 1
                                ? "39.3%"
                                : idx % 4 === 2
                                ? "39.3%"
                                : "58.7%",
                            display: "grid",
                            gap: "clamp(10px,1.3vw,20px)",
                            borderRadius: "10px",
                          }}
                        >
                          <Image width={700} height={700} src={image.image} alt={idx} unoptimized={true} />
                          {image?.title && (
                            <p className="x18_3">{image.title}</p>
                          )}
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CaseCards;
