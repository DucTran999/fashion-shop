const MAGIC_NUMBER = {
  limitRows: 16,
};

const ORDER_STATE_ID = {
  pending: "1",
  shipping: "2",
  cancelled: "3",
  completed: "4",
  cancelling: "5",
};

const NOTIFICATION_TYPE = {
  news: "news",
  promotions: "promotions",
  orders: "orders",
};

const EMAIL_TYPE = {
  verifyNewRegister: "1",
  verifyUnlockLogin: "2",
};

export { MAGIC_NUMBER, ORDER_STATE_ID, NOTIFICATION_TYPE, EMAIL_TYPE };
