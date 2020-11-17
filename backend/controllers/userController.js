import User from '../models/userModel.js'
import getErrorMessge from '../helpers/dbErrorHandler.js'

/*----------------------------------------------------
    CREATE NEW USER
    @method     -> POST
    @route      -> /api/users
    @access     -> Public
-----------------------------------------------------*/
const create = async (req, res) => {
  const user = new User(req.body)
  try {
    await user.save()
    return res.status(200).json({
      message: 'Successfully signed up!',
    })
  } catch (err) {
    return res.status(400).json({
      error: getErrorMessge(err),
    })
  }
}

/*----------------------------------------------------
    FETCH ALL USERS
    @method     -> GET
    @route      -> /api/users
    @access     -> Public
-----------------------------------------------------*/
const list = async (req, res) => {
  try {
    const users = await User.find({})
    if (!users) {
      return res.send('No users found')
    }
    return res.status(200).json(users)
  } catch (err) {
    return res.status(400).json({
      error: err,
    })
  }
}

const userById = async (req, res) => {}
const read = async (req, res) => {}
const update = async (req, res) => {}
const remove = async (req, res) => {}

export default {
  create,
  list,
  userById,
  read,
  update,
  remove,
}
