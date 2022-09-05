import { Request, Response } from "express";
import { resolveSync } from "tsconfig";
import * as rechargeServices from '../../Services/rechargeServices'
import * as rechargeRepository from '../../Repositories/rechargeRepository'


export default async function rechargeCard(req:Request, res:Response){

  const amount:number = Number(req.body.amount)
  const cardId:number = Number(req.body.cardId)

  await rechargeServices.rechargeCard(cardId,amount)

  const recharge = await rechargeRepository.findByCardId(cardId)

  res.status(200).send(recharge)
  
}