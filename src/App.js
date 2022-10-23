import "./App.css";
import React, { useEffect, useState } from "react";
function App() {
  const [data, setData] = useState([]);
  const getData = () => {
    fetch("https://randomuser.me/api/?results=8")
      .then((p) => p.json())
      .then((p) => setData(p.results));
  };
  const loadMore = () => {
    fetch("https://randomuser.me/api/?results=8")
      .then((p) => p.json())
      .then((p) => setData([...data, ...p.results]));
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="App">
      <div className="container-fluid m-3"></div>
      <div className="container">
        {/*
         * Kullanıcı Ekleme işlemlerini yapacağım.
         *
         */}
        <div className="row m-3"></div>
        {/*
         * Kullanıcı listesini Card şeklinde göstereceğim  ve silme güncelleme işlemlerini
         * Card üzerindeki butonlar ile yapacağım.
         *
         */}
        <div className="row">
          <div className="ui special cards">
            {data.map((item, index) => {
              return (
                <div key={index} className="card">
                  <div className="blurring dimmable image">
                    <img src={item.picture.large} alt="" />
                  </div>
                  <div className="content">
                    <p className="header">
                      {item.name.title +
                        " " +
                        item.name.first +
                        " " +
                        item.name.last}
                    </p>
                    <div className="meta">
                      <span className="date">{item.location.country}</span>
                    </div>
                  </div>
                  <div className="extra content">
                    <div className="ui two buttons">
                      <div className="ui basic green button">Düzenle</div>
                      <div className="ui basic red button">Sil</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="gap-2 d-grid m-4">
            <button onClick={loadMore} className="btn btn-primary">
              {" "}
              Load More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
