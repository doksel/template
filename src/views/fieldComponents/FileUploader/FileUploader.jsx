import React, { useState, useEffect } from "react";

import FileUploaderUI from "../../ui/FileUploader/FileUploader";
import { message } from "../../../helpers/notifications";

import f from "../FieldComponents.module.less";

const FileUploader = ({
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
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    if (input.value && input.value.length) {
      const { files } = initFiles();
      setFiles(files);
    }
  }, [files]);

  const initFiles = () => {
    const files = input.value;

    return { files: files || [] };
  };

  const checkValid = input => {
    console.log(input);
    console.log(input && input.files);

    const inputMaxSize = Object.values(input.files).some(
      file => file.size > input.size
    );

    if (files.length + input.files.length > maxFiles) {
      message.error(
        `Кількість заватажених файлів не повинна перевищувати ${maxFiles}`
      );

      return false;
    } else if (inputMaxSize) {
      message.error(`Розмір заватаженого файлa не повинна перевищувати 10mb`);

      return false;
    }

    const arrayAccepts = input.accept.split(",");

    const inputAccept = Object.values(input.files).some(file =>
      arrayAccepts.every(
        accept => `.${file.name.split(".")[1].toLowerCase()}` !== accept.trim()
      )
    );

    if (inputAccept) {
      message.error("Завантажте файл дозволеного формату");

      return false;
    }

    return true;
  };

  const customRequest = async e => {
    if (checkValid(e.target)) {
      let formData = new FormData();

      for (let i = 0; i < e.target.files.length; i++) {
        formData.append(`file${i + 1}`, e.target.files[i]);
      }

      setLoading(true);

      uploadReq(formData)
        .then(res => {
          onSuccess(res);
          e.target.value = null;
        })
        .catch(() => message.error())
        .finally(() => setLoading(false));
    }
  };

  const onSuccess = res => {
    setFiles([...files, ...res]);

    input.onChange([...files, ...res]);

    message.success("Файл успішно завантажено.");
  };

  const onDeletefile = inComeFile => {
    const newFiles = files.filter(file => file.id !== inComeFile.id);

    input.onChange(newFiles);
    setFiles(newFiles);

    inComeFile.fileHash &&
      removeReq &&
      removeReq(inComeFile.fileHash)
        .then(() => message.success("Файл успішно видалено."))
        .catch(() => message.error());
  };
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
        onChange={customRequest}
        onDeletefile={onDeletefile}
        loading={loading}
        files={files}
      />

      {touched && error && <span className={f.error}>{error}</span>}
    </div>
  );
};
export default FileUploader;
