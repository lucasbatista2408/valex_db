import * as businessRepository from '../Repositories/businessRepository'
import { PaymentInsertData, insert, findByCardId } from '../Repositories/paymentRepository'
import * as rechargeRepository from '../Repositories/rechargeRepository'

export function checkAmount(amount:number){

  if(amount <= 0){
    throw {type: "bad request", message: "amount has to be bigget than zero(0)"}
  }

}

export function checkBlockStatus(isBlocked:boolean){

  if(isBlocked){
    throw {type: "forbidden", message: "card is blocked"}
  }
}

export async function checkBusiness(businessId: number, type:string){

  const business = await businessRepository.findById(businessId)

  if(!business){
    throw {type: "error_not_found", message: "business not found"}
  }

  if(business.type !== type){
    throw {type: "forbidden", message: "type does not match"}
  }
}

export async function checkBalance(cardId:number, amount:number){
  
  const recharge = await rechargeRepository.findByCardId(cardId)
  const balance = recharge.map(el => el.amount).reduce((a:number,b:number) => a+b,0)
  
  if(amount > balance){
    throw {type: "forbidden", message: "not enough funds"}
  }

}

export async function paymentCard(paymentData: PaymentInsertData){

  await insert(paymentData)
}

export async function payRecord(cardId:number){

  const purchaseList = await findByCardId(cardId)

  if(!purchaseList){
    throw {type: "error_not_found", message: "no records so far"}
  }

  return purchaseList
}