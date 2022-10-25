import React from "react";
import { useSelector } from "react-redux";
export default function Group1Box2() {
  console.log("Render Group1KBox2");
  const color = useSelector((state) => state.color.group1);
  return (
    <div
      style={{
        width: 50,
        height: 50,
        backgroundColor: color === null ? "yellow" : color,
      }}
    ></div>
  );
}
