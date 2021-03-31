import { hot } from "react-hot-loader/root";
import React, { lazy, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { historyBack, historyPush, increment } from "./actions";
import { delay } from "./utils";
import Cursor from "./Cursor";
import styles from "./App.module.scss";

const Page1 = lazy(() =>
  Promise.all([import("./Page1"), delay()]).then(([d]) => d)
);

const Page2 = () => <div>Page2</div>;

const Page3 = () => <div>Page3</div>;

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
  const current = useSelector(({ current }: { current: string }) => current);
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
        {((Page = "div") => (
          <Page />
        ))(
          {
            page1: Page1,
            page2: Page2,
            page3: Page3,
          }[current]
        )}
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
