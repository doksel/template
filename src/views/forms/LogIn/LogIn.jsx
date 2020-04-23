import React from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { compose } from "redux";

import { required } from "../../../helpers/validate";
import { signIn } from "../../../state/ducks/user/actions";

import Input from "../../fieldComponents/Input/Input";
import Button from "../../ui/Button/Button";

import s from "./LogIn.module.less";

let LogIn = ({ handleSubmit, signIn, dirty, invalid, isLoad }) => {
  const formSubmit = e => {
    e.preventDefault();
    handleSubmit(values => signIn(values))();
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
        loading={isLoad}
      >
        Enter
      </Button>
    </form>
  );
};

const mapStateToProps = ({ loader: { isLoad } }) => ({ isLoad });

const mapDispatchToProps = { signIn };

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({ form: "login" })
);
export default enhance(LogIn);
