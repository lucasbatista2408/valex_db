import { Router } from 'express'
import * as CardMiddleware from '../Middleware/CardMiddleware';
import joiValidation from '../Middleware/joiValidation';
import passwordValidation from '../Middleware/passwordValidation';
import { passwordSchema } from '../Schemas/passwordSchema';
import { checkCard } from '../Middleware/generic/checkCard';
import { cardSchema } from '../Schemas/cardSchema';

import { showBalance } from '../Controllers/CardControllers/showBalance';
import newCard from '../Controllers/CardControllers/newCard';
import activateCard from '../Controllers/CardControllers/activateCard';
import blockCard from '../Controllers/CardControllers/blockCard';
import unblockCard from '../Controllers/CardControllers/unblockCard';
import { typeValidation } from '../Middleware/typeValidation';


const router = Router();

//creates new card
router.post('/new-card', joiValidation(cardSchema), typeValidation, CardMiddleware.checkCompanyExist, CardMiddleware.checkByType, newCard);

//activates new card
router.post('/activate-card', joiValidation(passwordSchema),  checkCard, CardMiddleware.checkCVV, CardMiddleware.checkIfPasswordExists, activateCard);

//check balance and transactions
router.get('/display/balance', checkCard, showBalance);

//unblock card
router.post('/card/unblock', checkCard, CardMiddleware.checkIfUnblocked, passwordValidation, unblockCard)

//block card
router.post('/card/block', checkCard, CardMiddleware.checkIfBlocked, passwordValidation, blockCard)


export default router;