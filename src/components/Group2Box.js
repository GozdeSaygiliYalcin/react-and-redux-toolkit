import React from "react";
import { useSelector } from "react-redux";
export default function Group2Box() {
  console.log("Render Group2Box");
  const color = useSelector((state) => state.color.group2);
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
