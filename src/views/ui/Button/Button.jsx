import React from "react";
import cm from "classnames";

import s from "./Button.less";

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

const Button = ({
  children,
  outlined,
  primary,
  secondary,
  disabled,
  onClick,
  loading,
  type
}) => (
  <button
    className={cm(s.buttonMain, {
      [s.primary]: primary,
      [s.secondary]: secondary,
      [s.outlined]: outlined,
      [s.disabled]: disabled
    })}
    onClick={e => onClick && !loading && onClick(e)}
    disabled={disabled}
    type={type || "button"}
  >
    {loading ? <Loader /> : children}
  </button>
);

export default Button;
