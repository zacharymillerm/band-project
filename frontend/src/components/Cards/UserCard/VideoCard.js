import { useState } from "react";
import { darkPlay } from "@/assets";
import VideoPreview from "./Preview/VideoPreview";
import Image from "next/image";

const VideoCard = (props) => {
  const { name, avatar, description, file } = props;

  const [open, setOpen] = useState(false);

  const handlePlay = () => {
    setOpen(true);
  };
  return (
    <>
      <div className="alignCenter" style={{ height: "350px" }}>
        <div className="videoCard">
          <div className="videoActionArea">
            <div className="circleVideoWrap">
              <Image
                src={avatar}
                alt="avatar"
                className="circleVideo"
                width={100}
                height={100}
                onClick={handlePlay}
                unoptimized={true}
              />
              <div className="videoPlayIcon itemCenter" onClick={handlePlay}>
                <Image src={darkPlay} alt="darkPlay" />
              </div>
            </div>
            <p className="cardBigTitle">{name}</p>
            <button onClick={handlePlay} className="cardDescription">
              Читать отзыв
            </button>
          </div>
        </div>
      </div>
      <VideoPreview
        name={name}
        description={description}
        avatar={file}
        open={open}
        setOpen={setOpen}
      />
    </>
  );
};

export default VideoCard;
