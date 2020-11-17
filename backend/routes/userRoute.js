import express from 'express'
import userCtrl from '../controllers/userController.js'
const router = express.Router()

router.route('/api/users').post(userCtrl.create).get(userCtrl.list)

router
  .route('/api/users/:userId')
  .get(userCtrl.read)
  .put(userCtrl.update)
  .delete(userCtrl.remove)
router.param('userId', userCtrl.userById)
export default router
