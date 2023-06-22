import createHttpError from "http-errors";
import Joi from "joi";

const placeOrderSchema = Joi.object({
  payment_method_id: Joi.string().trim().pattern(new RegExp("^[0-9]+$")),
});

const placeOrderPayloadValidator = (req, res, next) => {
  const { error } = placeOrderSchema.validate(req.body);
  if (error) {
    next(createHttpError.BadRequest("Invalid payment method!"));
  }
  next();
};

export default {
  placeOrderPayloadValidator,
};
