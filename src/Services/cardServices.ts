import { NextFunction } from "express"
import { findByApiKey } from "../Repositories/companyRepository";
import * as cardRepository from "../Repositories/cardRepository";
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

export async function checkByType(type: cardRepository.TransactionTypes, employeeId:number){

  const exists = await cardRepository.findByTypeAndEmployeeId(type, employeeId)
    if(exists){
      throw {type: 'error_not_found', message: "user already has a card of that type"}
    }
}
 
export async function checkIfCardExists(number:string, cardholderName:string, expirationDate:string){

  const card = await cardRepository.findByCardDetails(number, cardholderName, expirationDate)

  //check if cards exists
  if(!card){
    throw {type: "error_not_found", message: "card not found"}
  }

  return card
}

export function validationDate(date:string){
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

export async function activateCard(cardID:number, user:number, type: cardRepository.TransactionTypes, cardData:cardRepository.CardUpdateData){
  
  const element = cardData

  await cardRepository.update(cardID, cardData)

  const data = await cardRepository.findByTypeAndEmployeeId(type, user)
  console.log(data.password)
  
  if(!data.password){
    throw {type: "could_not_update", message: "error when trying to update"}
  }

}

export async function checkIfBlocked( number: string, cardholderName: string,expirationDate: string){

  const card = await cardRepository.findByCardDetails(number, cardholderName,expirationDate)

  if(card.isBlocked){
    throw {type: "forbidden", message: "card is already blocked"}
  }

  return card
}

export async function checkIfUnblocked( number: string, cardholderName: string,expirationDate: string){

  const card = await cardRepository.findByCardDetails(number, cardholderName,expirationDate)

  if(!card.isBlocked){
    throw {type: "forbidden", message: "card is already unblocked"}
  }

  return card
}

export async function blockCard(body, cardId, password){

  const { cardholderName, expirationDate, number } = body

  const cardData:cardRepository.CardUpdateData = {isBlocked: true}

  await cardRepository.update(cardId, cardData)

  const card = await cardRepository.findByCardDetails(number, cardholderName,expirationDate)

  return card
}

export async function unblockCard(body, cardId, password){

  const { cardholderName, expirationDate, number } = body

  const cardData:cardRepository.CardUpdateData = {isBlocked: false}

  await cardRepository.update(cardId, cardData)

  const card = await cardRepository.findByCardDetails(number, cardholderName,expirationDate)

  return card
}