import {Request, Response, NextFunction} from 'express'
import * as passwordService from '../Services/passwordService'


export default async function passwordValidation(req:Request, res:Response, next:NextFunction){


  const password: string = req.body.password
  const localpw = res.locals.password

  await passwordService.default(password, localpw)

  next()
}