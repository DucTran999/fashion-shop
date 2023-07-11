import Joi from "joi";
import createHttpError from "http-errors";

const getProductsListSchema = Joi.object({
  category: Joi.string()
    .trim()
    .pattern(new RegExp("^[a-z-]+$"))
    .lowercase()
    .required(),
  page: Joi.string().trim().pattern(new RegExp("^\\d+$")).required(),
});

const validateGetProductsListPayload = (req, res, next) => {
  try {
    // Validate query params
    const { category, page } = req.query;
    const { error } = getProductsListSchema.validate(req.query);
    if (error) throw createHttpError.BadRequest();

    // Cleanup params
    const payloadCleaned = {
      category: category.trim(),
      page: page.trim(),
    };
    next(payloadCleaned);
  } catch (error) {
    next(createHttpError.BadRequest());
  }
};

const validateGetProductPayload = (req, res, next) => {
  try {
    // Validate id
    const { id } = req.params;
    const allDigits = /^[0-9]+$/g;
    if (!allDigits.test(id.trim())) throw createHttpError.BadRequest();

    // Cleanup params
    next({ id: id.trim() });
  } catch (error) {
    next(createHttpError.BadRequest());
  }
};

export default { validateGetProductsListPayload, validateGetProductPayload };
