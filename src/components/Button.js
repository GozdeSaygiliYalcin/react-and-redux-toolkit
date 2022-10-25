import React from "react";
import { useDispatch } from "react-redux";
import { setGroup1, setGroup2 } from "../store/features/colorSlice";
export default function Buttons() {
  const dispatch = useDispatch();
  return (
    <div>
      <button
        onClick={() => {
          dispatch(setGroup1("brown"));
        }}
        className="btn btn-primary"
      >
        1. Grup
      </button>{" "}
      <br></br>
      <button
        onClick={() => {
          dispatch(setGroup2("white"));
        }}
        className="btn btn-secondary"
      >
        2.Grup
      </button>
    </div>
  );
}
