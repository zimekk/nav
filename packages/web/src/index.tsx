import React, { Suspense, lazy } from "react";
import { render } from "react-dom";

const App = lazy(() => import("./App"));

const Spinner = () => <span>Loading...</span>;

render(
  <Suspense fallback={<Spinner />}>
    <App />
  </Suspense>,
  document.body.appendChild(document.createElement("div"))
);
