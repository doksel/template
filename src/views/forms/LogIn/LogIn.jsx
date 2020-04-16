import React, { useState } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { compose } from "redux";

import { required } from "../../../helpers/validate";
import { signIn } from "../../../state/ducks/user/actions";

import Input from "../../fieldComponents/Input/Input";
import Button from "../../ui/Button/Button";
import { message } from "../../../helpers/notifications";

import "./LogIn.less";
import "../../../styles/components.less";

const LogIn = ({ handleSubmit, signIn, dirty, invalid }) => {
  const [loading, setLoading] = useState(false);

  const formSubmit = e => {
    e.preventDefault();

    handleSubmit(values => {
      setLoading(true);

      return signIn(values)
        .then(() => {
          setLoading(false);
        })
        .catch(err => {
          setLoading(false);
          message.error();
        });
    })();
  };

  return (
    <form autoComplete="off" className="login-form paper" onSubmit={formSubmit}>
      <div className="logo">
        <img src="/logo.svg" alt="minua" />
      </div>

      <h1>Авторизація</h1>

      <div className="split-line" />

      <Field
        name="username"
        component={Input}
        type="text"
        label="Ім'я користувача"
        placeholder="Введіть ім'я користувача"
        validate={[required]}
        icon="user"
      />

      <Field
        name="password"
        component={Input}
        type="password"
        label="Пароль"
        placeholder="Введіть пароль"
        validate={[required]}
        icon="lock"
      />

      <Button
        disabled={!dirty || invalid}
        htmlType="submit"
        type="primary"
        loading={loading}
      >
        Enter
      </Button>
    </form>
  );
};

const mapDispatchToProps = { signIn };

const enhance = compose(
  connect(null, mapDispatchToProps),
  reduxForm({ form: "login" })
);

export default enhance(LogIn);
