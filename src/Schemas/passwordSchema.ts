import joi from 'joi';

export const passwordSchema = joi.object({
	number: joi.string(),
  cardholderName: joi.string(),
  securityCode: joi.string(),
  expirationDate: joi.string(),
	password: joi.string().pattern(/^([0-9]{4})$/).required(),
});