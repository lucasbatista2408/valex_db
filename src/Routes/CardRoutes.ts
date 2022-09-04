import { Router } from 'express'
import * as CardMiddleware from '../Middleware/CardMiddleware';
import newCard from '../Controllers/CardControllers/newCard';
import activateCard from '../Controllers/CardControllers/activateCard';

const router = Router();

//creates new card
router.post('/new-card', CardMiddleware.checkCompanyExist, CardMiddleware.checkByType, newCard);

//activates new card
router.post('/activate-card', CardMiddleware.checkCard, activateCard);

//check balance and transactions
router.get('/display/balance', );

//unblock card
router.post('/card/unblock', )

//block card
router.post('/card/block')


export default router;