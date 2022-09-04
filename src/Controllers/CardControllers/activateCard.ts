import {Request, Response} from 'express'
import bcrypt from 'bcrypt'
import * as cardService from '../../Services/cardServices'

export default async function activateCard(req: Request, res: Response){

  const pteste = req.body.password
  const password = (bcrypt.hashSync(pteste, 10))
  const type = res.locals.type
  const user = res.locals.userId
  const cardId = res.locals.cardId


  await cardService.activateCard(cardId, user, type, password)

  res.sendStatus(204)
}