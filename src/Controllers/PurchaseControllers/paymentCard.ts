import { Request, Response } from "express";
import * as paymentRepository from '../../Repositories/paymentRepository'
import * as purchaseService from '../../Services/purchaseService'


export async function paymentCard(req:Request, res:Response){
  
  const {cardId, businessId, amount} = req.body
  const paymentData: paymentRepository.PaymentInsertData = {cardId, businessId, amount}

  await purchaseService.paymentCard(paymentData)

  const payRecord = await purchaseService.payRecord(cardId)

  res.status(200).send(payRecord)

}