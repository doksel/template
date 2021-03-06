import React, { useEffect, useState } from "react";
import { Spin } from "antd";

import "./FormLoader.module.less";

const FormLoader = () => {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const dotsAnimation = setInterval(() => {
      setDots(dots => {
        if (dots.length >= 3) {
          return "";
        }

        return dots + ".";
      });
    }, 300);

    return () => clearInterval(dotsAnimation);
  }, []);

  return (
    <div className="form-loader">
      <Spin size="large" />
      <span>Зачекайте{dots}</span>
    </div>
  );
};

export default FormLoader;
