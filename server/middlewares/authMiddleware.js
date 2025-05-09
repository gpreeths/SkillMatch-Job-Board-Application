const jwt = require('jsonwebtoken')

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '') // Get token from the request header

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)  // Verify the token using JWT secret
    req.user = decoded  // Store the decoded data (user info) on the req object
    next()  // Call the next middleware or controller function
  } catch (error) {
    console.error('Token verification failed:', error)
    res.status(401).json({ message: 'Token is not valid' })
  }
}

module.exports = authMiddleware
