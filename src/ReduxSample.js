import React from "react";
import "./App.css";
import Buttons from "./components/Buttons";
import Group1Box from "./components/Group1Box";
import Group1Box2 from "./components/Group1Box2";
import Group2Box from "./components/Grup2Box";
import Group2Box2 from "./components/Grup2Box2";

export default function ReduxSample() {
  //const [grup1, setGrup1] = React.useState('yellow');
  // const [grup2, setGrup2] = React.useState('yellow');
  console.log("Render ReduxSample");
  return (
    <div className="container">
      <div className="row" style={{ height: 120, backgroundColor: "red" }}>
        <div className="col-md-2">
          <Buttons />
        </div>
        <div className="col-md-2"></div>
        <div className="col-md-2">
          <Group1Box />
        </div>
        <div className="col-md-2"></div>
        <div className="col-md-2">
          <Group1Box2 />
        </div>
      </div>
      <div className="row" style={{ height: 120, backgroundColor: "green" }}>
        <div className="col-md-2"></div>
        <div className="col-md-2">
          <Group2Box />
        </div>
        <div className="col-md-2"></div>
        <div className="col-md-2">
          <Group2Box2 />
        </div>
        <div className="col-md-2"></div>
      </div>
    </div>
  );
}
