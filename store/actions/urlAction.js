import { GET_URLS } from "../constants/urlConstants";
import axios from "axios";

export const fetchurls = () => async (dispatch) => {
  const res = await axios.get("/api/getAllData");
  dispatch({
    type: GET_URLS,
    payload: res.data.data,
  });
};
