import React, { useState } from "react";
import { Tabs, Form } from "antd";
import FormBottomNavPanel from "../FormBottomNavPanel/FormBottomNavPanel";

const FormTabs = ({
  children,
  onPublish,
  onSaveDraft,
  reference,
  disabledNextButton
}) => {
  let [activeKey, setActiveKey] = useState(1);

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
        onPublish={onPublish}
        onSaveDraft={onSaveDraft}
        disabledNextButton={disabledNextButton}
      />
    </Form>
  );
};

export default FormTabs;
