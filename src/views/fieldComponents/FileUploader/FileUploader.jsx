import React from "react";

import FileUploaderUI from "../../ui/FileUploader/FileUploader";

import f from "../form-components.less";

const Input = ({
  label,
  input,
  accepts,
  maxFiles,
  maxFileSize,
  meta: { touched, error },
  unic,
  url,
  uploadReq,
  removeReq,
  disabled
}) => {
  return (
    <div className={f.formField}>
      <FileUploaderUI
        {...input}
        input={input}
        unic={unic}
        url={url}
        uploadReq={uploadReq}
        removeReq={removeReq}
        disabled={disabled}
        name={input.name}
        label={label}
        accepts={accepts}
        maxFiles={maxFiles}
        maxFileSize={maxFileSize}
        onChange={input.onChange}
      />

      {touched && error && <span className={f.error}>{error}</span>}
    </div>
  );
};
export default Input;
