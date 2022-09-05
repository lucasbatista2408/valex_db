import {Request, Response} from 'express'
import * as cardServices from '../../Services/cardServices'


export default async function unblockCard(req:Request, res: Response){
  
  const body = req.body

  const password = req.body.password
  const cardId = res.locals.cardId

  const card = await cardServices.unblockCard(body, cardId, password)

  res.status(201).send(card)

}