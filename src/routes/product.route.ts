import { Router } from 'express'
import {getAllproducta,createProduct,getProductById,updateProductById,deleteProductById} from '../controllers/product.controller'

const router = Router();

router.get('/product',getAllproducta)
router.post('/product',createProduct)
router.get('/product/:id',getProductById)
router.put('/product/:id',updateProductById)
router.delete('/product/:id',deleteProductById)

export default router