import {Request, Response} from 'express'
import { faker } from '@faker-js/faker';
import { insert } from '../../Repositories/cardRepository';
import { decrypt, encrypt } from '../../Middleware/cryptr';
import * as cardServices from '../../Services/cardServices'

export default async function newCard(req: Request, res: Response){

  const number = faker.finance.creditCardNumber();
  const cvv = faker.finance.creditCardCVV()
  const securityCode = encrypt(cvv)

  const {
    employeeId,
    password,
    isVirtual = false,
    originalCardId,
    isBlocked = true,
    type
} = req.body;

    const cardholderName = await cardServices.getCardHolderName(employeeId)
    const expirationDate = cardServices.getExpirationDate()


  const cardData = {
    employeeId,
    number,
    cardholderName,
    securityCode,
    expirationDate,
    password,
    isVirtual,
    originalCardId,
    isBlocked,
    type}

  const insertedCard = {
    employeeId,
    number,
    cardholderName,
    securityCode: cvv,
    expirationDate,
    password,
    isVirtual,
    originalCardId,
    isBlocked,
    type}

    console.log(insertedCard)

  await insert(cardData)

  res.status(201).send(insertedCard)
  
}