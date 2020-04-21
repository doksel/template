import React from "react";

import Loader from "../../components/Loader/Loader";
import add from "../../images/icons/add.svg";
import close from "../../images/icons/close-big.svg";

import s from "./FileUploader.module.less";

const token = localStorage.getItem("token");

const FileUploaderUI = ({
  name,
  label,
  maxFileSize = 10000000,
  accepts = ".jpg,.jpeg,.png,.pdf",
  input,
  url,
  onChange,
  onDeletefile,
  loading,
  files
}) => (
  <div className={s.files}>
    <label className={s.label_upload}>
      <input
        name={name}
        multiple="multiple"
        encType="multipart/form-data"
        type="file"
        size={maxFileSize}
        accept={accepts}
        ref={ref => (input = ref)}
        onChange={onChange}
      />
      <img className={s.icon} src={add} alt="icon"></img>
      {loading ? <Loader /> : label}
    </label>

    <div className={s.file_accepts}>Support file's formats: {accepts}</div>

    <div className={s.file_accepts}>
      Size no more: {maxFileSize ? maxFileSize / 1000000 : 10} Mb
    </div>

    <div className={s.files_list}>
      {files.map((file, index) => (
        <div className={s.file} key={index}>
          {file.name ? (
            <div className={s.file_name}>{file.name}</div>
          ) : (
            <a
              className={s.file_name}
              href={`${url}/attachments/${file.fileHash}?token=${token}`}
              target="blank"
            >{`файл-${index + 1}`}</a>
          )}

          <div
            className={s.file_delete}
            onClick={() =>
              onDeletefile({ fileHash: file.fileHash, id: file.id })
            }
          >
            <img src={close} alt="delete" />
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default FileUploaderUI;
