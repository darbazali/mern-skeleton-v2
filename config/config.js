const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 5000,
  jwtSecret: process.env.JWT_SECRET || 'my_super_jwt_secret',
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/mernproject',
}

export default config
