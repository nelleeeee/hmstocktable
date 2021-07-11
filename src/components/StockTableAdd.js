import { useState } from "react";
import { db } from "../firebase";

export default function StockTableAdd() {
  const [inputs, setInputs] = useState({
    albumNumber: "",
    coverUrl: "",
    albumName: "",
    priceArrow: "no",
    albumPrice: "",
    quantity: "",
  });

  const { coverUrl, albumName, albumPrice, quantity, albumNumber, priceArrow } =
    inputs;

  const onChange = e => {
    const { value, name } = e.target;

    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const onReset = e => {
    e.preventDefault();
    db.collection("products").doc().set({
      albumNumber,
      coverUrl,
      albumName,
      priceArrow,
      albumPrice,
      quantity,
    });
    setInputs({
      albumNumber: "",
      coverUrl: "",
      albumName: "",
      priceArrow: "up",
      albumPrice: "",
      quantity: "",
    });
  };
  return (
    <form className="grid grid-cols-10 gap-2 pb-2 pt-2 align-middle">
      <input
        type="text"
        name="albumNumber"
        value={albumNumber}
        onChange={onChange}
        className="shadow-md"
      />
      <input
        type="text"
        name="coverUrl"
        value={coverUrl}
        onChange={onChange}
        className="shadow-md"
      />
      <input
        type="text"
        name="albumName"
        value={albumName}
        onChange={onChange}
        className="col-span-4 shadow-md"
      />

      <select name="priceArrow" value={priceArrow} onChange={onChange}>
        <option name="priceArrow" value="up">
          상승
        </option>
        <option name="priceArrow" value="no">
          유지
        </option>
        <option name="priceArrow" value="down">
          하락
        </option>
      </select>

      <input
        type="text"
        name="albumPrice"
        value={albumPrice}
        onChange={onChange}
        className="shadow-md"
      />
      <input
        type="text"
        name="quantity"
        value={quantity}
        onChange={onChange}
        className="shadow-md"
      />

      <button onClick={onReset}>저장</button>
    </form>
  );
}
