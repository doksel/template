import * as types from "./types";

export const initChat = data => ({
  type: types.INIT_CHAT,
  data
});

export const setMessage = message => ({
  type: types.SET_MESSAGE,
  message
});

export const resetChatData = () => ({
  type: types.RESET_CHAT_DATA
});

export const setSendingMessage = () => ({
  type: types.SET_SENDING_MESSAGE
});

export const openChat = () => ({
  type: types.OPEN_CHAT_FORM
});

export const closeChat = () => ({
  type: types.CLOSE_CHAT_FORM
});

export const getDataChat = req => dispatch =>
  req().then(data => dispatch(initChat(data.reverse())));

export const sendMessage = (req, data) => dispatch => {
  dispatch(setSendingMessage());

  req(data).then(data => dispatch(setMessage(data)));
};
