import { findByCardDetails } from "../Repositories/cardRepository";
import bcrypt from 'bcrypt'



export default async function passwordValidation(password, localpw){

  if(!bcrypt.compareSync(password, localpw)){
    throw {type: "forbidden", message: "wrong credentials"}
  }
  
}

// SELECT * FROM cards WHERE number='3462-748575-93523' AND "cardholderName"='FULANO R SILVA' AND "expirationDate"='09/27';