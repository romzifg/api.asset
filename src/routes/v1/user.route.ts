import * as express from 'express'
import { changeStatus, getAll, store, update } from '@/controllers/v1/user.controller'
import tokenMiddleware from '@/middleware/token.middleware'
import authMiddleware from '@/middleware/auth.middleware'

const router = express.Router()

router.get('/', [tokenMiddleware, authMiddleware], getAll)
router.post('/', [tokenMiddleware, authMiddleware], store)
router.put('/change-status/:id', [tokenMiddleware, authMiddleware], changeStatus)
router.put('/:id', [tokenMiddleware, authMiddleware], update)

export default router