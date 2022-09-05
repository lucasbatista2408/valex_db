import * as cardRepository from '../Repositories/cardRepository'


export async function checkIfCardExists(number:number){

  const card = await cardRepository.findById(number)

  //check if cards exists
  if(!card){
    throw {type: "error_not_found", message: "card not found"}
  }

  return card
}