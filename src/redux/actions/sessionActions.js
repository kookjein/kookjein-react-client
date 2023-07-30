import { ActionTypes } from "../constants/actionTypes";

export const focusTab = (boolean) => {
  return {
    type: ActionTypes.FOCUS_TAB,
    payload: boolean,
  };
};

export const blurTab = (boolean) => {
  return {
    type: ActionTypes.BLUR_TAB,
    payload: boolean,
  };
};
