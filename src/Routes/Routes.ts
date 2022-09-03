import { Router } from 'express'
import CardRoute from './CardRoutes.js'
import RechargeRoutes from './RechargeRoutes.js'
import PurchaseRoutes from './PurchaseRoutes.js'

const router = Router();

router.use(CardRoute);
router.use(RechargeRoutes);
router.use(PurchaseRoutes) 

export default router;