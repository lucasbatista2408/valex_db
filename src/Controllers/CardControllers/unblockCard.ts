import {Request, Response} from 'express'
import * as cardServices from '../../Services/cardServices'


export default async function unblockCard(req:Request, res: Response){

  const data = res.locals
  const cardId = res.locals.cardId

  const card = await cardServices.unblockCard(data, cardId)

  res.status(201).send(card)

}