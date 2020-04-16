import React, { Component } from "react";

import Loader from "../../components/Loader/Loader";

import add from "../../images/icons/add.svg";
import close from "../../images/icons/close-big.svg";
import { message } from "../../../helpers/notifications";

import s from "./FileUploader.less";

class FilesDemo extends Component {
  state = {
    loading: false,
    files: []
  };

  token = localStorage.getItem("token");

  UNSAFE_componentWillMount() {
    const { input, unic } = this.props;

    if ((input.value && input.value.length) || unic) {
      const { files } = unic ? this.initFilesForUnic() : this.initFiles();

      this.setState({
        files
      });
    }
  }

  initFiles = () => {
    const { input } = this.props;

    const files = input.value;

    return { files: files || [] };
  };

  initFilesForUnic = () => {
    const { input, unic } = this.props;

    const files =
      input.value &&
      input.value[unic.key] &&
      input.value[unic.key].map(item => ({
        ...item,
        extension: item.fileMime === "application/pdf" ? "pdf" : "jpeg"
      }));

    return {
      files: files || []
    };
  };

  checkValid = () => {
    const { maxFiles = 10 } = this.props;
    const { files } = this.state;

    const inputMaxSize = Object.values(this.input.files).some(
      file => file.size > this.input.size
    );

    if (files.length + this.input.files.length > maxFiles) {
      message.error(
        `Кількість заватажених файлів не повинна перевищувати ${maxFiles}`
      );

      return false;
    } else if (inputMaxSize) {
      message.error(`Розмір заватаженого файлa не повинна перевищувати 5mb`);

      return false;
    }

    const arrayAccepts = this.input.accept.split(",");

    const inputAccept = Object.values(this.input.files).some(file =>
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

  customRequest = async e => {
    const { uploadReq, unic } = this.props;

    if (this.checkValid()) {
      let formData = new FormData();

      for (let i = 0; i < this.input.files.length; i++) {
        formData.append(`file${i + 1}`, this.input.files[i]);
      }

      this.setState({ loading: true });

      uploadReq(formData)
        .then(res => {
          if (unic) {
            this.onSuccessForUnic(res);
          } else {
            this.onSuccess(res);
          }

          this.input.value = null;
        })
        .catch(() => message.error())
        .finally(() => this.setState({ loading: false }));
    }
  };

  onSuccessForUnic = res => {
    const { input, unic } = this.props;
    const { files } = this.state;

    this.setState({ files: [...files, ...res] });

    input.value = typeof input.value === "object" ? { ...input.value } : {};

    input.value[unic.key] = input.value[unic.key]
      ? [...input.value[unic.key], ...res]
      : [...res];

    input.onChange(input.value);

    message.success("Файл успішно завантажено.");
  };

  onSuccess = res => {
    const { input } = this.props;
    const { files } = this.state;

    this.setState({ files: [...files, ...res] });
    input.onChange([...files, ...res]);

    message.success("Файл успішно завантажено.");
  };

  onDeletefile = inComeFile => {
    const { files } = this.state;
    const { removeReq, input, unic } = this.props;

    const newFiles = files.filter(file => file.id !== inComeFile.id);

    input.onChange(newFiles);
    this.setState({ files: newFiles });

    if (unic) {
      const newInputValue = { ...input.value };
      newInputValue[unic.key] = input.value[unic.key] && [...newFiles];
      input.onChange(newInputValue);
    } else {
      input.onChange(newFiles);
    }

    inComeFile.fileHash &&
      removeReq &&
      removeReq(inComeFile.fileHash)
        .then(() => message.success("Файл успішно видалено."))
        .catch(() => message.error());
  };

  render() {
    const { name, label, maxFileSize, accepts, unic, url } = this.props;
    const { files, loading } = this.state;

    return (
      <div className={s.files}>
        <label className="label-upload">
          <input
            name={name}
            multiple="multiple"
            encType="multipart/form-data"
            type="file"
            size={maxFileSize || 10000000}
            accept={accepts || ".jpg,.jpeg,.png,.pdf"}
            ref={ref => (this.input = ref)}
            onChange={this.customRequest}
          />
          <img className={s.icon} src={add} alt="icon"></img>
          {loading ? <Loader /> : label}
        </label>

        <div className={s.file_accepts}>
          Для завантаження доступні формати: {accepts || ".jpg,.jpeg,.png,.pdf"}
        </div>

        <div className={s.file_accepts}>
          Розмір файла повинен бути не більше:{" "}
          {maxFileSize ? maxFileSize / 1000000 : 10} Mb
        </div>

        <div className={s.files_list}>
          {files.map((file, index) => (
            <div className={s.file} key={index}>
              {file.name ? (
                <div className={s.file_name}>{file.name}</div>
              ) : (
                <a
                  className={s.file_name}
                  href={`${unic ? unic.url : url}/attachments/${
                    file.fileHash
                  }?token=${this.token}`}
                  target="blank"
                >{`файл-${index + 1}`}</a>
              )}

              <div
                className={s.file_delete}
                onClick={() =>
                  this.onDeletefile({ fileHash: file.fileHash, id: file.id })
                }
              >
                <img src={close} alt="delete" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default FilesDemo;
