import React, { useEffect } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import NavigationPrompt from "react-router-navigation-prompt";
import { Beforeunload } from "react-beforeunload";
import Button from "../../ui/Button/Button";

import s from "./ConfirmModal.module.less";

const ConfirmModal = ({
  form,
  location,
  title = "Попередження!",
  content = "Ви впевнені, що бажаєте залишити цю сторінку?"
}) => {
  useEffect(() => {
    return () => {
      document.body.style.overflow = "unset";
    };
  });
  const nameFormDestroy = Object.keys(form)[0];

  const checkOnUpdate = (nextLocation, isReload) => {
    if (!nextLocation) {
      return false;
    }

    const hasForm =
      form &&
      form[nameFormDestroy] &&
      form[nameFormDestroy].values &&
      Object.keys(form[nameFormDestroy].values).length;

    const mainUrl = nextLocation.pathname.split("/")[1];

    if (nextLocation.pathname.startsWith(`/${mainUrl}`) && hasForm) {
      return true;
    }

    return false;
  };

  const when = (crntLocation, nextLocation) => {
    const hasForm =
      form &&
      form[nameFormDestroy] &&
      form[nameFormDestroy].values &&
      Object.keys(form[nameFormDestroy].values).length;

    const isValid = crntLocation.pathname.match("forms") && hasForm;

    if (isValid) {
      return checkOnUpdate(nextLocation);
    } else {
      return;
    }
  };

  return (
    <>
      <NavigationPrompt when={when}>
        {({ onCancel, onConfirm, isActive }) => {
          document.body.style.overflow = "hidden";
          return (
            <div className={s.wrap_modal}>
              <div className={s.modal}>
                <div>{title}</div>
                <div>{content}</div>
                <div className={s.wrapButton}>
                  <>
                    <Button
                      primary
                      onClick={() => {
                        onCancel();
                        document.body.style.overflow = "unset";
                      }}
                    >
                      Скасувати
                    </Button>
                    <Button primary onClick={onConfirm}>
                      Ок
                    </Button>
                  </>
                </div>
              </div>
            </div>
          );
        }}
      </NavigationPrompt>

      <Beforeunload
        onBeforeunload={e => {
          if (checkOnUpdate(location, true)) {
            e.preventDefault();
          }
        }}
      />
    </>
  );
};

const mapStateToProps = state => ({
  form: state.form
});

const enhance = compose(withRouter, connect(mapStateToProps));

export default enhance(ConfirmModal);
