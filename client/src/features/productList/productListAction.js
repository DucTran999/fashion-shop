import axios from "../../api/init.axios";
import API_URL from "../../api/endpoint";

import {
  searchProductStart,
  searchProductSuccess,
  searchProductFailed,
} from "./productListSlice";

const searchProductReq = async (searchTerm, dispatch) => {
  dispatch(searchProductStart());

  try {
    const res = await axios.get(`${API_URL.search}`, {
      headers: { "Content-Type": "application/json" },
      timeout: 4000,
      params: { keyword: searchTerm },
    });

    dispatch(searchProductSuccess(res.data.products));
  } catch (err) {
    if (!err?.response) {
      dispatch(searchProductFailed("Server maintain"));
    } else if (err.response?.status === 400) {
      dispatch(searchProductFailed("Sorry, no result found"));
    } else {
      dispatch(searchProductFailed("Sorry, no result found"));
    }
  }
};

export { searchProductReq };
