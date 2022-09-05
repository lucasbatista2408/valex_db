import {Request, Response} from 'express'
import bcrypt from 'bcrypt'
import * as cardService from '../../Services/cardServices'
import { CardUpdateData } from '../../Repositories/cardRepository'

export default async function activateCard(req: Request, res: Response){

  const password = (bcrypt.hashSync(req.body.password, 10))
  const cardData: CardUpdateData = {password, isBlocked: false}
  const type = res.locals.type
  const user = res.locals.userId
  const cardId = res.locals.cardId


  await cardService.activateCard(cardId, user, type, cardData)

  res.sendStatus(204)
}