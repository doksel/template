import React, { useState, useEffect, Fragment } from "react";
import { Row, Col, Divider, Button, Tooltip } from "antd";
import { Field, FieldArray, getFormValues } from "redux-form";
import { connect } from "react-redux";
import moment from "moment";

import Input from "../../layout/FormComponents/Input/Input";
import DatePicker from "../../layout/FormComponents/DatePicker/DatePicker";
import Selecter from "../../layout/FormComponents/Selecter/Selecter";
import TextArea from "../../layout/FormComponents/TextArea/TextArea";
import InputCurrency from "../../layout/FormComponents/InputCurrency/InputCurrency";
import FileUploader from "../../layout/FormComponents/FileUploader/FileUploader";

import {
  required,
  number,
  maxValue1000000,
  maxLength1000,
  checkPaidAmount,
  numberPaymentDoc
} from "../../../helpers/validate";
import { countPaidAmount } from "../../../helpers";
import { CONSULAR_FEE_RATE_TYPE, DATE_FORMAT } from "../../../helpers/values";

import { REFERENCE_API } from "../../../api/reference";
import api from "../../../api";

const renderPayments = ({ fields, formValues, disabled, unicUrl }) => {
  if (fields.length === 0) {
    fields.push({});
  }

  let uploadReq = unicUrl
    ? api.reference.actions.uploadFile
    : api.residency.actions.uploadFile({ type: "payment" });

  let removeReq = unicUrl
    ? api.reference.actions.removeFile
    : api.residency.actions.removeFile({ type: "payment" });

  return (
    <>
      <Divider orientation="left">Платіжні документи</Divider>

      {fields.map((item, index) => (
        <Fragment key={index}>
          <Row gutter={20}>
            <Col lg={6} md={24}>
              <Field
                disabled={disabled}
                name={`${item}.paymentType`}
                validate={[required]}
                required
                component={Selecter}
                options={[
                  {
                    value: "terminal",
                    text: "Термінал"
                  },
                  {
                    value: "bank-transfer",
                    text: "Банківський переказ"
                  },
                  {
                    value: "money-order",
                    text: "Грошовий переказ"
                  },
                  {
                    value: "other",
                    text: "Інше"
                  }
                ]}
                label="Спосіб оплати"
                placeholder="Оберіть спосіб..."
              />
            </Col>

            <Col lg={6} md={24}>
              <Field
                disabled={disabled}
                name={`${item}.paymentNumber`}
                validate={[required, numberPaymentDoc]}
                required
                component={Input}
                label="Серія № платіжного документа"
                placeholder="Введіть номер..."
              />
            </Col>

            <Col lg={6} md={24}>
              <Field
                disabled={disabled}
                name={`${item}.paymentAmount`}
                validate={[required, number, maxValue1000000]}
                required
                component={Input}
                label="Сума за платіжним документом"
                placeholder="Введіть суму..."
              />
            </Col>

            <Col lg={5} md={24} className="consular-fee-payment-doc">
              <Field
                disabled={disabled || !(formValues && formValues.registeredAt)}
                name={`${item}.paidAt`}
                validate={[required]}
                required
                component={DatePicker}
                isInRange={
                  moment(formValues.registeredAt, DATE_FORMAT) <
                    formValues.payments &&
                  formValues.payments[index] &&
                  moment(formValues.payments[index].paidAt, DATE_FORMAT)
                }
                notification="Дата оплати має бути не пізніше Дати реєстрації дії"
                disabledDate={d =>
                  d.isAfter(
                    formValues.registeredAt
                      ? formValues.payments[index] &&
                        formValues.payments[index].paidAt
                        ? moment(formValues.registeredAt, DATE_FORMAT)
                        : moment(formValues.registeredAt, DATE_FORMAT).add(
                            1,
                            "days"
                          )
                      : moment()
                  )
                }
                label="Дата оплати"
                placeholder="Оберіть дату..."
              />
            </Col>

            <Col lg={1} md={24}>
              {index === 0 ? (
                <Tooltip
                  placement="bottomRight"
                  title="Додати платіжний документ"
                >
                  <Button
                    className="button-add"
                    type="primary"
                    disabled={disabled}
                    onClick={() => fields.push({})}
                    icon="plus"
                  />
                </Tooltip>
              ) : (
                <Tooltip
                  placement="bottomRight"
                  title="Видалити платіжний документ"
                >
                  <Button
                    className="button-add"
                    type="danger"
                    disabled={disabled}
                    onClick={() => fields.splice(index, 1)}
                    icon="minus"
                  />
                </Tooltip>
              )}
            </Col>
          </Row>

          <Row>
            <Col lg={6} md={24}>
              <Field
                name={unicUrl ? "files" : `${item}.paymentDocument`}
                nameButton="Прикріпити сканкопію заяви"
                unic={
                  unicUrl
                    ? {
                        url: REFERENCE_API,
                        key: "paymentDocument"
                      }
                    : null
                }
                component={FileUploader}
                button
                uploadReq={uploadReq}
                removeReq={removeReq}
                disabled={disabled}
              />
            </Col>
          </Row>
        </Fragment>
      ))}
    </>
  );
};

