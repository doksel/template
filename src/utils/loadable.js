import React from "react";
import store from "../state/store";
import Loadable from "react-loadable";

import { startLoading, stopLoading } from "../state/ducks/loader/actions";

export const loadable = (component, params = {}) =>
  Loadable({
    loader: () => {
      store.dispatch(startLoading());
      return component();
    },
    loading: () => null,
    render(loaded, props) {
      let Component = loaded.default;
      store.dispatch(stopLoading());

      return <Component {...props} {...params} />;
    }
  });
