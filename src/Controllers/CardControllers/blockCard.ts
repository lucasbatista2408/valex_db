import {Request, Response} from 'express'
import * as cardServices from '../../Services/cardServices'


export default async function blockCard(req:Request, res: Response){
  
  const body = req.body

  const password = req.body.password
  const cardId = res.locals.cardId

  const card = await cardServices.blockCard(body, cardId, password)

  res.status(201).send(card)

}