import createHttpError from "http-errors";
import Joi from "joi";

const addNewProductCartScheme = Joi.object({
  cart_id: Joi.string().trim().pattern(new RegExp("^\\d+$")).required(),
  variant_id: Joi.string().trim().pattern(new RegExp("^\\d+$")).required(),
  qty: Joi.string().trim().pattern(new RegExp("^\\d+$")).required(),
});

const removeProductCartScheme = Joi.object({
  cart_id: Joi.string().trim().pattern(new RegExp("^\\d+$")).required(),
  variant_id: Joi.string().trim().pattern(new RegExp("^\\d+$")).required(),
});

const validateAddProductToCartPayload = (req, res, next) => {
  const { error } = addNewProductCartScheme.validate(req.body);
  if (error) {
    next(createHttpError.BadRequest());
  }
  next();
};

const validateRemoveProductCartPayload = (req, res, next) => {
  const { error } = removeProductCartScheme.validate(req.body);
  if (error) {
    next(createHttpError.BadRequest());
  }
  next();
};

export default {
  validateAddProductToCartPayload,
  validateRemoveProductCartPayload,
};
