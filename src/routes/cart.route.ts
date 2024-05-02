import { Router } from 'express'
import {createCart,updateCart,deleteCart,showCart,showCartById,downloadCartPDF} from  '../controllers/cart.controller'

const router = Router();

router.post('/cart',createCart);
router.delete('/cart/:id',deleteCart);
router.put('/cart/:id',updateCart)
router.get('/cart/:id',showCartById)
router.get('/cart',showCart)
router.get('/download-cart/:cartId',downloadCartPDF )


export default router;