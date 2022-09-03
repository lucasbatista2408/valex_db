import {Request, Response} from 'express'
import { faker } from '@faker-js/faker';
import { insert } from '../../Repositories/cardRepository.js';
import { findById } from '../../Repositories/employeeRepository.js';
import dayjs from 'dayjs'
import Cryptr from 'cryptr'

export default async function newCard(req: Request, res: Response){

  const cryptr = new Cryptr("secretkey")
  console.log(cryptr)

  const number = faker.finance.creditCardNumber();
  const cvv = faker.finance.creditCardCVV()
  const securityCode = cryptr.encrypt(cvv)

  const {
    employeeId,
    password,
    isVirtual,
    originalCardId,
    isBlocked,
    type
} = req.body;

  try {
    const user = await findById(employeeId)
    console.log(user.fullName)
    const nameUpperSplit = user.fullName.toUpperCase().split(" ")
    const slice = nameUpperSplit.slice(1,nameUpperSplit.length-1)
    const firstName = nameUpperSplit[0]
    const lastName = nameUpperSplit[nameUpperSplit.length-1]
    const middleName = slice.filter(e => e.length > 3).map(e=> e[0]).join(" ")

    const cardholderName = `${firstName} ${middleName} ${lastName}`
    const expirationDate = dayjs().add(5, 'year').format('MM/YY')

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
      type
  }
  
  console.log(cardData)
  
  await insert(cardData)
    
  res.send({number, securityCode})
  
  } catch (error) {
    res.sendStatus(500)
  }
  
}