import jwt from 'jsonwebtoken'
import * as Yup from 'yup'

import { AUTH_SECRET, AUTH_EXPIRATION_TIME } from '../../config/auth'
import { User } from '../models/User'

class SessionController {
  async store (req, res) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6)
    })

    try {
      await schema.validate(req.body)
    } catch (error) {
      return res.status(400).json(error)
    }

    const { email: bodyEmail, password } = req.body

    const user = await User.findOne({ where: { email: bodyEmail } })

    if (!user) {
      return res.status(401).json({
        message: 'User not founded'
      })
    }

    const isValidPassword = await user.verifyPassword(password)

    if (!isValidPassword) {
      return res.status(401).json({
        message: 'Password does not match'
      })
    }

    const { id, name, email, provider } = user

    const token = jwt.sign({ id }, AUTH_SECRET, {
      expiresIn: AUTH_EXPIRATION_TIME
    })

    res.json({ id, name, email, provider, token })
  }
}

export default new SessionController()
