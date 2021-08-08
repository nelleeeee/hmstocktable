import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { db } from "../../firebase";
import { useHistory } from "react-router";

export const Write = ({ Sidebar, pathh }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const onChangeTitle = e => {
    setTitle(e.target.value);
  };
  const history = useHistory();

  const saveContent = async () => {
    await db.collection("notice").doc().set({
      createdAt: new Date(),
      title: title,
      content,
    });
    alert("글이 작성되었습니다.");
    history.push(`/${pathh}`);
  };

  return (
    <>
      <Sidebar />
      <div className="flex flex-col items-center w-5/6">
        <input
          type="text"
          placeholder="제목"
          onChange={onChangeTitle}
          value={title}
          className="w-3/5 p-1 border mt-16 mb-8"
        />
        <CKEditor
          editor={ClassicEditor}
          onChange={(event, editor) => {
            const data = editor.getData();
            setContent(data);
          }}
        />
        <button
          onClick={saveContent}
          className="mt-12 py-1 px-5 bg-gray-400 rounded text-gray-200"
        >
          글쓰기
        </button>
      </div>
    </>
  );
};
export default Write;
