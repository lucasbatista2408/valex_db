import express, {json} from 'express';
import 'express-async-errors';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from '../src/Routes/Routes';
import errorHandlingMiddleware from './Middleware/errorHandler';

const app = express();

dotenv.config();

app.use(express.json());
app.use(cors());
app.use(json())

const PORT:number = Number(process.env.PORT) || 5000


//ROUTES
app.use(routes);
app.use(errorHandlingMiddleware);
app.use(routes)


app.listen(PORT, () => {
  console.log(`SERVER ON PORT ${PORT}`)
})