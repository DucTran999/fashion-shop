import axios from "../../api/init.axios";
import API_URL from "../../api/init.url";
import {
  fetchProductStart,
  fetchProductSuccess,
  fetchProductFailed,
  changeVariant,
} from "./productSlice";

const fetchProductReq = async (productId, dispatch) => {
  dispatch(fetchProductStart());

  try {
    const res = await axios.get(`${API_URL.products}/${productId}`, {
      headers: { "Content-Type": "application/json" },
      timeout: 5000,
    });
    const product = res.data.elements;

    dispatch(fetchProductSuccess({ variants: product, selection: product[0] }));
  } catch (err) {
    if (!err?.response) {
      dispatch(fetchProductFailed());
    } else if (err.response?.status === 404) {
      dispatch(fetchProductFailed());
    } else {
      dispatch(fetchProductFailed());
    }
  }
};

const changeVariantSelected = (selection, dispatch) => {
  dispatch(changeVariant(selection));
};

export { fetchProductReq, changeVariantSelected };
