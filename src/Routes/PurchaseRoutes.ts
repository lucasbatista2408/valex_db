import { Router } from 'express'
import { paymentCard } from '../Controllers/PurchaseControllers/paymentCard';
import { checkCard } from '../Middleware/generic/checkCard';
import { checkValidation } from '../Middleware/generic/checkValidation';
import passwordValidation from '../Middleware/passwordValidation';
import * as purchaseMiddleware from '../Middleware/purchaseMiddleware'

const router = Router();

router.post('/purchase', 
purchaseMiddleware.checkAmount, 
checkCard, checkValidation, 
purchaseMiddleware.checkBlockStatus, 
passwordValidation, 
purchaseMiddleware.checkBusiness, 
purchaseMiddleware.checkBalance, 
paymentCard)

export default router;