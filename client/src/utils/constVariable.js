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
};

export { ORDER_STATE_MAP, COMMON_PATH };
