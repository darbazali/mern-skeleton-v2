import express from 'express'
import userCtrl from '../controllers/userController.js'
const router = express.Router()

router.route('/api/users').post(userCtrl.create).get(userCtrl.list)

export default router
