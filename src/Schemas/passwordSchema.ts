import joi from 'joi';

export const passwordSchema = joi.object({
  cardId: joi.number().required(),
  securityCode: joi.string().required(),
	password: joi.string().pattern(/^([0-9]{4})$/).required(),
});

export const purchaseSchema = joi.object({
  cardId: joi.number().required(),
  password: joi.string().pattern(/^([0-9]{4})$/).required(),
  businessId: joi.number().required(),
  amount: joi.number().required(),
})