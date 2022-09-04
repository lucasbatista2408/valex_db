import {Request, Response} from 'express'
import bcrypt from 'bcrypt'

export default async function activateCard(req: Request, res: Response){
  
  const password = String(req.body.password)
  const encrypted_password = bcrypt.hashSync(password, 10)
  
  console.log(password)
  console.log(encrypted_password)
  

}