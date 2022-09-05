import {Request, Response, NextFunction} from 'express'
import * as validation from '../../Services/checkValidation'


export async function checkValidation(req:Request,res:Response,next:NextFunction){

  const expirationDate = res.locals.expirationDate

  await validation.validationDate(expirationDate)

  next()
}

