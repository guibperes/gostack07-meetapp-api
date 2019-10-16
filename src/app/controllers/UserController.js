import * as Yup from 'yup'

import { User } from '../models/User'

class UserController {
  async store (req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6)
    })

    try {
      await schema.validate(req.body)
    } catch (error) {
      return res.status(400).json(error)
    }

    const { email: bodyEmail } = req.body

    const userExists = await User.findOne({ where: { email: bodyEmail } })

    if (userExists) {
      return res.status(400).json({
        message: 'User already exists'
      })
    }

    const { id, name, email, provider } = await User.create(req.body)

    return res.json({ id, name, email, provider })
  }

  async update (req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string()
        .min(6)
        .when('password', (password, field) =>
          password ? field.required() : field
        ),
      password: Yup.string().min(6)
    })

    try {
      await schema.validate(req.body)
    } catch (error) {
      return res.status(400).json(error)
    }

    const { email: bodyEmail, oldPassword } = req.body

    const user = await User.findByPk(req.user)

    if (bodyEmail !== user.email) {
      const emailExists = User.findOne({ where: { email: bodyEmail } })

      if (emailExists) {
        return res.status(400).json({
          message: 'Email is already in use'
        })
      }
    }

    if (oldPassword) {
      const isValidPassword = await user.verifyPassword(oldPassword)

      if (!isValidPassword) {
        return res.status(400).json({
          message: 'Password does not match'
        })
      }
    }

    const { id, name, email, provider } = await user.update(req.body)

    return res.json({ id, name, email, provider })
  }
}

export default new UserController()
