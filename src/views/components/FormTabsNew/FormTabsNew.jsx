import React from "react";
import { Tabs, Form } from "antd";
import FormBottomNavPanel from "../FormBottomNavPanel/FormBottomNavPanel";

const FormTabs = ({
  children,
  reference,
  disabledNextButton,
  leftButtons,
  rightButtons,
  activeKey,
  setActiveKey,
  showSubmitButton
}) => {
  return (
    <Form className="paper small-padding-paper small-shadow" autoComplete="off">
      <Tabs
        animated={{ inkBar: true, tabPane: false }}
        defaultActiveKey="1"
        onTabClick={key => setActiveKey(key)}
        activeKey={activeKey.toString()}
      >
        {children}
      </Tabs>

      <FormBottomNavPanel
        reference={reference}
        activeKey={activeKey}
        leftButtons={leftButtons}
        rightButtons={rightButtons}
        disabledNextButton={disabledNextButton}
        showSubmitButton={showSubmitButton}
        onBack={() => {
          if (activeKey <= 1) {
            setActiveKey(5);
          } else {
            setActiveKey(--activeKey);
          }
        }}
        onNext={() => {
          if (activeKey >= 5) {
            setActiveKey(1);
          } else {
            setActiveKey(++activeKey);
          }
        }}
      />
    </Form>
  );
};

export default FormTabs;
