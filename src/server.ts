import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config();
const app = express();
const PORT:number = parseInt(process.env.PORT) || 5000
app.use(express.json());
app.use(cors());

//ROUTES
// app.use();



app.listen(PORT, () => {
  console.log(`SERVER ON PORT ${PORT}`)
})