import express from 'express'
import userCtrl from '../controllers/userController.js'
import authCtrl from '../controllers/authController.js'
const router = express.Router()

router.route('/api/users').post(userCtrl.create).get(userCtrl.list)

router
  .route('/api/users/:userId')
  .get(authCtrl.requireSignin, userCtrl.read)
  .put(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.update)
  .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.remove)
router.param('userId', userCtrl.userById)
export default router
