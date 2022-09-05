import dayjs from 'dayjs'

export function validationDate(date:string){
  const mes = date.slice(0,2)
  const ano = date.slice(3,date.length)
  
  const anojs = dayjs().year(Number(`20${ano}`)).format("YY")
  const mesjs = dayjs().month(Number(mes)-1).format("MM")
  const today = dayjs()
  
  if(today.format("YY") > anojs){
    throw {type: "forbidden", message: "card expired"} // expired
  }
}