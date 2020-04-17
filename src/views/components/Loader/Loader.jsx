import React from "react";

import s from "./Loader.module.less";

const Loader = () => (
  <div className={s.loader}>
    <div className={s.lds_ring}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
);

export default Loader;
