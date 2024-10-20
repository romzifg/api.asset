import * as express from 'express'
import tokenMiddleware from '@/middleware/token.middleware'
import { login } from '@/controllers/v1/auth.controller'

const router = express.Router()

router.post('/login', tokenMiddleware, login)

export default router