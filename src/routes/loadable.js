import Loadable from "react-loadable";

export const App = Loadable({
  loader: () => import("./index"),
  loading: () => null
});
