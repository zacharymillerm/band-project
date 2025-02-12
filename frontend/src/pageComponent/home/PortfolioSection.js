import { useEffect, useState } from "react";
import { ArrowDefaultButton } from "../../components/Buttons";
import { PublicationCard } from "../../components/Cards";
import { getsixSite } from "../../api/siteAPI";
import { useRouter } from "next/navigation";

const PortfolioSection = () => {
  const [publicationCardInfo, setPublicationCardInfo] = useState([]);
  const navigate = useRouter();

  useEffect(() => {
    getsixSite().then((data) => {
      data && setPublicationCardInfo(data);
    });
  }, []);
  const handleLink = (url) => {
    navigate.push(url);
  };

  return (
    <div className="sectionWrapper">
      <div className="spaceBetween sectionHeader section2">
        <h2 className="sectionTitle">Работаем на площадках</h2>
        <div className="chichaShow">
          <ArrowDefaultButton
            title="все площадки"
            onClick={() => handleLink("/sites")}
          />
        </div>
      </div>
      <div className="flexWrapAround" style={{ gap: "40px" }}>
        {publicationCardInfo.map((item, index) => (
          <PublicationCard key={index} item={item} />
        ))}
      </div>
      <div className="chichaHidden itemCenter" style={{ paddingTop: "40px" }}>
        <ArrowDefaultButton title="все площадки" />
      </div>
    </div>
  );
};

export default PortfolioSection;
