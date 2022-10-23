import "./App.css";
import React, { useEffect, useState } from "react";
function App() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [moreLoading, setMoreLoading] = useState(false);
  const [userProfile, setUserProfile] = useState({
    authId: 0,
    userName: "",
    email: "",
  });
  const saveUserProfile = (user) => {
    fetch("http://34.69.208.110:9092/v1/api/user/newcreateuser", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Accept-Encoding": "br;q=1.0, gzip;q=0.8, *;q=0.1",
      },
      body: JSON.stringify(user),
    })
      .then((data) => {
        setPage(0);
        getAllUsers(0);
      })
      .catch((err) => console.log("something went wrong ", err));
  };
  const getAllUsers = (currentPage) => {
    setTimeout(() => {
      fetch(
        `http://34.69.208.110:9092/v1/api/user/findallslice?currentPage=${currentPage}&pageSize=8&sortParameter=id&direction=desc`
      )
        .then((p) => p.json())
        .then((p) => {
          if (p.totalPages === currentPage) alert("Last page");
          if (currentPage === 0) setData(p.content);
          else setData([...data, ...p.content]);
          setLoading(false);
          setMoreLoading(false);
        })
        .catch((err) => console.log(err));
    }, 3000);
  };
  console.log(data);
  const loadMore = () => {
    setPage(page + 1);
    getAllUsers(page + 1);
    setMoreLoading(true);
  };
  useEffect(() => {
    getAllUsers(0);
    setLoading(true);
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
        <form className="ui form">
          <div className="field">
            <label>AuthId</label>
            <input
              type="text"
              onChange={(p) =>
                setUserProfile({ ...userProfile, authid: p.target.value })
              }
              placeholder="Auth id"
            />
          </div>
          <div className="field">
            <label>User Name</label>
            <input
              type="text"
              onChange={(p) =>
                setUserProfile({ ...userProfile, userName: p.target.value })
              }
              placeholder="UserName"
            />
          </div>
          <div className="field">
            <label>Email</label>
            <input
              type="text"
              onChange={(p) =>
                setUserProfile({ ...userProfile, email: p.target.value })
              }
              placeholder="E-Mail"
            />
          </div>
          <button
            type="button"
            className="ui button"
            onClick={() => saveUserProfile(userProfile)}
          >
            Kaydet
          </button>
        </form>
        {/*
         * Kullanıcı listesini Card şeklinde göstereceğim  ve silme güncelleme işlemlerini
         * Card üzerindeki butonlar ile yapacağım.
         *
         */}
        <div className="row">
          {loading ? (
            <iframe
              title="loading"
              src="https://embed.lottiefiles.com/animation/98194"
              style={{ marginLeft: "25%", width: "50%", height: "50%" }}
            ></iframe>
          ) : null}
          <div className="ui special cards">
            {data.map((item, index) => {
              return (
                <div key={index} className="card">
                  <div className="blurring dimmable image">
                    <img
                      src={
                        "https://semantic-ui.com/images/avatar2/large/matthew.png"
                      }
                      alt=""
                    />
                  </div>
                  <div className="content">
                    <p className="header">{item.username}</p>
                    <div className="meta">
                      <span className="date">{item.email}</span>
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
          {moreLoading ? (
            <iframe
              title="moreloading"
              src="https://embed.lottiefiles.com/animation/98194"
              style={{ marginLeft: "25%", width: "50%", height: "50%" }}
            ></iframe>
          ) : null}
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
