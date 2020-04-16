import {
  STATUSES_RESIDENCY,
  CERTIFICATION_TYPES,
  CERTIFICATION_STATUSES
} from "./values";

export const getNameOfStatusResidency = status =>
  ({
    [STATUSES_RESIDENCY.REVIEW]: "На розгляді у ЗДУ",

    [STATUSES_RESIDENCY.DRAFT]: "Чернетка",

    [STATUSES_RESIDENCY.DELETED]: "Видалено",

    [STATUSES_RESIDENCY.INPROGRESS]: "На розгляді у ДКС",

    [STATUSES_RESIDENCY.REJECT]: "На доопрацюванні в ЗДУ",

    [STATUSES_RESIDENCY.APPROVE]: "Прийняття рішення",

    [STATUSES_RESIDENCY.RESOLUTION]: "Виконання рішення",

    [STATUSES_RESIDENCY.DONE]: "Заверешено"
  }[status]);

export const getNameOfTypeReference = type =>
  ({
    [CERTIFICATION_TYPES.DRIVING_LICENCE]: "Посвідчення водія",

    [CERTIFICATION_TYPES.CRIMINAL_RECORD]: "Довідка про несудимість"
  }[type]);

export const getNameOfStatusReference = status =>
  ({
    [CERTIFICATION_STATUSES.DONE]: "Отримано відповідь",

    [CERTIFICATION_STATUSES.REVIEW]: "Подано до ЗДУ",

    [CERTIFICATION_STATUSES.RETURNED_TO_SENDER]: "Повернуто на доопрацювання",

    [CERTIFICATION_STATUSES.IN_PROGRESS]: "На опрацюванні в МВС",

    [CERTIFICATION_STATUSES.NOT_FOUND]: "Не знайдено",

    [CERTIFICATION_STATUSES.DELETED]: "Видалено",

    [CERTIFICATION_STATUSES.AGE_UNDER_14]: "Неповнолітній",

    [CERTIFICATION_STATUSES.ERROR]: "Помилка",

    [CERTIFICATION_STATUSES.INVALID_DATA]: "Некоректні дані"
  }[status]);

export const getNameOfBadgeReference = status =>
  ({
    [CERTIFICATION_STATUSES.DONE]: "green",

    [CERTIFICATION_STATUSES.REVIEW]: "gold",

    [CERTIFICATION_STATUSES.RETURNED_TO_SENDER]: "cyan",

    [CERTIFICATION_STATUSES.IN_PROGRESS]: "Processing",

    [CERTIFICATION_STATUSES.NOT_FOUND]: "volcano",

    [CERTIFICATION_STATUSES.DELETED]: "red",

    [CERTIFICATION_STATUSES.AGE_UNDER_14]: "purple"
  }[status]);
