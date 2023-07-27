import createHttpError from "http-errors";
import * as dotenv from "dotenv";
import Joi from "joi";

import { EMAIL_TYPE } from "../../utils/constVariable.js";
import { decryptAES } from "../../utils/crypto.js";

dotenv.config();
const apiKey = process.env.API_MAIL_SERVICE_KEY;

const resendEmailSchema = Joi.object({
  api_mail_key: Joi.string().trim().required(),
  email: Joi.string().email().pattern(new RegExp("@gmail.com$")).required(),
  first_name: Joi.string().trim().alphanum().required(),
  service: Joi.string()
    .trim()
    .valid(EMAIL_TYPE.verifyNewRegister, EMAIL_TYPE.verifyUnlockLogin)
    .required(),
});

const validateResendMailPayload = async (req, res, next) => {
  try {
    //validate field's format
    const { error } = resendEmailSchema.validate(req.body);
    if (error) throw createHttpError.BadRequest();

    // Check api key valid
    const { api_mail_key, email, first_name, service } = req.body;
    if (decryptAES(api_mail_key) !== apiKey) throw createHttpError.BadRequest();
    console.log(decryptAES(api_mail_key));

    // new payload
    const payloadCleaned = { email: email, name: first_name, service: service };
    next(payloadCleaned);
  } catch (error) {
    next(error);
  }
};

const credentialSchema = Joi.object({
  email: Joi.string().email().pattern(new RegExp("@gmail.com$")).required(),
  service: Joi.string()
    .trim()
    .valid(EMAIL_TYPE.verifyNewRegister, EMAIL_TYPE.verifyUnlockLogin)
    .required(),
});

const validateVerificationMailPayload = (req, res, next) => {
  try {
    // Check missing params
    const { cipher, token } = req.params;

    // Check credentials
    const credentials = JSON.parse(decryptAES(decodeURIComponent(cipher)));
    const { error } = credentialSchema.validate(credentials);
    if (error) throw createHttpError.BadRequest();

    // send the payload to next processor
    next({ ...credentials, token: token });
  } catch (error) {
    next(createHttpError.BadRequest());
  }
};

export default {
  validateResendMailPayload: validateResendMailPayload,
  validateVerificationMailPayload: validateVerificationMailPayload,
};
