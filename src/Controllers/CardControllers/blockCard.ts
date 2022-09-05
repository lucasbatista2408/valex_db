import {Request, Response} from 'express'
import * as cardServices from '../../Services/cardServices'


export default async function blockCard(req:Request, res: Response){
  
  const data = res.locals
  const cardId = res.locals.cardId

  const card = await cardServices.blockCard(data, cardId)

  res.status(201).send(card)


}