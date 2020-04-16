export const breakpointsLayout = {
  xs: "480px",
  sm: "576px",
  md: "768px",
  lg: "1024px",
  xl: "1440px",
  xxl: "1600px"
};

export const ACTIONS_IDS = {
  RESIDENCY: 25,
  DRIVERS_LICENSE: 115,
  CRIMINAL_LABILITY: 116
};

export const STATUSES_RESIDENCY = {
  DRAFT: "draft",
  REVIEW: "review",
  REJECT: "reject",
  INPROGRESS: "inprogress",
  APPROVE: "approve",
  RESOLUTION: "resolution",
  DONE: "done",
  DELETED: "deleted"
};

export const AUTOSAVE_TIME = 1000 * 60;

export const DATE_FORMAT = "YYYY-MM-DD";

export const ERROR_MESSAGE = "Щось пішло не так. Спробуйте пізніше";

export const ERROR_SAVE_TO_DRAFT =
  "Заява не збереглась. Щось пішло не так. Спробуйте зберегти пізніше";
export const SUCCESS_SAVE_TO_DRAFT = "Заява успішно збережена до чернеток";
export const SUCCESS_AUTOSAVE =
  "Заяву успішно збережено в Чернетки. Наступне збереження відбудеться через хвилину";

export const CERTIFICATION_TYPES = {
  DRIVING_LICENCE: 115,
  CRIMINAL_RECORD: 116
};

export const CONSULAR_FEE_RATE_TYPE = {
  PREFERENTIAL: "preferential",
  NORMAL: "normal",
  URGENT: "urgent"
};

export const CERTIFICATION_STATUSES = {
  RETURNED_TO_SENDER: "returned-to-sender",
  REVIEW: "review",
  IN_PROGRESS: "in-progress",
  ERROR: "error",
  INVALID_DATA: "invalid-data",
  NOT_FOUND: "not-found",
  CLARIFICATION: "clarification",
  DONE: "done",
  DELETED: "deleted",
  AGE_UNDER_14: "age-under-14"
};

export const optionsReferenceStatus = [
  {
    value: "returned-to-sender",
    text: "Повернуто на доопрацювання"
  },
  {
    value: "review",
    text: "Подано до ЗДУ"
  },
  {
    value: "in-progress",
    text: "На опрацюванні в МВС"
  },
  {
    value: "error",
    text: "Помилка"
  },
  {
    value: "invalid-data",
    text: "Некоректні дані"
  },
  {
    value: "done",
    text: "Отримано відповідь"
  },
  {
    value: "deleted",
    text: "Видалено"
  },
  {
    value: "age-under-14",
    text: "Неповнолітній"
  },
  {
    value: "not-found",
    text: "Не знайдено"
  }
];
