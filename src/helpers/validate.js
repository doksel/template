import { emailRegExp, urlRegExp } from "./regexps";
import { formatDate } from "./values";
import moment from "moment";

export const required = value =>
  (value && typeof value === "string" && !value.match(/^\s+$/)) ||
  (value && typeof value !== "string")
    ? undefined
    : "Обов'язково для заповнення";

export const maxLength = max => value =>
  value === "" ||
  value === null ||
  value === undefined ||
  (value && value.length <= max)
    ? undefined
    : `Повинно бути не більше ${max} символів`;

export const minLength = min => value =>
  value === "" ||
  value === null ||
  value === undefined ||
  (value && value.length >= min)
    ? undefined
    : `Повинно бути ${min} символів або більше`;

export const minLength8 = minLength(8);

export const maxLength7 = maxLength(7);

export const maxLength70 = maxLength(70);

export const maxLength50 = maxLength(50);

export const maxLength10 = maxLength(10);

export const maxLength20 = maxLength(20);

export const maxLength255 = maxLength(255);

export const minValue = min => value =>
  value && value < min ? `Повинно бути принаймні ${min}` : undefined;

export const email = value =>
  value && !emailRegExp.test(value)
    ? "Невірна адреса електронної пошти"
    : undefined;

export const number = value =>
  value && isNaN(Number(value)) ? "Повинно бути числом" : undefined;

export const alphaNumeric = value =>
  value && /[^a-zA-ZА-Яа-яЁёЇїІіЄєҐґ'`0-9 ]/i.test(value)
    ? "Тільки буквено-цифрові символи"
    : undefined;

export const url = value =>
  value && !urlRegExp.test(value) ? "Недійсна URL-адреса" : undefined;

export const required_Series_Of_Doc = value =>
  value || typeof value === "number"
    ? undefined
    : "Серія обов'язково для заповнення";

export const required_Number_Of_Doc = value =>
  value || typeof value === "number"
    ? undefined
    : "Номер обов'язково для заповнення";

export const number_Number_Of_Doc = value =>
  value && isNaN(Number(value))
    ? "Номер містить тільки цифри"
    : value.length !== 6
    ? `Повинно бути 6 символів`
    : undefined;

export const number_Index_Ukraine = value =>
  value && isNaN(Number(value))
    ? "Поштовий індекс містить тільки цифри"
    : value.length !== 5
    ? `Поштовий індекс складається з 5 символів`
    : undefined;

export const letter_Series_Of_Doc = value =>
  value && !value.match(/^[A-Za-zА-Яа-яЁёЇїІіЄєҐґ]+$/)
    ? "Серія містить тільки літери"
    : value && (value.length > 3 || value.length < 2)
    ? `У серії повинно бути 2 або 3 символи`
    : undefined;

export const latinLetter = value =>
  value === "" ||
  value === null ||
  value === undefined ||
  (value && value.match(/^[A-Za-z'`-]+$/))
    ? undefined
    : "Введіть літери тільки латинською";

export const cyrillicLetter = value =>
  value === "" ||
  value === null ||
  value === undefined ||
  (value && value.match(/^[А-Яа-яЁёЇїІіЄєҐґ'`-]+$/))
    ? undefined
    : "Введіть літери тільки кирилицею";

export const cyrillicUaLetter = value =>
  value === "" ||
  value === null ||
  value === undefined ||
  (value && value.match(/^[А-Ща-щЬьЮюЯяЇїІіЄєҐґ'`-]+$/))
    ? undefined
    : "Введіть літери тільки українською";

export const cyrillicRuLetter = value =>
  value === "" ||
  value === null ||
  value === undefined ||
  (value && value.match(/^[А-Яа-яЁё-]+$/))
    ? undefined
    : "Введіть літери тільки російською";

export const required_UNZR = value =>
  value === "" ||
  value === null ||
  value === undefined ||
  (value && value.match(/\d{8}(-)\d{5}/) && value.length === 14)
    ? undefined
    : "УНЗР маэ формат 00000000-00000";

export const number_Taxpayer = value =>
  value && isNaN(Number(value))
    ? "Ідентифікаційний код містить тільки цифри"
    : value && value.length !== 10
    ? "Ідентифікаційний код містить 10 цифр"
    : undefined;

export const checkPasswords = (value, form) =>
  form.password !== form.re_password
    ? "Пароль повинен бути однаковий"
    : undefined;

export const required_RadioButton = value =>
  typeof value === "boolean" ? undefined : "Обов'язково для заповнення";

export const hardpassword = value =>
  value &&
  value.length >= 6 &&
  value.match(
    /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/
  )
    ? undefined
    : "Пароль має складатися не менше ніж з 6 символів та повинен містити великі та маленькі латинські літери, цифри та спеціальні символи.";

export const numberPaymentDoc = value =>
  value === "" ||
  value === null ||
  value === undefined ||
  (value && /[^a-zA-Z0-9 -]/i.test(value))
    ? "Тільки латинські букви, цифри, тире і пробіл"
    : undefined;

export const maxDateMinus = date => value => {
  let stringDate = moment(
    moment().subtract(date || new Date(), "year") || new Date()
  ).format("DD.MM.YYYY");

  return moment(value, formatDate).isBefore(
    moment().subtract(date || new Date(), "year")
  )
    ? undefined
    : `Дата не повинна бути більше ${stringDate}`;
};

export const childrenBithDateAfter = (value, form) =>
  moment(value, formatDate).isBefore(moment(form.birthDateChild, formatDate))
    ? `Дата не повинна бути не менше нiж ${moment(
        form.birthDateChild,
        formatDate
      ).format("DD.MM.YYYY")}`
    : undefined;

export const date = value =>
  value &&
  value.match(
    /^\s*((?:19|20)\d{2})-(1[012]|0?[1-9])-(3[01]|[12][0-9]|0?[1-9])\s*$/g
  )
    ? undefined
    : "Введіть коректну дату у форматі дд.мм.гггг";

export const maxDateMinus16 = maxDateMinus(16);

export const maxDateNow = maxDateMinus();

export const phone = value =>
  value === "" ||
  value === null ||
  value === undefined ||
  (value && value.length >= 14)
    ? undefined
    : `Введіть коректний номер телефону`;

export const requiredPaymentDocument = value =>
  value && value.paymentDocument && value.paymentDocument.length
    ? undefined
    : "Обов'язково для заповнення";

export const requiredFileUploaderPmp = value =>
  value && value.length ? undefined : "Обов'язково для заповнення";

export const maskUNZR = (e, input) => {
  if (input.value && input.value.length === 8 && e.keyCode !== 8) {
    input.onChange(`${input.value}-`);
  } else if (input.value && input.value.length === 8 && e.keyCode === 8) {
    input.onChange(input.value.substr(0, 7));
  }
};

export const maskDatePicker = (e, input) => {
  if (
    input.value &&
    (input.value.length === 2 || input.value.length === 5) &&
    e.keyCode !== 8
  ) {
    input.onChange(`${input.value}.`);
  } else if (input.value && input.value.length === 6 && e.keyCode === 8) {
    input.onChange(input.value.substr(0, 4));
  } else if (input.value && input.value.length === 3 && e.keyCode === 8) {
    input.onChange(input.value.substr(0, 1));
  }
};
