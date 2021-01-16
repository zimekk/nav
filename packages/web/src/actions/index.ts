import { createBrowserHistory } from "history";
import { createActions } from "redux-actions";

export const history = createBrowserHistory();

export const { increment, navigate, navigatePath, back } = createActions({
  INCREMENT: null,
  NAVIGATE: (path) => {
    console.log(["navigate"], path);
    history.push(`#${path}`);
  },
  NAVIGATE_PATH: null,
  BACK: () => history.back(),
});

export const locationHash = (locationHash) => (dispatch) => {
  const [path, hash = "/"] = decodeURI(locationHash).match(/^#(.+)/) || [];
  console.log(["LOCATION_HASH"], path, hash);
  dispatch(navigatePath(hash));
};
