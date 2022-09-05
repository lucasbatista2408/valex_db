import { Request, Response, NextFunction } from "express";
import * as cardServices from '../Services/cardServices'
import * as rechargeServices from '../Services/rechargeServices'

export function amountValidation(req:Request,res:Response, next:NextFunction){

  const {amount} = req.body

  if(amount <= 0){
    throw {type: "bad request", message: "amoung must be bigger than zero(0)"}
  }

  next()
}

export async function checkCard(req: Request, res: Response, next:NextFunction){
  const cardId = Number(req.body.cardId)

  const card = await rechargeServices.checkCard(cardId)

  cardServices.validationDate(card.expirationDate)

  next()
}

