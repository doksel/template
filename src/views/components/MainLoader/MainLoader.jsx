import React from "react";

import cm from "classnames";
import s from "./MainLoader.module.less";

const MainLoader = ({ loading }) => (
  <div
    className={cm(s.main_loader, {
      [s.active]: loading
    })}
  >
    <div className={s.loader}>
      <div className={s.lds_ring}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  </div>
);

export default MainLoader;
