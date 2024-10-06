import * as express from 'express'
import { tokenMiddleware } from '@/middleware/token.middleware'
import { changeStatus, getAll, store, update } from '@/controllers/v1/user.controller'

const router = express.Router()

router.get('/', tokenMiddleware, getAll)
router.post('/', tokenMiddleware, store)
router.put('/change-status/:id', tokenMiddleware, changeStatus)
router.put('/:id', tokenMiddleware, update)

export default router