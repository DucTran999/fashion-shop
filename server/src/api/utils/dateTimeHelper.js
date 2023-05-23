import { format } from "date-fns";

const getCurrentDate = () => {
  return format(new Date(), "yyyy-MM-dd");
};

const getCurrentDateTime = () => {
  return format(new Date(), "yyyy-MM-dd HH:mm:ss");
};

export default { getCurrentDate, getCurrentDateTime };
