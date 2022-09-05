import { Request, Response, NextFunction} from "express";
import * as cardServices from "../Services/cardServices";
import * as cardRepository from '../Repositories/cardRepository'
import { decrypt } from "./cryptr";

export async function checkElement(req: Request, res: Response, next:NextFunction){
  const apikey = String(req.headers.x_api_key);
  const type = String(req.body.type)
  const employeeId = Number(req.body.employeeId)

  cardServices.checkIfExists(apikey, type, employeeId, next)

  next()
}

export async function checkCompanyExist(req: Request, res: Response, next:NextFunction){
  
  const apikey = String(req.headers.x_api_key);

  const company = await cardServices.checkCompanyExist(apikey) 

  res.locals.card = company

  next()
}

export async function checkByType(req: Request, res: Response, next:NextFunction){

  const type = req.body.type
  const employeeId = Number(req.body.employeeId)

  await cardServices.checkByType(type,employeeId)

  next()
}

// checks if card exists and is not expired
export async function checkCard(req: Request, res: Response, next:NextFunction){
  const number:string = String(req.body.number)
  const cardholderName:string = String(req.body.cardholderName)
  const expirationDate:string = String(req.body.expirationDate)
  const cvv = String(req.body.securityCode)

  const card = await cardServices.checkIfCardExists(number, cardholderName, expirationDate)

  await cardServices.validationDate(card.expirationDate)

  decrypt(card.securityCode, cvv)

  res.locals.userId = card.employeeId;
  res.locals.type = card.type
  res.locals.cardId = card.id;
  res.locals.password = card.password

  next()
}

export function checkIfPasswordExists(req: Request, res: Response, next:NextFunction){

  const password = res.locals.password

  cardServices.checkIfPassExists(password)

  next()

}

export async function checkIfBlocked(req: Request, res: Response, next:NextFunction){

  const cardholderName: string = req.body.cardholderName
  const expirationDate: string = req.body.expirationDate
  const number: string = req.body.number

  const card = await cardServices.checkIfBlocked(number, cardholderName, expirationDate)
  
  res.locals.cardId = card.id
  res.locals.password = card.password

  next()
}

export async function checkIfUnblocked(req: Request, res: Response, next:NextFunction){

  const cardholderName: string = req.body.cardholderName
  const expirationDate: string = req.body.expirationDate
  const number: string = req.body.number

  const card = await cardServices.checkIfUnblocked(number, cardholderName, expirationDate)
  
  res.locals.cardId = card.id

  next()
}