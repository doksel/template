import React from "react";
import cm from "classnames";

import Loader from "../../components/Loader/Loader";
import s from "./Button.module.less";

const Button = ({
  children,
  outlined,
  primary,
  secondary,
  success,
  disabled,
  onClick,
  loading,
  type
}) => (
  <button
    className={cm(s.buttonMain, {
      [s.primary]: primary,
      [s.secondary]: secondary,
      [s.success]: success,
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
