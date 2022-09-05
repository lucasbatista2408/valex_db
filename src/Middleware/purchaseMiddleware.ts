import { Request, Response, NextFunction } from "express";
import * as purchaseService from '../Services/purchaseService'


export function checkAmount(req:Request,res:Response,next:NextFunction){

  const amount:number = req.body.amount

  purchaseService.checkAmount(amount)

  next()
}

export async function checkBlockStatus(req:Request,res:Response,next:NextFunction){

  const isBlocked = res.locals.isBlocked
  console.log(isBlocked)

  purchaseService.checkBlockStatus(isBlocked)

  next()
}

export async function checkBusiness(req:Request,res:Response,next:NextFunction){

  const businessId: number = req.body.businessId
  const type = res.locals.type

  await purchaseService.checkBusiness(businessId, type)

  next()
}

export async function checkBalance(req:Request,res:Response,next:NextFunction){

  const cardId:number = req.body.cardId
  const amount:number = req.body.amount

  await purchaseService.checkBalance(cardId,amount)

  next()
}