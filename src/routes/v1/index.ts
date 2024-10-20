import * as express from 'express'
const router = express.Router()

import AuthRoute from '@/routes/v1/auth.route'
import UserRoute from '@/routes/v1/user.route'

router.use('/auth', AuthRoute)
router.use('/user', UserRoute)

export default router