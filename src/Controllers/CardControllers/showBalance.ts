import {Request, Response} from 'express'
import * as cardServices from '../../Services/cardServices'


export async function showBalance(req:Request,res:Response){

  const cardId:number = req.body.cardId

  const data = await cardServices.showBalance(cardId)

  res.send(data)
}