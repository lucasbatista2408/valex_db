import { Request, Response, NextFunction} from "express";
import { findByApiKey } from "../Repositories/companyRepository.js";
import { findByTypeAndEmployeeId } from "../Repositories/cardRepository.js";

export function dataInfo(req: Request){
  const user = req.body
  const api_key = req.headers.x_api_key.toString();

  return {user,api_key}
}

export async function checkElement(req: Request, res: Response, next:NextFunction){
  const {user, api_key} = dataInfo(req)
  console.log(api_key)

  if(!api_key || !user.type || !user.employeeId){
    return res.status(400).send("bad request")
  }

  next()
}

export async function checkCompanyExist(req: Request, res: Response, next:NextFunction){
  
  const {api_key} = dataInfo(req)

  try {
    const company = await findByApiKey(api_key);
    console.log(company)
    if(!company){
      throw {code: 404}
    }
  } catch (error) {
    return res.sendStatus(error.code)
  }

  next()
}

export async function checkByType(req: Request, res: Response, next:NextFunction){

  const {user} = dataInfo(req)

  try {
    const exists = await findByTypeAndEmployeeId(user.type, user.employeeId)
    console.log(exists)
    if(exists){
      throw {code:404, message: "user already has a card of that type"}
    }
  } catch (error) {
    return res.status(error.code).send(error.message)
  }

  next()
}