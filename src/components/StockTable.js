import { useEffect, useState } from "react";
import { auth, db, provider } from "../firebase";
import StockTableAdd from "./StockTableAdd";
import StockTableRow from "./StockTableRow";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { useAuthState } from "react-firebase-hooks/auth";
import StockTableAdmin from "../components/StockTableAdmin";
import StockTablePrice from "../components/StockTablePrice";

export default function StockTable({ price, pathes, emails }) {
  const [user] = useAuthState(auth);
  const [products, setProducts] = useState([]);

  const [lastNumber, setLastNumber] = useState("");
  const userAuth = emails.find(e => e.id === user?.email);
  const [prices, setPrices] = useState();

  // 유저 로그인
  const conf = () => {
    if (userAuth?.data?.auth) {
      return true;
    } else {
      return false;
    }
  };

  // const user = true;
  // 관리자일경우 걸럼갯수 하나 증가 열이름 버튼
  const signIn = e => {
    e.preventDefault();
    auth.signInWithRedirect(provider).catch(e => alert(e.message));
  };

  const logout = () => {
    auth.signOut();
  };

  useEffect(() => {
    db.collection("products")
      .orderBy("albumNumber", "desc")
      .onSnapshot(snapshot => {
        setProducts(
          snapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
    db.collection("products").onSnapshot(snapshot =>
      setLastNumber(snapshot.docs.map(doc => ({ data: doc.data() })).length + 1)
    );
    db.collection("addprice").onSnapshot(snapshot =>
      setPrices(snapshot.docs.map(doc => ({ id: doc.id, data: doc.data() })))
    );
  }, []);

  return (
    <div className="flex-col w-3/4 m-auto mt-2">
      <VpnKeyIcon
        style={{
          color: "lightgrey",
          position: "fixed",
          left: "3",
          bottom: "3",
        }}
        onClick={user ? logout : signIn}
      />
      {userAuth && userAuth.data.own && <StockTableAdmin />}
      {userAuth && userAuth.data.own && prices && (
        <StockTablePrice pathes={pathes} prices={prices} />
      )}
      <div
        className={`grid grid-cols-${
          conf() ? "10" : "9"
        } gap-2 grid-flow-col bg-blue-500 text-center h-8 items-center justify-center text-gray-100 rounded-sm text-lg`}
      >
        <div>번호</div>
        <div>사진</div>
        <div className="col-span-4">제목</div>
        <div>변동</div>

        <div>가격</div>
        <div>수량</div>
        {conf() ? <div>버튼</div> : ""}
      </div>
      {conf() && lastNumber ? <StockTableAdd lastNumber={lastNumber} /> : ""}
      {products?.map(product => (
        <StockTableRow
          key={product.id}
          id={product.id}
          albumNumber={product.data.albumNumber}
          coverUrl={product.data.coverUrl}
          albumName={product.data.albumName}
          priceArrow={product.data.priceArrow}
          albumPrice={product.data.albumPrice}
          quantity={product.data.quantity}
          price={price}
          user={conf()}
        />
      ))}
    </div>
  );
}
