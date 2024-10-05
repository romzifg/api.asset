import * as express from 'express'
import { tokenMiddleware } from '@/middleware/token.middleware'
import { getAll, store } from '@/controllers/v1/user.controller'

const router = express.Router()

router.get('/', getAll)
router.post('/', store)

export default router