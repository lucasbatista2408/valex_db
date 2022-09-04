import { Request, Response, NextFunction} from "express";
import * as cardServices from "../Services/cardServices";
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

  await cardServices.checkCompanyExist(apikey) 

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

  cardServices.checkIfPassExists(card.password)

  decrypt(card.securityCode, cvv)

  console.log("deu bom")
  next()
}