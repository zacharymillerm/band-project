import Image from "next/image";

export const SmallAvatar = ({ url }) => {
  return <Image className="smallAvatar" src={url} alt={url} />;
};
