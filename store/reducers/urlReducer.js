import { GET_URLS } from "../constants/urlConstants";

const initialState = {
  urls: [],
  url: {},
  loading: false,
  error: null,
};

export const urlReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_URLS:
      return {
        ...state,
        urls: action.payload,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};
