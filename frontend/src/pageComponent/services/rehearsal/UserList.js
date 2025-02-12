import Image from "next/image";
import { DefaultButton } from "@/components/Buttons";
import { useEffect, useState } from "react";
import { stage } from "@/assets";

const UserList = ({ title, userListInfo }) => {
  const [users, setUsers] = useState([]);

  const addUsers = () => {
    setUsers(userListInfo.slice(0, users.length + 3));
  };

  const reduceUsers = () => setUsers(userListInfo.slice(0, 3));

  const [width, setWidth] = useState();
  useEffect(() => {
    setWidth(window.innerWidth);
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (width > 589) {
      setUsers(userListInfo);
    } else {
      setUsers(userListInfo.slice(0, 3));
    }
  }, [width, userListInfo]);

  return (
    <section className="sectionWrapper section2" id="userLists">
      <div className="sectionHeader">
        <h2 className="sectionTitle" style={{ textAlign: "center" }}>
          {title ? title : "На этой базе репетировали"}
        </h2>
      </div>
      <div className="flexWrapAround userListWrapper">
        {users.map((item, index) => (
          <div key={index}>
            <Image
              width={100}
              height={100}
              className="userListAvatar"
              src={`${item?.image}`}
              alt={item.image}
            />
            <h3 className="cardBigTitle userListTitle" style={{width: 220, textAlign: "center"}}>{item?.name}</h3>
            <a
              className="cardDescription userListLink"
              target="_blank"
              rel="noreferrer"
              // href="https://www.youtube.com/@zavodshow?si=iKWeBnsR_h9tWZjl"
              href={item?.link}
            >
              Смотреть репетицию
            </a>
          </div>
        ))}
      </div>
      <div className="seeMoreButton">
        {users.length === userListInfo.length ? (
          <DefaultButton onClick={reduceUsers} title="скрыть больше" />
        ) : (
          <DefaultButton onClick={addUsers} title="cмотреть ещё" />
        )}
      </div>
    </section>
  );
};

export default UserList;
