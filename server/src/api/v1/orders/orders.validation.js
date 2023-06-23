import createHttpError from "http-errors";
import Joi from "joi";

const placeOrderSchema = Joi.object({
  payment_method_id: Joi.string().trim().pattern(new RegExp("^[0-9]+$")),
});

const updateOrderStateSchema = Joi.object({
  user_id: Joi.string().trim().pattern(new RegExp("^[0-9]+$")),
  current_state_id: Joi.string().trim().pattern(new RegExp("^[0-9]+$")),
  next_state_id: Joi.string().trim().pattern(new RegExp("^[0-9]+$")),
});

const placeOrderPayloadValidator = (req, res, next) => {
  const { error } = placeOrderSchema.validate(req.body);
  if (error) {
    next(createHttpError.BadRequest("Invalid payment method!"));
  }
  next();
};

const updateOrderStatePayloadValidator = (req, res, next) => {
  const { error } = updateOrderStateSchema.validate(req.body);
  if (error) {
    next(createHttpError.BadRequest("Payload Invalid!"));
  }
  next();
};

export default {
  placeOrderPayloadValidator,
  updateOrderStatePayloadValidator,
};
