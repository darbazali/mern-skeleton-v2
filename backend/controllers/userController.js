import lodash from 'lodash'
import User from '../models/userModel.js'
import getErrorMessge from '../helpers/dbErrorHandler.js'

const { extend } = lodash
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
    const users = await User.find().select('name email updated created')
    if (!users) {
      return res.send('No users found')
    }
    return res.status(200).json(users)
  } catch (err) {
    return res.status(400).json({
      error: getErrorMessge(err),
    })
  }
}

/*----------------------------------------------------
    LOADING USER BY ID
    Whenever the server recives a request that matchs /api/users/:userId
    the app will execute this controller function

    if a matching user is found in db, the user object will append to request object in the "profile" key, then next()
-----------------------------------------------------*/
const userById = async (req, res, next, id) => {
  try {
    let user = await User.findById(id)
    if (!user) {
      return res.status(400).json({
        error: 'User not found',
      })
    }
    req.profile = user
    next()
  } catch (err) {
    return res.status(400).json({
      error: 'Could not retrive user',
    })
  }
}

/*----------------------------------------------------
    GET SINGLE USER BY ID
    @method -> GET
    @route -> /api/users/:userId
    @access -> public
-----------------------------------------------------*/
const read = async (req, res) => {
  req.profile.hashed_password = undefined
  req.profile.salt = undefined
  return res.json(req.profile)
}

/*----------------------------------------------------
    UPDATE USER PROFILE
    @method -> PUT
    @route -> /api/users/:userId
    @access -> private
-----------------------------------------------------*/
const update = async (req, res) => {
  try {
    let user = req.profile
    user = extend(user, req.body)
    user.updated = Date.now()
    await user.save()
    user.hashed_password = undefined
    user.salt = undefined
    return res.json(user)
  } catch (err) {
    return res.status(400).json({
      error: getErrorMessge(err),
    })
  }
}

/*----------------------------------------------------
    DELETE USER PROFILE
    @method -> DELETE
    @route -> /api/users/:userId
    @access -> private
-----------------------------------------------------*/
const remove = async (req, res) => {
  try {
    let user = req.profile
    let deletedUser = await user.remove()
    deletedUser.hashed_password = undefined
    deletedUser.salt = undefined
    return res.json({
      message: 'User deleted successfully',
      user: deletedUser,
    })
  } catch (err) {
    return res.status(400).json({
      error: getErrorMessge(err),
    })
  }
}

export default {
  create,
  list,
  userById,
  read,
  update,
  remove,
}
