import React from "react";
import { Button } from "antd";
import { withRouter } from "react-router-dom";

import "./FormBottomNavPanel.less";

const onExit = history => {
  let splitedPath = history.location.pathname.split("/");

  history.push(splitedPath.splice(0, splitedPath.length - 1).join("/"));
};

const FormBottomNavPanel = ({
  onBack,
  onNext,
  onFinishWork,
  history,
  disabledNextButton,
  leftButtons,
  rightButtons,
  steps,
  activeKey,
  showSubmitButton,
  loadNextButton
}) => (
  <div className="form-bottom-nav-panel">
    <div>
      <Button
        type="primary big-buttons"
        size="large"
        onClick={onBack}
        disabled={activeKey === 0}
      >
        Назад
      </Button>
      {leftButtons}
    </div>

    <div className="group-buttons">
      <Button type="danger" size="large" ghost onClick={() => onExit(history)}>
        Вихід
      </Button>

      {onFinishWork && activeKey === steps.length - 1 && (
        <Button type="primary" size="large" onClick={() => onExit(history)}>
          Завершити
        </Button>
      )}

      {rightButtons}

      {!showSubmitButton && (
        <Button
          type="primary"
          size="large"
          onClick={onNext}
          loading={loadNextButton}
          disabled={disabledNextButton}
        >
          Далі
        </Button>
      )}
    </div>
  </div>
);

export default withRouter(FormBottomNavPanel);
