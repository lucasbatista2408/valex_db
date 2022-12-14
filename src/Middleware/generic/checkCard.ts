import { Request, Response, NextFunction} from "express";
import { decrypt } from "../cryptr";
import * as cardServices from '../../Services/checkCard'

export async function checkCard(req: Request, res: Response, next:NextFunction){

  const data = Object(req.body)

  const card = await cardServices.checkIfCardExists(data.cardId)

  res.locals.userId = card.employeeId;
  res.locals.type = card.type
  res.locals.cardId = card.id;
  res.locals.password = card.password
  res.locals.expirationDate = card.expirationDate
  res.locals.isBlocked = card.isBlocked
  res.locals.securityCode = card.securityCode
  res.locals.cardholderName = card.cardholderName
  res.locals.number = card.number

  next()
}