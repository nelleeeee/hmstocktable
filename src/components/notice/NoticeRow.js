import React from "react";
import { useHistory } from "react-router";
const NoticeRow = ({ notice, pathh }) => {
  const history = useHistory();
  return (
    <div
      onClick={() => history.push(`/${pathh}/notice/${notice.id}`)}
      className="grid grid-cols-6 pl-4 p-1 border rounded-sm 
      cursor-pointer text-sm"
    >
      <div className="col-span-5">{notice.data.title}</div>
      <div className="text-center">
        {new Date(notice.data.createdAt.toDate()).toLocaleDateString()}
      </div>
    </div>
  );
};

export default NoticeRow;
