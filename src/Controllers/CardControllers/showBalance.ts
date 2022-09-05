import {Request, Response} from 'express'
import * as rechargeRepository from '../../Repositories/rechargeRepository'
import * as paymentRepository from '../../Repositories/paymentRepository'


export async function showBalance(req:Request,res:Response){

  const {cardId} = req.body

  const recharges = await rechargeRepository.findByCardId(cardId)
  const transactions = await paymentRepository.findByCardId(cardId)

  const recharges_value = recharges.map(el => el.amount).reduce((a:number,b:number) => a+b,0)
  const transactions_value = transactions.map(el => el.amount).reduce((a:number,b:number) => a+b,0)

  const balance = recharges_value - transactions_value

  const data = {balance, transactions, recharges}

  res.send(data)
}