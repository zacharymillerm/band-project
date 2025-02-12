import Image from "next/image";
import { master } from "../../assets";
import ChichaSmallBox from "../../components/ChichaSmallBox";

const MasterSection = ({ links, teamImg }) => (
  <div className="sectionWrapper">
    <div className="sectionHeader section2" style={{ textAlign: "center" }}>
      <h2 className="sectionTitle">ЗАВОД ШОУ - это мастера</h2>
    </div>
    <Image className="bigVideoSquare" src={teamImg   ? teamImg : master} alt="master" width={1280} height={1280} />
    <ChichaSmallBox
      links={links}
      title="ЗАВОД ШОУ приглашает в свою команду!"
      text="Завод Шоу требуются специалисты как для работы на частных мероприятиях, так и в турах, концертах или спектаклях. Также возможен формат подработки"
      btnTitle="ЛЕРЕЙТИ В АНКЕТУ"
    />
  </div>
);

export default MasterSection;
