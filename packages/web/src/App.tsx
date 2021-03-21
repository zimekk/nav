import { hot } from "react-hot-loader/root";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { historyBack, historyPush, increment } from "./actions";
import Cursor from "./Cursor";
import styles from "./App.module.scss";

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

function App() {
  const counter = useSelector(({ counter }: { counter: number }) => counter);
  const dispatch = useDispatch();

  return (
    <div className={styles.App}>
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
      <Cursor />
    </div>
  );
}

export default hot(App);
