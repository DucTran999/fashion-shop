const ORDER_STATE_CODE = {
  processing: "1",
  shipping: "2",
  cancelled: "3",
  completed: "4",
  cancelling: "5",
};

const ORDER_STATE_ORIGINAL = {
  1: "processing",
  2: "shipping",
  3: "cancelled",
  4: "completed",
  5: "cancelling",
};

const ORDER_STATE_MAP = {
  process: "processing",
  deliver: "shipping",
  cancelled: "cancelled",
  completed: "completed",
  cancelling: "cancelling",
};

const COMMON_PATH = {
  home: "/",
  cart: "/cart",
  category: "/category/all-products",
  account: "/account/profile",
  purchase: "/account/purchases",
  notification: "/account/notifications",
};

export { ORDER_STATE_MAP, ORDER_STATE_CODE, ORDER_STATE_ORIGINAL, COMMON_PATH };
