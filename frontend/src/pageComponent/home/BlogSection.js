import { useEffect, useState } from "react";
import { TextBlogCard, VideoBlogCard } from "../../components/Cards";
import { blogTextCard } from "../../constant/group";
import { getTopFactorys } from "../../api/facAPI";

const BlogSection = () => {
  const [topFactory, setTopFactory] = useState([]);
  useEffect(() => {
    getTopFactorys().then((data) => {
      data && setTopFactory(data);
    });
  }, []);
  return (
    <div id="blogSection" className="sectionWrapper">
      <div className="sectionHeader">
        <h2
          className="sectionTitle"
          style={{ padding: "0 clamp(0px, 4vw, 64px)" }}
        >
          Блог #ЗАВОД ШОУ
        </h2>
      </div>
      <div className="blogCardItem" style={{ gap: "clamp(20px, 3vw, 40px)" }}>
        <TextBlogCard item={blogTextCard} />
        {topFactory.map((item, index) => (
          <VideoBlogCard key={index} item={item} />
        ))}
      </div>
    </div>
  );
};

export default BlogSection;
