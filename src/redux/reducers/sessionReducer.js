import { ActionTypes } from "../constants/actionTypes";

const initialState = {
  isTabFocused: true,
};

export const sessionReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.FOCUS_TAB:
      return {
        ...state,
        isTabFocused: true,
      };

    case ActionTypes.BLUR_TAB:
      return {
        ...state,
        isTabFocused: false,
      };

    default:
      return state;
  }
};
