import { useState } from "react";
import { db } from "../firebase";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import RemoveIcon from "@material-ui/icons/Remove";

export default function StockTableRow({
  id,
  albumNumber,
  coverUrl,
  albumName,
  priceArrow,
  albumPrice,
  quantity,
  user,
  price,
}) {
  // 유저 로그인하면 그리드 컬럼 갯수 늘리기 for fix

  // 수정 기능 수정버튼 누르면
  // fix 변수 true로 -> 트루되면 div들 input으로 value는 prop값으로

  const [fix, setFix] = useState(false);
  const fixHandle = () => {
    if (fix) {
      setFix(false);
    } else {
      setFix(true);
    }
  };

  const [fixeds, setfixeds] = useState({
    albumNumberFix: albumNumber,
    coverUrlFix: coverUrl,
    albumNameFix: albumName,
    priceArrowFix: priceArrow,
    albumPriceFix: albumPrice,
    quantityFix: quantity,
  });
  const {
    coverUrlFix,
    albumNameFix,
    albumPriceFix,
    quantityFix,
    albumNumberFix,
    priceArrowFix,
  } = fixeds;
  const onChange = e => {
    const { value, name } = e.target;

    setfixeds({
      ...fixeds,
      [name]: value,
    });
  };

  const fixUpdate = () => {
    if (
      albumNumberFix === "삭제" ||
      coverUrlFix === "삭제" ||
      albumNameFix === "삭제" ||
      priceArrowFix === "삭제" ||
      albumPriceFix === "삭제" ||
      quantityFix === "삭제"
    ) {
      return db.collection("products").doc(id).delete();
    }
    db.collection("products").doc(id).update({
      albumNumber: albumNumberFix,
      coverUrl: coverUrlFix,
      albumName: albumNameFix,
      priceArrow: priceArrowFix,
      albumPrice: albumPriceFix,
      quantity: quantityFix,
    });
    setfixeds({
      albumNumberFix,
      coverUrlFix,
      albumNameFix,
      priceArrowFix,
      albumPriceFix,
      quantityFix,
    });
    fixHandle();
  };

  return (
    <div
      id={id}
      className={`grid grid-cols-${
        user ? 10 : 9
      } gap-2 pb-2 h-20 text-center items-center justify-center w-full`}
    >
      {fix ? (
        <>
          <input
            type="text"
            name="albumNumberFix"
            value={albumNumberFix}
            onChange={onChange}
            className="text-center shadow-md"
          />
          <input
            type="text"
            name="coverUrlFix"
            value={coverUrlFix}
            onChange={onChange}
            className="text-center  shadow-md"
          />
          <input
            type="text"
            name="albumNameFix"
            value={albumNameFix}
            onChange={onChange}
            className="col-span-4 text-center shadow-md"
          />
          <select
            name="priceArrowFix"
            value={priceArrowFix}
            onChange={onChange}
          >
            <option name="priceArrowFix" value="up">
              상승
            </option>
            <option name="priceArrowFix" value="no">
              유지
            </option>
            <option name="priceArrowFix" value="down">
              하락
            </option>
            <option name="priceArrowFix" value="삭제">
              삭제
            </option>
          </select>

          <input
            type="text"
            name="albumPriceFix"
            value={albumPriceFix}
            onChange={onChange}
            className="text-center shadow-md"
          />
          <input
            type="text"
            name="quantityFix"
            value={quantityFix}
            onChange={onChange}
            className="text-center shadow-md"
          />
          {fix && user ? <button onClick={fixUpdate}>저장</button> : ""}
        </>
      ) : (
        <>
          <div>{albumNumber}</div>
          <div
            className="h-16 bg-contain bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${coverUrl})` }}
          ></div>
          <div className="col-span-4">{albumName}</div>
          <div>
            {priceArrow === "up" ? (
              <ArrowUpwardIcon style={{ color: "red" }} />
            ) : priceArrow === "down" ? (
              <ArrowDownwardIcon style={{ color: "blue" }} />
            ) : (
              <RemoveIcon style={{ color: "gray" }} />
            )}
          </div>
          <div>{Number(albumPrice) + Number(price)} 원</div>
          <div>{quantity} 장</div>
          {!fix && user ? <button onClick={fixHandle}>수정</button> : ""}
        </>
      )}
    </div>
  );
}
