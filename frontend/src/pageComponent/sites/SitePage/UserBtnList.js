import { UserCardNumber } from "@/components/Badges";

const UserBtnList = ({ siteTags }) => {
  return (
    <section
      className="section2 flexWrapBetween sectionWrapper"
      style={{
        marginTop: "clamp(10px, 5vw, 20px)",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        width: "100%",
        alignItems: "center",
      }}
    >
      {siteTags && siteTags.length > 0 ? (
        siteTags.map((tag, index) => (
          <div className="Vgap20px siteOneBadge">
            <UserCardNumber key={index} value={tag.capacity} text={tag.name} />
          </div>
        ))
      ) : (
        <p className="x14_2 chichaShow">Нет доступных тегов сайта.</p> // Fallback message or component
      )}
    </section>
  );
};

export default UserBtnList;
