import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { back, increment } from "./actions";

export default () => {
  const counter = useSelector(({ counter }) => counter);
  const dispatch = useDispatch();

  return (
    <div>
      <a href="#" onClick={(e) => e.preventDefault() || dispatch(back())}>
        &#171; back
      </a>
      <h1>nav</h1>
      <div>
        <button onClick={(e) => dispatch(increment())}>{counter}</button>
        <a href="#page1">page1</a>
        <a href="#page2">page2</a>
        <a href="#page3">page3</a>
      </div>
      <pre>
        {JSON.stringify(
          useSelector((state) => state),
          null,
          2
        )}
      </pre>
    </div>
  );
};
