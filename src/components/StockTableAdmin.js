import React from "react";
import { useState } from "react";
import { db } from "../firebase";
const StockTableAdmin = () => {
  const [input, setInput] = useState({ email: "" });

  const { email } = input;

  const onChange = e => {
    const { value, name } = e.target;

    setInput({
      [name]: value,
    });
  };

  const onSubmit = e => {
    e.preventDefault();
    db.collection("admins").doc(email).set({ auth: true, own: false });

    alert("저장되었습니다");
  };
  return (
    <div className="flex flex-row">
      <div>관리자 수정</div>
      <input type="text" name="email" value={email} onChange={onChange} />
      <button onClick={onSubmit}>저장</button>
    </div>
  );
};

export default StockTableAdmin;
