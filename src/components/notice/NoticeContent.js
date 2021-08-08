import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { db } from "../../firebase";
import Sidebar from "../sidebar/Sidebar";

const NoticeContent = ({ match }) => {
  const { id } = match.params;
  const [notice, setNotice] = useState("");

  useEffect(() => {
    db.collection("notice")
      .doc(id)
      .get()
      .then(doc => setNotice(doc.data()));
  }, [id]);
  return (
    <>
      <Sidebar />
      <div className=" w-10/12 flex flex-col items-center mt-12 p-5">
        <div
          className="w-full text-center text-lg 
        font-semibold p-1 mb-5"
        >
          공지사항
        </div>
        <div
          className="w-full border-t-2 flex flex-row 
       border-b items-center  border-r"
        >
          <div className="w-16 bg-gray-100 p-1 text-center">제목 </div>
          <div className="pl-3">{notice.title}</div>
        </div>

        <div
          className="w-full border-b border-r flex flex-row
          items-center text-xs
      "
        >
          <div className="w-16 bg-gray-100 p-1 text-center">날짜</div>
          <div className="pl-3">
            {new Date(notice?.createdAt?.toDate()).toLocaleDateString()}
          </div>
        </div>
        <div
          className="w-full p-8 border"
          dangerouslySetInnerHTML={{ __html: notice.content }}
        />
      </div>
    </>
  );
};

export default NoticeContent;
