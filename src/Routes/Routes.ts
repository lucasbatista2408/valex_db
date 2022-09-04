import { Router } from 'express'
import CardRoute from './CardRoutes'
import RechargeRoutes from './RechargeRoutes'
import PurchaseRoutes from './PurchaseRoutes'

const router = Router();

router.use(CardRoute);
router.use(RechargeRoutes);
router.use(PurchaseRoutes) 

export default router;