import React, { Suspense, lazy } from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import { handleActions } from "redux-actions";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import {
  history,
  increment,
  locationHash,
  navigate,
  navigatePath,
  back,
} from "./actions";

const App = lazy(() => import("./App"));

const Spinner = () => <span>Loading...</span>;

const reducer = handleActions(
  new Map([
    [increment, (state) => ({ ...state, counter: state.counter + 1 })],
    [
      navigatePath,
      (state, { payload: current }) => ({
        ...state,
        history: [...state.history, state.current],
        current,
      }),
    ],
  ]),
  {
    counter: 1,
    current: "/",
    history: [],
  }
);

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

store.dispatch(locationHash(history.location.hash));

const unlisten = history.listen(({ location, action }) => {
  console.log({ action });
  // location is an object like window.location
  store.dispatch(locationHash(location.hash));
});

render(
  <Provider store={store}>
    <Suspense fallback={<Spinner />}>
      <App />
    </Suspense>
  </Provider>,
  document.body.appendChild(document.createElement("div"))
);
