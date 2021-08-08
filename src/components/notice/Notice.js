import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router";
import { auth, db } from "../../firebase.js";
import { useAuthState } from "react-firebase-hooks/auth";
import NoticeRow from "./NoticeRow.js";
const Notice = ({ Sidebar, pathh }) => {
  const [user] = useAuthState(auth);
  const history = useHistory();

  const [notices, setNotices] = useState([]);
  console.log(user);
  useEffect(() => {
    db.collection("notice")
      .orderBy("createdAt", "desc")
      .onSnapshot(snapshot =>
        setNotices(snapshot.docs.map(doc => ({ id: doc.id, data: doc.data() })))
      );
  }, []);
  return (
    <>
      <Sidebar pathh={pathh} />
      <div className="flex-col w-3/4 m-auto mt-20">
        <div className="flex flex-col">
          <div className="text-lg text-center font-semibold my-5">공지사항</div>

          {user.email === "kurare72@gmail.com" ? (
            <div
              onClick={() => history.push(`/${pathh}/write`)}
              className="self-end bg-gray-400 text-gray-200 
             cursor-pointer py-1 px-3 rounded m-1"
            >
              글쓰기
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="grid grid-cols-6 bg-gray-500 text-center p-1 rounded-sm">
          <div className="col-span-5 text-gray-200">제목</div>
          <div className="text-gray-200">날짜</div>
        </div>
        {notices.map(notice => (
          <NoticeRow key={notice.id} notice={notice} pathh={pathh} />
        ))}
      </div>
    </>
  );
};

export default Notice;
