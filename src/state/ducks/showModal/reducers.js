import * as types from "./types";
import createReducer from "../../../utils/createReducer";

const initialState = {
  isShowModal: false,
  title: "Попередження!",
  content: "Ви впевнені, що бажаєте залишити цю сторінку?"
};

const reducer = createReducer(initialState)({
  [types.SHOW_MODAL]: (state, { payload }) => ({
    isShowModal: !state.isShowModal,
    ...payload
  })
});

export default reducer;
