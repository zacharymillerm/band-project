import { Swiper, SwiperSlide } from "swiper/react";
import VideoCard from "../Cards/UserCard/VideoCard";
import TextCard from "../Cards/UserCard/TextCard";
import { Autoplay } from "swiper/modules";
import { getReviewsBytype } from "../../api/reviewAPI";

import { useEffect, useState } from "react";

const SwiperSection = ({ displayType }) => {
  const [swiperData, setSwiperData] = useState([]);
  useEffect(() => {
    getReviewsBytype(displayType).then((data) => {
      data && setSwiperData(data);
    });
  }, [displayType]);

  return (
    <section
      id="customerReviewSection"
      className="container"
      style={{ paddingRight: 0 }}
    >
      <div className="sectionWrapper section2" style={{ paddingRight: 0 }}>
        <div className="sectionHeader">
          <h2 className="sectionTitle">Нас рекомендуют</h2>
        </div>
        <Swiper
          modules={[Autoplay]}
          slidesPerView="auto"
          spaceBetween={70}
          // loop={true}
          pagination={{ clickable: true }}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            300: {
              spaceBetween: 30,
            },
            600: {
              spaceBetween: 50,
            },
            1200: {
              spaceBetween: 70,
            },
          }}
        >
          {swiperData?.map((item, index) => (
            <SwiperSlide key={index} className="swiperAuto">
              {item.type === "Video" ? (
                <VideoCard
                  name={item.name}
                  description={item.content}
                  avatar={`${item.avatar}`}
                  file={`${item.file}`}
                />
              ) : (
                <TextCard
                  name={item.name}
                  avatar={`${item.avatar}`}
                  content={item.content}
                  file={`${item.file}`}
                />
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default SwiperSection;
