const MESSAGES = {
  MESSAGE_DURATION: 5000,
  SUCCESS_TEXT: "Успішно...",
  ERROR_TEXT: "Щось пішло не так. Спробуйте пізніше"
};

class Message {
  constructor() {
    this.domElem = document.getElementById("notification");

    this.success = this.success.bind(this);
    this.reset = this.reset.bind(this);
  }

  success(text = MESSAGES.SUCCESS_TEXT) {
    this.domElem.classList.add("active");
    this.domElem.classList.add("success");
    this.domElem.textContent = text;

    this.reset("success");
  }

  warning(text) {
    this.domElem.classList.add("active");
    this.domElem.classList.add("warning");
    this.domElem.textContent = text;

    this.reset("warning");
  }

  error(text = MESSAGES.ERROR_TEXT) {
    this.domElem.classList.add("active");
    this.domElem.classList.add("error");
    this.domElem.textContent = text;

    this.reset("error");
  }

  reset(nameClass) {
    setTimeout(() => {
      this.domElem.classList.remove("active");
      this.domElem.classList.remove(nameClass);
    }, MESSAGES.MESSAGE_DURATION);
  }
}

export const message = new Message();
