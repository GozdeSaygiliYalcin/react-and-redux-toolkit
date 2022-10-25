import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchGetAllUsers,
  nextPage,
  setEmail,
  setUsername,
  setAuthId,
  fetchSaveUserProfile,
  resetPage,
} from "./store/features/userSlice";

export default function UserList() {
  const dispatch = useDispatch();
  /**
   * Global state içindeki usera ait state bilgisini çeker
   * useSlice içindeki tüm initialState bilgileri gelir
   * DİKKAT!!! Bu şekilde kullanırken dikkat etmek gerekir
   * Çünkü state içindeki bir bilgi değişirse buna ait
   * diğer tüm bileşenler de render olur
   */
  //  const user = useSelector((state)=>state.user)

  /**
   * Tüm state bilgisini çekmek yerine sadece gerekli olan state
   * bileşenlerini çekmek render sayısında hatrı sayılır
   * bir azalmaya neden olacaktır.
   */
  const userProfileList = useSelector((state) => state.user.userProfileList);
  const userProfile = useSelector((state) => state.user.userProfile);
  const isLoading = useSelector((state) => state.user.isLoading);
  const isLoadMoreLoading = useSelector(
    (state) => state.user.isLoadMoreLoading
  );
  const page = useSelector((state) => state.user.page);
  const saveProfile = () => {
    /**
     * Eğer bir işlem bittikten sonra başka bir işlem yapmak istiyorsanız async işlemlerin
     * bitiminde yapmanız gereklidir. Methodun sonuna kodlama yapmak anlamsızdır.
     */
    dispatch(resetPage(0));
    dispatch(fetchSaveUserProfile(userProfile)).then(() => {
      /**
       * Bu methodun işlemini bitirip geriye döndüğünde çalışır.
       */
      dispatch(fetchGetAllUsers(0));
    });
  };

  const loadMore = () => {
    dispatch(fetchGetAllUsers(page + 1));
    dispatch(nextPage());
  };

  useEffect(() => {
    dispatch(fetchGetAllUsers(0));
  }, []);

  return (
    <div className="App">
      <div className="container-fluid m-3"></div>
      <div className="container">
        {/*
         * Kullanıcı Ekleme işlemlerini yapacağım.
         *
         */}
        <div className="row m-3">
          <form className="ui form">
            <div className="field">
              <label>AuthId</label>
              <input
                type="text"
                onChange={(data) => dispatch(setAuthId(data.target.value))}
                placeholder="Auth id"
              />
            </div>
            <div className="field">
              <label>User Name</label>
              <input
                type="text"
                onChange={(data) => dispatch(setUsername(data.target.value))}
                placeholder="UserName"
              />
            </div>
            <div className="field">
              <label>Email</label>
              <input
                type="text"
                onChange={(data) => dispatch(setEmail(data.target.value))}
                placeholder="E-Mail"
              />
            </div>
            <button type="button" onClick={saveProfile} className="ui button">
              Kaydet
            </button>
          </form>
        </div>
        {/*
         * Kullanıcı listesini Card şeklinde göstereceğim  ve silme güncelleme işlemlerini
         * Card üzerindeki butonlar ile yapacağım.
         *
         */}
        <div className="row">
          {isLoading ? (
            <iframe
              src="https://embed.lottiefiles.com/animation/98194"
              style={{ marginLeft: "25%", width: "50%", height: "50%" }}
            ></iframe>
          ) : null}
          <div className="ui special cards">
            {userProfileList.map((item, index) => {
              return (
                <div key={index} className="card">
                  <div className="blurring dimmable image">
                    <img
                      src="https://semantic-ui.com/images/avatar2/large/matthew.png"
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
          {isLoadMoreLoading ? (
            <iframe
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
