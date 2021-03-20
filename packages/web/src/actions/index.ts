import { createBrowserHistory } from "history";
import { createAction, createActions } from "redux-actions";

export const history = createBrowserHistory();

const rand = Math.random();
let idx = 0;

export const historyBack = createAction("HISTORY_BACK", () => history.back());
export const historyPush = createAction("HISTORY_PUSH", (page: string) =>
  history.push(page, { rand, idx: idx++ })
);
export const historyReplace = createAction("HISTORY_REPLCE", (page: string) =>
  history.replace(page, { rand, idx: idx++ })
);

export const { increment, navigate, navigatePath } = createActions({
  INCREMENT: null,
  NAVIGATE: (path) => {
    console.log(["navigate"], path);
    history.push(`#${path}`);
  },
  NAVIGATE_PATH: null,
});

export const locationHash = (locationHash) => (dispatch) => {
  const [path, hash = "/"] = decodeURI(locationHash).match(/^#(.+)/) || [];
  console.log(["LOCATION_HASH"], path, hash);
  dispatch(navigatePath(hash));
};
