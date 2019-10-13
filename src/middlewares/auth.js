import { promisify } from 'util'
import jwt from 'jsonwebtoken'

import { AUTH_SECRET } from '../config/auth'

export async function auth (req, res, next) {
  const { 'x-user-token': token } = req.headers

  if (!token) {
    return res.status(401).json({
      message: 'Token not provided'
    })
  }

  try {
    const { id } = await promisify(jwt.verify)(token, AUTH_SECRET)

    req.user = id
  } catch (error) {
    return res.status(401).json({
      message: 'Invalid token'
    })
  }

  return next()
}
