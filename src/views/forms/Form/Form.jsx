import React from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { compose } from "redux";

import { required } from "../../../helpers/validate";

import Input from "../../fieldComponents/Input/Input";
import Button from "../../ui/Button/Button";

import FileUploader from "../../fieldComponents/FileUploader/FileUploader";
import api, { API } from "../../../api";

import s from "./Form.module.less";

const Form = () => {
  const formSubmit = e => {
    e.preventDefault();
    console.log("submit");
  };

  return (
    <div className={s.background}>
      <div className={s.wrapForm}>
        <div className={s.form}>
          <form
            autoComplete="off"
            className={s.login_form}
            onSubmit={formSubmit}
          >
            <h1>Form</h1>

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

            <Field
              name="documents"
              component={FileUploader}
              url={API}
              uploadReq={api.common.uploadFile}
              removeReq={api.common.removeFile}
              label="Upload file"
              accepts=".png,.jpeg,.jpg"
            />

            <Button type="submit" primary>
              Enter
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = {};

const enhance = compose(
  connect(null, mapDispatchToProps),
  reduxForm({ form: "create" })
);

export default enhance(Form);
