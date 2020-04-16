import React from "react";
import cm from "classnames";

import s from "./PrintButton.less";

const PrintButton = ({
  children,
  freeTopSpace,
  outlined,
  primary,
  disabled,
  onClick,
  data,
  download,
  type,
  generatePdfDoc
}) => (
  <button
    className={cm(s.buttonDownload, {
      [s.primary]: primary,
      [s.outlined]: outlined,
      [s.disabled]: disabled,
      [s.freeTopSpace]: freeTopSpace
    })}
    onClick={generatePdfDoc}
    disabled={disabled}
    type={type || "button"}
  >
    <a className={s.download_icons__link}>
      <img
        src="https://design.gov.ua/themes/design/assets/images/download.svg"
        alt=""
      />
    </a>
    <div>
      <div className={s.__text}>Завантажити реквiзити</div>
    </div>
    {children}
  </button>
);
export default PrintButton;
