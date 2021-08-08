import React from "react";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import StockTable from "./components/StockTable";

import { db } from "./firebase";
import Sidebar from "./components/sidebar/Sidebar";
import Notice from "./components/notice/Notice";
import NewAlbum from "./components/newalbum/NewAlbum";
import PhocaGoodsTable from "./components/phocagoodstable/PhocaGoodsTable";
import NoticeContent from "./components/notice/NoticeContent";
import Write from "./components/write/Write";
import NewAlbumContent from "./components/newalbum/NewAlbumContent";
import NewAlbumAdd from "./components/newalbum/NewAlbumAdd";

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
        <div className="flex h-auto">
          <Switch>
            <>
              {emails &&
                pathes?.map((pathh, index) => (
                  <React.Fragment key={index}>
                    <Route
                      exact
                      path={`/${pathh}/stock`}
                      render={props => (
                        <StockTable
                          price={prices[index]?.data?.price}
                          emails={emails}
                          pathes={pathes}
                          Sidebar={Sidebar}
                          pathh={pathh}
                          {...props}
                        />
                      )}
                    />
                    <Route
                      exact
                      path={`/${pathh}/newalbum/:id`}
                      render={props => (
                        <NewAlbumContent
                          Sidebar={Sidebar}
                          pathh={pathh}
                          {...props}
                        />
                      )}
                    />
                    <Route
                      exact
                      path={`/${pathh}/newalbumadd`}
                      render={props => (
                        <NewAlbumAdd
                          Sidebar={Sidebar}
                          pathh={pathh}
                          {...props}
                        />
                      )}
                    />
                    <Route
                      exact
                      path={`/${pathh}/newalbum`}
                      render={props => (
                        <NewAlbum Sidebar={Sidebar} pathh={pathh} {...props} />
                      )}
                    />
                    <Route
                      exact
                      path={`/${pathh}/phocagoods`}
                      render={props => (
                        <PhocaGoodsTable
                          price={prices[index]?.data?.price}
                          emails={emails}
                          pathes={pathes}
                          Sidebar={Sidebar}
                          pathh={pathh}
                          {...props}
                        />
                      )}
                    />

                    <Route
                      exact
                      path={`/${pathh}/notice/:id`}
                      render={props => (
                        <NoticeContent
                          Sidebar={Sidebar}
                          pathh={pathh}
                          {...props}
                        />
                      )}
                    />
                    <Route
                      exact
                      path={`/${pathh}/write`}
                      render={props => (
                        <Write Sidebar={Sidebar} pathh={pathh} {...props} />
                      )}
                    />
                    <Route
                      exact
                      path={`/${pathh}`}
                      render={props => (
                        <Notice Sidebar={Sidebar} pathh={pathh} {...props} />
                      )}
                    />
                  </React.Fragment>
                ))}
            </>
          </Switch>
        </div>
      </Router>
    );
  }

  return <div>loading...</div>;
}

export default App;
