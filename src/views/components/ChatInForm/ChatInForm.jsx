import React, { useState } from "react";
import { Button, Icon, Modal } from "antd";
import { connect } from "react-redux";

import TextArea from "antd/lib/input/TextArea";

import {
  sendMessage,
  closeChat
} from "../../../state/ducks/chatInForm/actions";

import "./ChatInForm.module.less";

const ChatInForm = ({
  active,
  closeChat,
  sendMessage,
  onSend,
  data,
  sending,
  sendReq
}) => {
  const [message, setMessage] = useState("");

  return (
    <Modal
      visible={active}
      className="chat-popup"
      centered
      footer={null}
      onCancel={closeChat}
    >
      <div className="wrap-chat">
        <div className="chat-main">
          {data.map((message, index) => (
            <div className="message" key={index}>
              <div className="person-image">
                <Icon type="user" />
              </div>

              <div className="message-body">
                <span className="name-user">{message.userName}</span>

                <p className="message-text">{message.comment}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="chat-input">
          <TextArea
            type="text"
            value={message}
            onChange={e => setMessage(e.target.value)}
          />

          <Button
            type="primary"
            onClick={async () => {
              if (message) await sendMessage(sendReq, { message });
              onSend && onSend();
              setMessage("");
            }}
            loading={sending}
          >
            Відправити листівку
          </Button>
        </div>
      </div>
    </Modal>
  );
};

const mapStateToProps = ({ chatInForm }) => ({ ...chatInForm });

const mapDispatchToProps = { sendMessage, closeChat };

export default connect(mapStateToProps, mapDispatchToProps)(ChatInForm);
