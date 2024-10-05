import * as express from 'express'
const router = express.Router()

import UserRoute from '@/routes/v1/user.route'

router.use('/user', UserRoute)

export default router