import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { historyBack, historyPush, increment } from "./actions";

const A = ({ ...props }) => {
  const dispatch = useDispatch();

  return (
    <a
      {...props}
      onClick={(e) =>
        e.preventDefault() ||
        dispatch(historyPush(e.currentTarget.getAttribute("href")))
      }
    />
  );
};

export default () => {
  const counter = useSelector(({ counter }: { counter: number }) => counter);
  const dispatch = useDispatch();

  return (
    <div>
      <a
        href="#"
        onClick={(e) => e.preventDefault() || dispatch(historyBack())}
      >
        &#171; back
      </a>
      <h1>nav</h1>
      <div>
        <button onClick={(e) => dispatch(increment())}>{counter}</button>
        <div>
          <a href="#page1">page1</a>
          <a href="#page2">page2</a>
          <a href="#page3">page3</a>
        </div>
        <div>
          <A href="#page1">page1</A>
          <A href="#page2">page2</A>
          <A href="#page3">page3</A>
        </div>
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
