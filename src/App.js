import React from "react";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import StockTable from "./components/StockTable";
import { db } from "./firebase";

function App() {
  const [pathes] = useState(["first", "second", "hmstocktable"]);
  const [prices, setPrices] = useState([]);

  // 추가가격 db에 만들어두고 첫화면에서 useeffect로 불러와서 뿌리기
  useEffect(() => {
    db.collection("addprice").onSnapshot(snapshot => {
      setPrices(
        snapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);

  return (
    <Router>
      {pathes?.map((pathh, index) => (
        <Route
          key={index}
          exact
          path={`/${pathh}`}
          render={() => <StockTable price={prices[index]?.data?.price} />}
        />
      ))}
    </Router>
  );
}

export default App;
