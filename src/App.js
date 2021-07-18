import React from "react";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HeadMessage from "./components/HeadMessage";
import StockTable from "./components/StockTable";

import { db } from "./firebase";

function App() {
  const [pathes] = useState(["first", "second", "hmstocktable"]);
  const [prices, setPrices] = useState();
  const [emails, setEmails] = useState();
  // 추가가격 db에 만들어두고 첫화면에서 useeffect로 불러와서 뿌리기
  useEffect(() => {
    db.collection("addprice")
      .orderBy("index", "asc")
      .onSnapshot(snapshot => {
        setPrices(
          snapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
    db.collection("admins").onSnapshot(snapshot =>
      setEmails(snapshot.docs.map(doc => ({ id: doc.id, data: doc.data() })))
    );
  }, []);

  if (prices) {
    return (
      <Router>
        <HeadMessage />
        {emails &&
          pathes?.map((pathh, index) => (
            <Route
              key={index}
              exact
              path={`/${pathh}`}
              render={props => (
                <StockTable
                  price={prices[index]?.data?.price}
                  emails={emails}
                  pathes={pathes}
                  {...props}
                />
              )}
            />
          ))}
      </Router>
    );
  }

  return <div>ddd</div>;
}

export default App;
