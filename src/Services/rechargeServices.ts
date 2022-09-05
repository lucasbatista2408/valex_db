import * as cardRepository from '../Repositories/cardRepository'
import * as rechargeRepository from '../Repositories/rechargeRepository'


export async function checkCard(cardId:number){

  const card = await cardRepository.findById(cardId)

  if(!card){
    throw {type: "error_not_found", message: "card not found"}
  }

  return card

}

export async function rechargeCard(cardId:number,amount:number){

  const rechargeData: rechargeRepository.RechargeInsertData ={cardId,amount}

  await rechargeRepository.insert(rechargeData)

}