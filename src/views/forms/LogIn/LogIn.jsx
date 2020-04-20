import React, { useState } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { compose } from "redux";

import { required } from "../../../helpers/validate";
import { signIn } from "../../../state/ducks/user/actions";

import Input from "../../fieldComponents/Input/Input";
import Button from "../../ui/Button/Button";
import { message } from "../../../helpers/notifications";

import s from "./LogIn.module.less";

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
    <form autoComplete="off" className={s.login_form} onSubmit={formSubmit}>
      <h1>Sign in</h1>

      <div className={s.split_line} />

      <Field
        name="username"
        component={Input}
        type="text"
        label="name"
        placeholder="Enter name"
        validate={[required]}
        required
        icon="user"
      />

      <Field
        name="password"
        component={Input}
        type="password"
        label="label"
        placeholder="Enter label"
        validate={[required]}
        required
        icon="lock"
      />

      <Button
        disabled={!dirty || invalid}
        type="submit"
        primary
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
