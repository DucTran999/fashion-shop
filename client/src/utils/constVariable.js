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
  search: "/search",
  wishlist: "/wishlist",
  category: "/category/all-products",
  account: "/account/profile",
  purchase: "/account/purchases",
  notification: "/account/notifications",
};

const EMAIL_TYPE = {
  newRegister: "register",
  unlockAccount: "unlock",
};

const INPUT_ERROR_MESSAGE = {
  nameInvalid: "Cannot be empty! Only letters allowed.",
  emailInvalid: "Only gmail is allowed!",
  emailExisted: "Email is already used.",
  lengthError: "Length allow 8 to 32",
  emptyError: "Empty not allow",
  numberError: "Enter number only",
  passwordWeak: "Password weak or too long!",
};

const LOCAL_STORAGE_KEY = {
  isLogged: "@atlana/logged",
  cartLocal: "@atlana/cart",
  wishlistLocal: "@atlana/wishlist",
};

const SCREEN_MIN_SIZE = {
  desktop: 992,
  tablet: 768,
};

const COMMON_SEARCH_TERM = [
  // category English
  "blouse",
  "blazer",
  "bikini",
  "croptop",
  "dress",
  "polo",
  "pants",
  "shorts",
  "skirt",

  // category Vietnamese
  "áo kiểu",
  "áo polo",
  "áo balzer",
  "áo croptop",
  "đầm",
  "đồ bơi",
  "váy",
  "váy mini",
  "váy demin",
  "quần",
  "quần short",
];

export {
  ORDER_STATE_MAP,
  ORDER_STATE_CODE,
  ORDER_STATE_ORIGINAL,
  COMMON_PATH,
  COMMON_SEARCH_TERM,
  LOCAL_STORAGE_KEY,
  INPUT_ERROR_MESSAGE,
  EMAIL_TYPE,
  SCREEN_MIN_SIZE,
};
