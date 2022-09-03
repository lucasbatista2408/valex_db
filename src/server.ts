import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import routes from '../src/Routes/Routes.js'

const app = express();

dotenv.config();

app.use(express.json());
app.use(cors());

const PORT:number = parseInt(process.env.PORT) || 5000


//ROUTES
app.use(routes);


app.listen(PORT, () => {
  console.log(`SERVER ON PORT ${PORT}`)
})