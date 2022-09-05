import { Request, Response, NextFunction } from "express";

export function typeValidation(req: Request,res: Response, next: NextFunction){

  const {type} = req.body

  if(type === 'groceries' || type === 'restaurants' || type === 'transport' || type === 'education' || type === 'health'){
    next()
  } else{
    throw {type: "forbidden", message: "type does not match the requirements"}
  }
}