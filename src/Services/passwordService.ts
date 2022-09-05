import { findByCardDetails } from "../Repositories/cardRepository";
import bcrypt from 'bcrypt'



export default async function passwordValidation(password:string, localpw:string){

  if(!bcrypt.compareSync(password, localpw)){
    throw {type: "forbidden", message: "wrong credentials"}
  }
  
}
