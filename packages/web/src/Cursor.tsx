import React, { useEffect, useRef } from "react";
import styles from "./Cursor.module.scss";

export default function Cursor() {
  const ref = useRef(null);
  useEffect(() => {
    const mousemove = (e) =>
      Object.assign(ref.current.style, {
        top: `${e.pageY - document.body.parentElement.scrollTop}px`,
        left: `${e.pageX - document.body.parentElement.scrollLeft}px`,
      });
    const mousedown = (e) => {
      // https://css-tricks.com/restart-css-animation/
      ref.current.classList.remove(styles.Active);
      void ref.current.offsetWidth;
      ref.current.classList.add(styles.Active);
    };
    // const mouseup = (e) => ref.current.classList.remove(styles.Active);
    const mouseenter = (e) =>
      Object.assign(ref.current.style, {
        opacity: 1,
      });
    const mouseleave = (e) =>
      Object.assign(ref.current.style, {
        opacity: 0,
      });
    document.addEventListener("mousemove", mousemove);
    document.addEventListener("mousedown", mousedown);
    // document.addEventListener("mouseup", mouseup);
    document.addEventListener("mouseenter", mouseenter);
    document.addEventListener("mouseleave", mouseleave);
    return () => {
      document.removeEventListener("mousemove", mousemove);
      document.removeEventListener("mousedown", mousedown);
      // document.removeEventListener("mouseup", mouseup);
      document.removeEventListener("mouseenter", mouseenter);
      document.removeEventListener("mouseleave", mouseleave);
    };
  }, []);

  return <div ref={ref} className={styles.Cursor} />;
}
