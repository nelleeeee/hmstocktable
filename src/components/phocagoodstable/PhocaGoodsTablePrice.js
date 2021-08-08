import React from "react";
import { useState } from "react";
import { db } from "../../firebase";

const StockTablePrice = ({ prices, pathes }) => {
  const [inputs, setInputs] = useState({
    [pathes[0]]: prices.find(price => price.id === pathes[0]).data.price,
    [pathes[1]]: prices.find(price => price.id === pathes[1]).data.price,
    [pathes[2]]: prices.find(price => price.id === pathes[2]).data.price,
  });

  const { first, second, hmstocktable } = inputs;

  const onChange = e => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: Number(value),
    });
  };

  const onSubmit = e => {
    e.preventDefault();
    db.collection("addprice")
      .doc(pathes[0])
      .update({ price: Number(first) });
    db.collection("addprice")
      .doc(pathes[1])
      .update({ price: Number(second) });
    db.collection("addprice")
      .doc(pathes[2])
      .update({ price: Number(hmstocktable) });

    alert("저장되었습니다");
  };

  return (
    <div className="flex flex-row">
      <div>
        <div>/first</div>
        <input name={pathes[0]} value={first} onChange={onChange} type="text" />
      </div>
      <div>
        <div>/second</div>
        <input
          name={pathes[1]}
          value={second}
          onChange={onChange}
          type="text"
        />
      </div>
      <div>
        <div>/hmstocktable</div>
        <input
          name={pathes[2]}
          value={hmstocktable}
          onChange={onChange}
          type="text"
        />
      </div>
      <button onClick={onSubmit}>저장</button>
    </div>
  );
};

export default StockTablePrice;
