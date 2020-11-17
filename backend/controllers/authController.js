import jwt from 'jsonwebtoken'
import expressJWT from 'express-jwt'

import User from '../models/userModel.js'
import config from '../../config/config.js'

/*----------------------------------------------------
    SIGN-IN
    @method     -> POST
    @route      -> /auth/signin
    @access     -> private

    -> the route recives a request with eamil and password from req.body
        to retrive the matching user from the database

    -> password auth method defined in UserSchema /models/userModel
        is used to verify the password recived from req.body
    
    -> if the password is successfully verified, the JWT module generates
        a signed JWT using a secret key and the user's _id value

-----------------------------------------------------*/
const signin = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })

    // if user not found
    if (!user) {
      return res.status(401).json({ error: 'User not found' })
    }

    // if user found, but password was wrong
    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "Email and Passwrod don't match",
      })
    }

    // else
    const token = jwt.sign({ _id: user._id }, config.jwtSecret)
    res.cookie('t', token, { expire: new Date() + 9999 })

    return res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    })
  } catch (err) {
    return res.status(401).json({
      error: 'Could not sign in',
    })
  }
}

/*----------------------------------------------------
    SIGN-OUT
    @method     -> GET
    @route      -> /auth/signout
    @access     -> private

    -> simply clears the response cookie containing the signed JWT

-----------------------------------------------------*/
const signout = async (req, res) => {
  res.clearCookie('t')
  return res.status(200).json({
    message: 'Signed out',
  })
}

/*----------------------------------------------------------------------------------------
    REQUIRE SIGNIN

    -> it uses express-jwt to verify that incoming requests has valid JWT int Authorization header

    this method can be use to protect any private route
------------------------------------------------------------------------------------------*/
const requireSignin = expressJWT({
  secret: config.jwtSecret,
  userProperty: 'auth',
  algorithms: ['HS256', 'HS384'],
})

/*----------------------------------------------------------------------------------------
    AUTHORIZING SIGNED IN SUERS
------------------------------------------------------------------------------------------*/
const hasAuthorization = (req, res, next) => {
  const authorized = req.profile && req.auth && req.profile._id === req.auth._id

  if (!authorized) {
    return res.status(403).json({
      error: 'User is not authorized',
    })
  }
  next()
}

export default { signin, signout, requireSignin, hasAuthorization }
