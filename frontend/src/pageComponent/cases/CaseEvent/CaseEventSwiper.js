import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";

import { leftArrow, rightArrow } from "@/assets";
import CustomerModal from "@/components/Modals";
import Image from "next/image";

export default function CaseEventSwiper({ images }) {
  const [open, setOpen] = useState(false);
  const [selImage, setSelImgae] = useState(null);

  const handleClick = (imgUrl) => {
    setOpen(true);
    setSelImgae(imgUrl);
  };

  return (
    <div style={{ position: "relative" }}>
      <Swiper
        slidesPerView={3}
        loop={true}
        modules={[Pagination, Navigation]}
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
        className="EventSwiper"
      >
        {images?.map((item, index) => (
          <SwiperSlide key={index} className="swiperAuto">
            <Image
              width={100}
              height={100}
              src={`${item}`}
              style={{ cursor: "pointer" }}
              onClick={() => handleClick(`${item}`)}
              alt={index}
              className="eventImg"
              unoptimized={true}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="custom-prev">
        <Image src={leftArrow} alt="leftArrow" />
      </div>
      <div className="custom-next">
        <Image src={rightArrow} alt="rightArrow" />
      </div>
      <CustomerModal
        open={open}
        setOpen={setOpen}
        content={
          <div className="absoluteCenter">
            <Image src={selImage} alt="selImage" className="previewImage" />
          </div>
        }
      />
    </div>
  );
}