const ConsularFee = ({
  reference,
  formValues,
  actionId,
  user,
  disabled,
  unicUrl
}) => {
  const [payments, setPayments] = useState(
    formValues && formValues.rateType === CONSULAR_FEE_RATE_TYPE.PREFERENTIAL
  );
  const [paidAmount, setPaidAmount] = useState(null);
  const [isoCode, setIsoCode] = useState(
    user.department.country.currency.isoCode
  );

  useEffect(() => {
    if (
      formValues &&
      formValues.rateType === CONSULAR_FEE_RATE_TYPE.PREFERENTIAL
    ) {
      setPayments(false);
    }

    if (formValues && formValues.payments) {
      setPaidAmount(countPaidAmount(formValues.payments));
    }
  }, [formValues]);

  const handleRateTypeChange = rateType => {
    if (rateType === CONSULAR_FEE_RATE_TYPE.PREFERENTIAL) {
      setPayments(false);
    } else {
      setPayments(true);
    }
  };

  return (
    <>
      <Row gutter={20}>
        <Col lg={formValues && formValues.serialNumber ? 3 : 6} md={24}>
          <Field
            name="registeredAt"
            validate={[required]}
            disabled={disabled}
            required
            component={DatePicker}
            disabledDate={d => d.isAfter(new Date())}
            label="Дата реєстрації заяви"
            placeholder="Оберіть дату..."
          />
        </Col>

        {formValues && formValues.serialNumber && (
          <Col lg={3} md={24}>
            <Field
              name="serialNumber"
              validate={[number]}
              component={Input}
              disabled
              label="Номер реєстрації"
            />
          </Col>
        )}

        <Col lg={6} md={24}>
          <Field
            name="rateType"
            disabled={disabled}
            component={Selecter}
            onChange={value => handleRateTypeChange(value)}
            options={[
              {
                value: CONSULAR_FEE_RATE_TYPE.NORMAL,
                text: "Звичайний"
              },
              {
                value: CONSULAR_FEE_RATE_TYPE.PREFERENTIAL,
                text: "Пільговий"
              },
              {
                value: CONSULAR_FEE_RATE_TYPE.URGENT,
                text: "Терміновий"
              }
            ]}
            defaultValue="normal"
            label="Тип тарифної ставки"
            placeholder="Оберіть тариф..."
          />
        </Col>

        {payments && (
          <>
            <Col lg={6} md={24}>
              <Field
                name="consularFee"
                validate={[number]}
                component={InputCurrency}
                rateType={formValues.rateType}
                actionId={actionId}
                addonAfterDefaultValue={
                  user.department.country.currency.isoCode
                }
                onChangeSelect={value => setIsoCode(value)}
                disabled
                disabledSelecter={true}
                label="Сума консульського збору"
                placeholder="Сума..."
              />
            </Col>

            <Col lg={6} md={24}>
              <Field
                name="paidAmount"
                validate={[number, checkPaidAmount]}
                component={Input}
                initialValue={paidAmount}
                disabled
                label="Фактично сплачена сума"
                placeholder="Сума"
              />
            </Col>

            <Field
              name="feeCurrency"
              component={Input}
              invisible
              initialValue={isoCode}
            />

            <Field
              name="paidCurrency"
              component={Input}
              initialValue={isoCode}
              invisible
            />
          </>
        )}
      </Row>

      {payments && (
        <FieldArray
          name="payments"
          disabled={disabled}
          component={renderPayments}
          formValues={formValues}
          reference={reference}
          unicUrl={unicUrl}
        />
      )}

      {!reference && <Divider orientation="left">Додаткові відомості</Divider>}

      {!reference && (
        <Row>
          <Col lg={24}>
            <Field
              disabled={disabled}
              name="aboutBride"
              component={TextArea}
              validate={[maxLength1000]}
              placeholder="Додаткові відомості..."
            />
          </Col>
        </Row>
      )}
    </>
  );
};

const mapStateToProps = state => ({
  formValues: getFormValues("create")(state),
  user: state.user
});

export default connect(mapStateToProps)(ConsularFee);
