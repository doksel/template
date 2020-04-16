import { SubmissionError } from "redux-form";

export const throwFormErrorJournal = err => {
  if (err.response && err.response.data.violations) {
    const errors = [];

    Object.keys(err.response.data.violations).map(field =>
      errors.push(
        new SubmissionError({
          [field]: err.response.data.violations[field][0]
        })
      )
    );

    for (let i = 0; i < errors.length; i++) {
      throw errors[i];
    }
  }
};
