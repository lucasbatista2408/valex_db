import { Router } from 'express'
import * as CardMiddleware from '../Middleware/CardMiddleware';
import joiValidation from '../Middleware/joiValidation';
import newCard from '../Controllers/CardControllers/newCard';
import activateCard from '../Controllers/CardControllers/activateCard';
import passwordValidation from '../Middleware/passwordValidation';
import blockCard from '../Controllers/CardControllers/blockCard';
import unblockCard from '../Controllers/CardControllers/unblockCard';
import { passwordSchema } from '../Schemas/passwordSchema';
import { showBalance } from '../Controllers/CardControllers/showBalance';
import { checkCard } from '../Middleware/generic/checkCard';

const router = Router();

//creates new card
router.post('/new-card', CardMiddleware.checkCompanyExist, CardMiddleware.checkByType, newCard);

//activates new card
router.post('/activate-card', joiValidation(passwordSchema),  CardMiddleware.checkCard, CardMiddleware.checkIfPasswordExists, activateCard);

//check balance and transactions
router.get('/display/balance', checkCard, showBalance);

//unblock card
router.post('/card/unblock', CardMiddleware.checkCard, CardMiddleware.checkIfUnblocked, passwordValidation, unblockCard)

//block card
router.post('/card/block', CardMiddleware.checkCard, CardMiddleware.checkIfBlocked, passwordValidation, blockCard)


export default router;