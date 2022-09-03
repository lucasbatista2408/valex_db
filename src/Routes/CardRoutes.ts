import { Router } from 'express'
import {checkElement, checkCompanyExist, checkByType} from '../Middleware/CardMiddleware.js';
import newCard from '../Controllers/CardControllers/newCard.js';

const router = Router();

//creates new card
router.post('/new-card', checkElement, checkCompanyExist, checkByType, newCard);

//activates new card
router.post('/activate-card', );


export default router;