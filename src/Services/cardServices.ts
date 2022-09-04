import { NextFunction } from "express"
import { findByApiKey } from "../Repositories/companyRepository";
import { findByTypeAndEmployeeId, findByCardDetails, update, TransactionTypes, CardUpdateData } from "../Repositories/cardRepository";
import * as employeeRepository from "../Repositories/employeeRepository";
import dayjs from "dayjs";
import bcrypt from 'bcrypt'


export function checkIfExists(apikey: string, user_type: string, user_employee: number, next: NextFunction){

  if(!apikey || !user_type || !user_employee){
    throw {type: 'error_not_found', message: 'information needed not sent'}
  }

}

export async function checkCompanyExist(apikey: string){


  const company = await findByApiKey(apikey);
  console.log(company)
  
  if(!company){
    throw {type: 'error_not_found', message: "company does not exist"}
  }
  
}

export async function checkByType(type: TransactionTypes, employeeId:number){

  const exists = await findByTypeAndEmployeeId(type, employeeId)
    if(exists){
      throw {type: 'error_not_found', message: "user already has a card of that type"}
    }
}
 
export async function checkIfCardExists(number:string, cardholderName:string, expirationDate:string){

  const card = await findByCardDetails(number, cardholderName, expirationDate)

  //check if cards exists
  if(!card){
    throw {type: "error_not_found", message: "card not found"}
  }

  return card
}

export async function validationDate(date:string){
  const mes = date.slice(0,2)
  const ano = date.slice(3,date.length)
  
  const anojs = dayjs().year(Number(`20${ano}`)).format("YY")
  const mesjs = dayjs().month(Number(mes)-1).format("MM")
  const today = dayjs()
  console.log(ano)
  console.log(mesjs)
  console.log(anojs)
  
  if(today.format("YY") > anojs){
    throw {type: "forbidden", message: "card expired"} // expired
  }
}

export function checkIfPassExists(password:string){

  if(password){
    throw {type: "forbidden", message: "card already activated"}
  }
}

export async function getCardHolderName(employeeId:number){

    const user = await employeeRepository.findById(employeeId)
    
    if(!user){
      throw {type: "not_found", message: "user not found"}
    }

    const nameUpperSplit = user.fullName.toUpperCase().split(" ")
    const slice = nameUpperSplit.slice(1,nameUpperSplit.length-1)
    const firstName = nameUpperSplit[0]
    const lastName = nameUpperSplit[nameUpperSplit.length-1]
    const middleName = slice.filter(e => e.length > 3).map(e=> e[0]).join(" ")

    const cardholderName = `${firstName} ${middleName} ${lastName}`
    
    return cardholderName
}

export function getExpirationDate(){

  const expirationDate = dayjs().add(5, 'year').format('MM/YY')

  return expirationDate
}

export async function activateCard(cardID:number, user:number, type: TransactionTypes, pw){
  const password = bcrypt.hashSync(pw, 10)
  const cardData: CardUpdateData = {password}

  await update(cardID, cardData)

  const data = await findByTypeAndEmployeeId(type, user)
  
  if(!data.password){
    throw {type: "could_not_update", message: "error when trying to update"}
  }

}