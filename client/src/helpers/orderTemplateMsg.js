import { format } from "date-fns";
import { ORDER_STATE_CODE } from "../utils/constVariable";
import { formatMoney, getDateFromTimestamp } from "../utils/formatData";

const getMsg = (username, state, id, total, time) => {
  time = getDateFromTimestamp(time);

  const orderReadyToShip = `
    Hi, ${username}. The order ${id} with the total price ${formatMoney(total)} 
    you placed at ${format(time, "yyyy-MM-dd HH:mm:ss")} is being shipped. 
    Estimated time 3 days.
  `;

  if (state === ORDER_STATE_CODE.shipping) return orderReadyToShip;
};

export { getMsg };
