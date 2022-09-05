import { Router } from 'express'
import rechargeCard from '../Controllers/RechargeControllers/rechargeCard';
import * as CardMiddleware from '../Middleware/CardMiddleware'
import * as rechargeMiddleware from '../Middleware/rechargeMiddleware'

const router = Router();

router.post('/recharge', rechargeMiddleware.amountValidation, CardMiddleware.checkCompanyExist, rechargeMiddleware.checkCard, rechargeCard)

export default router;