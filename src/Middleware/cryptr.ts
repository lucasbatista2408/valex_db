import Cryptr from 'cryptr'

const cryptr = new Cryptr('secretKey');

export function encrypt(el:string){

  const crypted = cryptr.encrypt(el)

  return crypted
}

export function decrypt(enc:string, el){
  const decrypt = cryptr.decrypt(enc)
  console.log(decrypt)

  if(decrypt !== el){
    throw {type:"forbidden" , message:"invalid info"}
  }
}