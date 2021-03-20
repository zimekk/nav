import { hot } from "react-hot-loader/root";
import React, { useEffect, useRef } from "react";
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

function Cursor() {
  const ref = useRef(null);
  useEffect(() => {
    const mousemove = (e) =>
      Object.assign(ref.current.style, {
        top: `${e.pageY - document.body.parentElement.scrollTop}px`,
        left: `${e.pageX - document.body.parentElement.scrollLeft}px`,
      });
    const mousedown = (e) =>
      Object.assign(ref.current.style, {
        width: `${32}px`,
        height: `${32}px`,
      });
    const mouseup = (e) =>
      Object.assign(ref.current.style, {
        width: `${16}px`,
        height: `${16}px`,
      });
    const mouseenter = (e) =>
      Object.assign(ref.current.style, {
        display: "block",
      });
    const mouseleave = (e) =>
      Object.assign(ref.current.style, {
        display: "none",
      });
    document.addEventListener("mousemove", mousemove);
    document.addEventListener("mousedown", mousedown);
    document.addEventListener("mouseup", mouseup);
    document.addEventListener("mouseenter", mouseenter);
    document.addEventListener("mouseleave", mouseleave);
    return () => {
      document.removeEventListener("mousemove", mousemove);
      document.removeEventListener("mousedown", mousedown);
      document.removeEventListener("mouseup", mouseup);
      document.removeEventListener("mouseenter", mouseenter);
      document.removeEventListener("mouseleave", mouseleave);
    };
  }, []);

  return (
    <div
      ref={ref}
      style={{
        border: "1px solid red",
        borderRadius: "50%",
        width: 16,
        height: 16,
        transform: `translate(-50%, -50%)`,
        transition: "all 0.2s ease",
        transitionProperty: "width, height",
        position: "fixed",
        display: "block",
        pointerEvents: "none",
      }}
    />
  );
}

function App() {
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
      <Cursor />
    </div>
  );
}

export default hot(App);
