import createHttpError from "http-errors";
import { formatVietnameseToNonAccentNoHyphen } from "../../utils/formatData.js";

const validateSearchTerm = (req, res, next) => {
  try {
    // Check not empty
    let searchTerm = req.query?.keyword;
    if (!searchTerm) throw createHttpError.BadRequest();

    // Check length
    searchTerm = formatVietnameseToNonAccentNoHyphen(searchTerm);
    if (searchTerm.length > 100) throw createHttpError.BadRequest();

    // Check not contains symbols
    const containSymbols = /[!"#$%&'()*+,-./:<;=?>@[\]^_`{|}~]+/g;
    if (containSymbols.test(searchTerm)) throw createHttpError.BadRequest();

    next();
  } catch (error) {
    next(error);
  }
};

export default {
  validateSearchTerm: validateSearchTerm,
};
