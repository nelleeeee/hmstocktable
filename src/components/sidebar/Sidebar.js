import React from "react";
import { useHistory } from "react-router";

const Sidebar = ({ pathh }) => {
  const history = useHistory();
  const menus = [
    { 공지사항: `/${pathh}` },
    { 신보안내: `/${pathh}/newalbum` },
    { "포카/굿즈": `/${pathh}/phocagoods` },
    { 재고: `/${pathh}/stock` },
  ];

  return (
    <div className=" w-1/6 flex flex-col h-full items-center space-y-6">
      <img
        src="https://firebasestorage.googleapis.com/v0/b/hmstocktable.appspot.com/o/KakaoTalk_Photo_2021-08-08-16-16-38.png?alt=media&token=1f07f9f8-e3e6-47d6-8b04-c771c3d01743"
        alt=""
        className="mt-24 m-auto w-4/5 max-w-xs cursor-pointer"
        onClick={() => history.push(`/${pathh}`)}
      />
      {menus.map((menu, index) => (
        <div
          key={index}
          onClick={() => history.push(`${Object.values(menu)}`)}
          className="cursor-pointer"
        >
          {Object.keys(menu)}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
